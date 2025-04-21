import { NextFunction, Request, Response } from "express"
import { ErrorApp } from "../utils"
import { Model } from "mongoose"
import { Key } from "../utils/enums"
import { IAppRequest } from "../Types"



export const FindEmailExist = (modal: Model<any>) => async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body
    const item = await modal.findOne({ email })
    item ? next(new ErrorApp("Email already exists", 400)) : next()
}






export const findById = async (modal: Model<any>, key: Key) => async (req: IAppRequest, res: Response, next: NextFunction) => {
    const { id } = req?.[key] ?? req?.params ?? req?.query ?? req?.body
    const item = await modal.findById(id)
    req.item = item
    item ? next() : next(new ErrorApp("Item not found", 404))
}



export const findNameExist = async (modal: Model<any>, key: Key) => async (req: IAppRequest, res: Response, next: NextFunction) => {
    const { name } = req?.[key] ?? req?.params ?? req?.query ?? req?.body
    const item = await modal.findOne({ name })
    req.item = item
    item ? next(new ErrorApp("Name already exists", 400)) : next()
}