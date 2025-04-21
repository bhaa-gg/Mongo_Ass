import { NextFunction, Request, Response } from "express"

import jwt from 'jsonwebtoken';
import { ErrorApp } from "../utils";
import { IAppRequest } from "../Types";
import User from "../../Db/Models/user";






export const verifyToken = (SYQ: string) => {
    return async (req: IAppRequest, res: Response, next: NextFunction) => {

        if (!SYQ) {
            return next(new ErrorApp("SYQ Is required", 401))
        }
        let id: any = req.params.tokenId ?? req.headers.token;
        if (!id)
            return next(new ErrorApp("Token should be here", 401))


        await jwt.verify(id, SYQ, async (err: any, decoded: any) => {

            if (err)
                return next(new ErrorApp("Invalid Token", 401))

            const user = await User.findOne({ _id: decoded.userId })
            if (!user)
                return next(new ErrorApp("User not found", 404))

            req.authUser = user;
            return next()
        })
    }
}
