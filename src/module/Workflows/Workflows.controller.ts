import { NextFunction, Response } from "express"
import { IAppRequest } from "../../Types"
import { CloudinaryConnection, ErrorApp, WorkflowStatus } from "../../utils"
import Category from "../../../Db/Models/category"

import { v4 as uuidv4 } from 'uuid';
import Product from './../../../Db/Models/products';
import { IUser } from "../../../Db/Models";
import { Schema } from "mongoose";
import Workflow from "../../../Db/Models/Workflows";




export const createOrder = async (req: IAppRequest, res: Response, next: NextFunction) => {

    const { productId, productName, amount } = req.body;
    const user: IUser = req.authUser;
    const search: { userId: any, _id?: string, name?: string } = {
        userId: user._id
    }
    if (productId)
        search._id = productId
    if (productName)
        search.name = productName

    const product = await Product.findOne(search)

    if (!product)
        return next(new ErrorApp("Product not found", 404))

    if (!product.stock)
        return next(new ErrorApp("Product not found", 404))


    const newOrder = new Workflow({
        userId: user._id,
        productId: product._id,
        status: WorkflowStatus.APPROVED,
        amount
    })

    await newOrder.save();
    product.stock -= 1;
    await product.save();





    res.json({ message: "Success", newOrder })
}
