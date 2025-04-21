import { NextFunction, Request, Response } from 'express';
import { ErrorApp } from '../utils';

const reqKeys = ["body", "params", "query", "headers", "authUser"]



export const validationMiddleware = (schema: any) => async (req: Request, res: Response, next: NextFunction) => {
    let validationArray: any = [];
    for (const key of reqKeys) {
        const reqKey = (req as Record<string, any>)[key]
        const validationResult = schema[key]?.validate(reqKey, { abortEarly: false });
        if (validationResult?.error) validationArray.push(validationResult?.error)
    }
    return validationArray.length ? next(new ErrorApp(validationArray, 400)) : next();
};