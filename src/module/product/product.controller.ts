import { NextFunction, Response } from "express"
import { IAppRequest } from "../../Types"
import { CloudinaryConnection, ErrorApp } from "../../utils"
import Product from "../../../Db/Models/products"
import Category from "../../../Db/Models/category"

import { v4 as uuidv4 } from 'uuid';


export const createProduct = async (req: IAppRequest, res: Response, next: NextFunction) => {
    const { name, description, price, gain, stock } = req.body
    const { categoryId } = req.params
    const user = req.authUser
    const image = req.file

    const category = await Category.findById(categoryId)
    if (!category)
        return next(new ErrorApp("Category not found", 404))

    const product = await Product.findOne({ name })
    if (product) {
        if (image && !product.Image.secure_url) {
            const customId: string = uuidv4().slice(0, 4);
            const { secure_url, public_id }  :any = await CloudinaryConnection().uploader.upload(image.path, {
                folder: `products/${customId}`
            })
            product.Image.secure_url = secure_url
            product.Image.public_id = public_id
        }
        product.stock += 1;
        await product.save()
        return res.status(201).json({
            message: "Stock increment Success",
            product
        })
    }
    const theProud: any = { name, description, price, gain, stock, categoryId, userId: user?._id , Image: {} }

    if (image) {
        const customId: string = uuidv4().slice(0, 4);
        console.log(customId );
        const { secure_url, public_id }  :any = await CloudinaryConnection().uploader.upload(image.path, {
            folder: `products/${customId}`
        })
        theProud.Image.secure_url = secure_url
        theProud.Image.public_id = public_id
    }
    

    const newProduct = new Product(theProud)
    await newProduct.save()

    return res.status(201).json({
        message: "Product created successfully",
        product: newProduct
    })
}


export const getUserProduct = async (req: IAppRequest, res: Response, next: NextFunction) => {
   
    const user = req.authUser;
    const { categoryId, name, stockFrom = 1, stockTo, priceFrom = 1, priceTo, totalPriceFrom = 1, totalPriceTo } = req.query;
    const searchParams: any = {
        userId: user._id,
    }


    if (name) {
        searchParams.name = name
    } else {
        if (categoryId)
            searchParams.categoryId = categoryId
        if (stockFrom || stockTo) {
            searchParams.stock = {};
            if (stockFrom) {
                searchParams.stock.$gte = Number(stockFrom);
            }
            if (stockTo) {
                searchParams.stock.$lte = Number(stockTo);
            }
        }
        if (priceFrom || priceTo) {
            searchParams.price = {};
            if (priceFrom) {
                searchParams.price.$gte = Number(priceFrom);
            }
            if (priceTo) {
                searchParams.price.$lte = Number(priceTo);
            }
        }
        if (totalPriceFrom || totalPriceTo) {
            searchParams.totalPrice = {};
            if (totalPriceFrom) {
                searchParams.totalPrice.$gte = Number(totalPriceFrom);
            }
            if (totalPriceTo) {
                searchParams.totalPrice.$lte = Number(totalPriceTo);
            }
        }
    }

    console.log(searchParams);



    const products = await Product.find(searchParams).populate("categoryId")

    return res.status(200).json({
        message: "Success",
        products
    })
}


