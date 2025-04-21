import { NextFunction, Request, Response } from "express"
import { ErrorApp } from "../utils"



export const errorCatcher = (fn: any) => {
    return (req: Request, res: Response, next: NextFunction) => {
        fn(req, res, next)?.catch((err: any) => {
            return next(new ErrorApp(err.message, 500));
        })
    }
}