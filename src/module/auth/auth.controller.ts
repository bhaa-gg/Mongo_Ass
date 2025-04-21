// Auth controller will be implemented here 

import { NextFunction, Request, Response } from "express"
import User, { IUser } from './../../../Db/Models/user';
import { compareSync, hashSync } from "bcrypt";
import { ErrorApp } from "../../utils";
import jwt from 'jsonwebtoken';


export const login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body
    const user: IUser | null = await User.findOneAndUpdate({ email }, { isLoggedIn: true })
    if (!user || !compareSync(password, user?.password)) return next(new ErrorApp("Check your email or password", 404))
        
    const token = jwt.sign({
        userId: user._id,
        email: user.email,
        name: user.name
    }, process.env.LOGIN_SIGNATURE ?? "")

    if (!token) return next(new ErrorApp("Something went wrong", 500))
    return res.status(200).json({ message: "Login successful", user  ,token })
}


export const register = async (req: Request, res: Response, next: NextFunction) => {
    let { name, email, password } = req.body

    password = hashSync(password, Number(process.env.SALT_ROUNDS))

    const user = await User.create({ name, email, password })

    return res.status(201).json({ message: "User created successfully", user })
}

// ! Logout
// ! Forgot Password
// ! Change Password
