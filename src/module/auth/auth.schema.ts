
import Joi from "joi";
import { generalRules } from "../../utils";








export const loginSchema = {
    body: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    }).required(),

    headers: Joi.object({
        ...generalRules.my_headers
    }).required()
}




export const registerSchema = {
    body: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        rePassword: Joi.string().valid(Joi.ref('password')).required()
    }).required(),
    headers: Joi.object({
        ...generalRules.my_headers
    }).required()
}




