import { NextFunction, Response } from "express"
import { IAppRequest } from "../../Types"
import { ErrorApp, WorkflowStatus } from "../../utils"

import Product from './../../../Db/Models/products';
import { IUser } from "../../../Db/Models";
import mongoose from "mongoose";
import Workflow from "../../../Db/Models/Workflows";
import { format } from "date-fns";




export const createOrder = async (req: IAppRequest, res: Response, next: NextFunction) => {

    const { products = [] } = req.body;
    const user: IUser = req.authUser;




    const productChecks = products.map((p: any) => ({
        _id: new mongoose.Types.ObjectId(p.id),
        stock: { $gte: p.quantity }
    }));

    let myProducts = await Product.find({
        userId: user._id,
        $or: productChecks
    });


    if (!myProducts.length || !myProducts || myProducts.length !== products.length)
        return next(new ErrorApp("Wrong in id or your Quantity of Products", 404))





    let totalAmount = 0
    products.forEach((p2: any) => {
        myProducts.forEach(async (p) => {
            if (p._id == p2.id) {
                totalAmount += p.totalPrice * p2.quantity
                await Product.updateOne(
                    { _id: p._id },
                    { $set: { stock: p.stock - p2.quantity } }
                );
            }
        })
    });


    const newOrder = new Workflow({
        userId: user._id,
        products,
        status: WorkflowStatus.APPROVED,
        totalSalary: totalAmount
    })

    await newOrder.save();




    res.json({ message: "Success", newOrder })
}


export const getOrders = async (req: IAppRequest, res: Response, next: NextFunction) => {
    const { startDate = new Date(), endDate, status, totalSalaryFrom = 1, totalSalaryTo } = req.query
    const user = req.authUser;
    const searchQuery: any = {
        userId: user._id,
        createdAt: {
            $gte: format(startDate.toString(), "yyyy-MM-dd"),
        },
        totalSalary: {
            $gte: Number(totalSalaryFrom),
        }
    }

    if (totalSalaryTo)
        searchQuery.totalSalary.$lte = Number(totalSalaryTo)
    if (endDate)
        searchQuery.createdAt.$lte = format(endDate.toString(), "yyyy-MM-dd")
    if (status)
        searchQuery.status = status

    const orders = await Workflow.find(searchQuery);

    if (!orders || !orders.length)
        return next(new ErrorApp("Not Found This orders", 400))

    return res.status(200).json({ message: "Success", orders })

}
