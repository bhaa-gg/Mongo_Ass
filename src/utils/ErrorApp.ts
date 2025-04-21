import { NextFunction, Request, Response } from "express"



export class ErrorApp {
    statusCode: number; message: string
    constructor(message: string, statusCode: number) {
        this.statusCode = statusCode
        this.message = message
    }
}


export const errorHandler = (err: ErrorApp, req: Request, res: Response, next: NextFunction) => {
    res.status(err.statusCode ?? 500).json({
        Error: "Failed Response",
        message: err.message ?? "Internal Server Error",
        statusCode: err.statusCode ?? 500
    })
}