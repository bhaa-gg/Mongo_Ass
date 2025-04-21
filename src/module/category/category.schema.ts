import Joi from "joi";
import { generalRules } from "../../utils";




export const createCategorySchema = {
    body: Joi.object({
        name: Joi.string().required(),
        isActive: Joi.boolean().optional()
    }),
    headers: Joi.object({
        token: Joi.string().required(),
        ...generalRules.my_headers
    })
}


export const getCategoriesSchema = {
    headers: Joi.object({
        token: Joi.string().required(),
        ...generalRules.my_headers
    })
}