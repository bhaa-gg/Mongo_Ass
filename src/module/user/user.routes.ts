import { Router } from "express";
import { getUserProfile } from "./user.controller";
import { errorCatcher, validationMiddleware, verifyToken } from "../../middleware";
import { getUserProfileSchema } from "./user.schema";
import { config } from "dotenv";



config()
const UserRouter = Router();

UserRouter.get("/",
    errorCatcher(validationMiddleware(getUserProfileSchema)),
    errorCatcher(verifyToken(process.env.LOGIN_SIGNATURE as string)),
    errorCatcher(getUserProfile)

)


export { UserRouter as UserRoutes };

