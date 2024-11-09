import express, { NextFunction, Request, Response } from 'express'
import Joi from 'joi';
// import { ValidationError } from '../../../common/src/errors/validationError';
import { ValidationError } from '@isha7876/common/dist/common/src/index';
import { User } from '../modals/user.modal';
// import { Error } from 'mongoose';
// import { BadRequestError } from '../../../common/src/errors/badRequestError';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
// import BadRequestError from '@isha7876/common/dist/common/src/errors/badRequestError'
import { BadRequestError } from '@isha7876/common/dist/common/src/index';
//to return the info about the user
export const signUpRouter = express.Router();

const signUpSchema = Joi.object({
    email: Joi.string().required(),
    // .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string().required()
    // .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
})

const signUpService = async (req: Request, res: Response): Promise<any> => {

    try {
        const { email, password } = req.body;

        // Joi validation
        const { error, value } = signUpSchema.validate({ email, password });

        if (error) {

            throw new ValidationError("Invalid Email or Password!!!!!!!!")
        }

        // Check if the user already exists
        const user = await User.findOne({ email });
        if (user) {
            // return res.status(409).json({ error: 'User already exists' });
            throw new BadRequestError("User Already Exists");
        }


        const hashedPassword = await bcrypt.hash(password, 10);
        // Create and save the user
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();


        //generate jwt
        const userJWT = jwt.sign({
            id: newUser.id,
            email: newUser.email
        },
        "@mySecretKey"
        //    process.env.JWT_KEY! for kubernetes
        )

        //store it on the session object.
        req.session = { jwt: userJWT };

        console.log("User successfully created");

        // Send the validated data back or any relevant info
        return res.status(201).send(newUser);

    } catch (err) {
        // Log the error and send a generic error response
        console.error("@@@@@@@", err);
        return res.status(500).json({ err });
    }

}

signUpRouter.post('', signUpService);


