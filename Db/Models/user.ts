import { Document, model, Schema } from "mongoose";




export interface IUser extends Document {
    name: string
    email: string
    password: string
    isLoggedIn: boolean;
    authOtp: string | null;
}


const userSchema = new Schema({
    name: { type: String, required: true, trim: true, minlength: 3, maxlength: 30 },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, trim: true },
    isLoggedIn: { type: Boolean, default: false },
    authOtp: { type: String, default: null  },
}, { timestamps: true, autoCreate: true, versionKey: false })


const User = model<IUser>('User', userSchema)


export default User

