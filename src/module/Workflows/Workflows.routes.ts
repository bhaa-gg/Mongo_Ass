import { Router } from "express"
import { errorCatcher,  validationMiddleware, verifyToken } from "../../middleware"
import { createOrderSchema, getOrderSchema } from "./Workflows.schema"
import { createOrder, getOrders } from "./Workflows.controller"

const workflowsRoutes = Router()

workflowsRoutes.post("/",
    errorCatcher(validationMiddleware(createOrderSchema)),
    errorCatcher(verifyToken(process.env.LOGIN_SIGNATURE ?? "")),
    errorCatcher(createOrder)
)
workflowsRoutes.post("/",
    errorCatcher(validationMiddleware(getOrderSchema)),
    errorCatcher(verifyToken(process.env.LOGIN_SIGNATURE ?? "")),
    errorCatcher(getOrders)
)



export { workflowsRoutes as WorkflowsRoutes }