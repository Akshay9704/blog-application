import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowecase: true,
            trim: true,
        },
        fullName: {
            type: String,
            trim: true,
            index: true
        },
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        token: {
            type: String
        },
    },
    {
        timestamps: true
    }
)


export const User = mongoose.model("User", userSchema)