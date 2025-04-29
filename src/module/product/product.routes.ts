import { Router } from "express"
import { errorCatcher, findById, multerMiddleWare, validationMiddleware, verifyToken } from "../../middleware"
import { createProduct, getUserProduct } from "./product.controller"
import { createProductSchema, getUserProductSchema } from "./product.schema"
import { extensible } from "../../utils"

const productRoutes = Router()


productRoutes.post("/:categoryId",
    multerMiddleWare(extensible.img).single("image"),
    errorCatcher(validationMiddleware(createProductSchema)),
    errorCatcher(verifyToken(process.env.LOGIN_SIGNATURE ?? "")),
    errorCatcher(createProduct)
)

productRoutes.post("/",
    errorCatcher(validationMiddleware(getUserProductSchema)),
    errorCatcher(verifyToken(process.env.LOGIN_SIGNATURE ?? "")),
    errorCatcher(getUserProduct)
)




export { productRoutes as ProductRoutes }