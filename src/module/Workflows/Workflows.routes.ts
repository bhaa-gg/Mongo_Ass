import { Router } from "express"
import { errorCatcher, findById, multerMiddleWare, validationMiddleware, verifyToken } from "../../middleware"
import { extensible } from "../../utils"
import { createOrderSchema } from "./Workflows.schema"
import { createOrder } from "./Workflows.controller"

const workflowsRoutes = Router()

workflowsRoutes.post("/",
    errorCatcher(validationMiddleware(createOrderSchema)),
    errorCatcher(verifyToken(process.env.LOGIN_SIGNATURE ?? "")),
    // errorCatcher(createOrder)

)



export { workflowsRoutes as WorkflowsRoutes }