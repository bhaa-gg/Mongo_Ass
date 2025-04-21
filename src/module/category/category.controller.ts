import { NextFunction, Request, Response } from "express"
import Category from "../../../Db/Models/category"
import { ErrorApp } from "../../utils"
import { IAppRequest } from "../../Types"



export const createCategory = async (req: IAppRequest, res: Response, next: NextFunction) => {
    const { name, isActive  } = req.body
    const categoryExist = await Category.findOne({ name })
    if (categoryExist) return next(new ErrorApp("Category already exists", 400))
    const category = await Category.create({ name, isActive, userId: req.authUser?._id })
    res.status(201).json({
        message: "Category created successfully",
        category
    })
}


export const getCategories = async (req: IAppRequest, res: Response, next: NextFunction) => {
    const categories = await Category.find({ userId: req.authUser?._id })
    res.status(200).json({ categories })
}
