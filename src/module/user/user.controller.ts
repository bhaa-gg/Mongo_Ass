import { NextFunction, Request, Response } from "express"
import { IAppRequest } from "../../Types"


export const getUserProfile = async (req: IAppRequest, res: Response, next: NextFunction) => {
    res.status(200).json({
        message: "User profile fetched successfully",
        user : req.authUser
    })
}   
