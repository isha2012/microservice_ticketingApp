import mongoose, { Document } from "mongoose";

interface userInterface extends Document {
    email: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const userSchema = new mongoose.Schema<userInterface>({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        // validate: {
        //     validator: function (v) {
        //         return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        //     },
        //     message: "Please enter a valid email address"
        // }
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        // select: false
    },
    
    // Add other fields as needed
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id,
            delete ret._id,
            delete ret.password,
            delete ret.__v
        }
    }
  } )

export const User = mongoose.model<userInterface>("user", userSchema);

