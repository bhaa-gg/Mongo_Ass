import { Router } from "express"
import { errorCatcher, validationMiddleware, verifyToken } from "../../middleware"
import { createCategory, getCategories } from "./category.controller"
import { createCategorySchema, getCategoriesSchema } from "./category.schema"




const categoryRoutes = Router()



categoryRoutes.post("/",
    errorCatcher(validationMiddleware(createCategorySchema)),
    errorCatcher(verifyToken(process.env.LOGIN_SIGNATURE ?? "")),
    errorCatcher(createCategory)
)


categoryRoutes.get("/",
    errorCatcher(validationMiddleware(getCategoriesSchema)),
    errorCatcher(verifyToken(process.env.LOGIN_SIGNATURE ?? "")),
    errorCatcher(getCategories)
)



export { categoryRoutes as CategoryRoutes }