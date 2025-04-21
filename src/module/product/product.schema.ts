import Joi from "joi";
import { generalRules } from "../../utils";




export const createProductSchema = {
    body: Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().required(),
        gain: Joi.number().required(),
        stock: Joi.number().optional(),
        isActive: Joi.boolean().optional()
    }),
    headers: Joi.object({
        token: Joi.string().required(),
        ...generalRules.my_headers
    }),
    params: Joi.object({
        categoryId: generalRules._ids.required()
    })
}