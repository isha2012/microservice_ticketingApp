import express, { Request, Response } from 'express'
import Joi from 'joi';
// import { ValidationError } from '../../../common/src/errors/validationError';
import {ValidationError} from '@isha7876/common/dist/common/src/index'
import {BadRequestError} from '@isha7876/common/dist/common/src/index'
import { User } from '../modals/user.modal';
// import { BadRequestError } from '../../../common/src/errors/badRequestError';
import { comparePassword } from '../utils/password';
import jwt from 'jsonwebtoken';

//to return the info about the user
export const signInRouter = express.Router();

const signInSchema = Joi.object({
    email: Joi.string().required(),
    // .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string().required()
    // .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
})

const signInService = async (req: Request, res: Response): Promise<any> => {

    try {
        const { email, password } = req.body;

        // Joi validation
        const { error, value } = signInSchema.validate({ email, password });

        console.log({ value });


        if (error) {
            throw new ValidationError("Invalid Email or Password!!!!!!!!")
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            // return res.status(409).json({ error: 'User already exists' });
            throw new BadRequestError("Login Failed");
        }

        const passwordMatch = await comparePassword(password, existingUser.password);

        if (!passwordMatch) {
            throw new BadRequestError("Login Failed");
        }

        //generate jwt
        const userJWT = jwt.sign({
            id: existingUser.id,
            email: existingUser.email
        },
            "@mySecretKey"
            //    process.env.JWT_KEY! for kubernetes
        )

        //store it on the session object.
        req.session = { jwt: userJWT };

        console.log("User successfully created");

        // Send the validated data back or any relevant info
        return res.status(200).send(existingUser);

    } catch (err) {
        // Log the error and send a generic error response
        console.error(err);
        return res.status(500).json({ error: 'An unexpected error occurred' });
    }

}

signInRouter.post('', signInService);


