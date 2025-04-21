import { Router } from "express"
import { errorCatcher, findById, multerMiddleWare, validationMiddleware, verifyToken } from "../../middleware"
import { createProduct } from "./product.controller"
import { createProductSchema } from "./product.schema"
import Category from "../../../Db/Models/category"
import { Key } from "../../utils/enums"
import { extensible } from "../../utils"

const productRoutes = Router()


productRoutes.post("/:categoryId",
    multerMiddleWare(extensible.img).single("image"),
    errorCatcher(validationMiddleware(createProductSchema)),
    errorCatcher(verifyToken(process.env.LOGIN_SIGNATURE ?? "")),
    errorCatcher(createProduct)
)




export { productRoutes as ProductRoutes }