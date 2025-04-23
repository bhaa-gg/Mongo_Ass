import { Router } from "express";
import { errorCatcher, FindEmailExist } from "../../middleware";
import { login, register } from "./auth.controller";
import { loginSchema, registerSchema } from "./auth.schema";
import { validationMiddleware } from "../../middleware/validation";
import User from "../../../Db/Models/user";

export const authRoutes = Router();


authRoutes.post("/register",
    errorCatcher(validationMiddleware(registerSchema)),
    errorCatcher(FindEmailExist(User)),
    errorCatcher(register)
);

authRoutes.post("/login",
    errorCatcher(validationMiddleware(loginSchema)),
    errorCatcher(login)
);
export { authRoutes as AuthRoutes };