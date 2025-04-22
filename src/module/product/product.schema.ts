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
    ,



}
export const getUserProductSchema = {
    headers: Joi.object({
      token: Joi.string().required(),
      ...generalRules.my_headers,
    }).unknown(true),
    query: Joi.object({
      categoryId: generalRules._ids.optional(),
      name: Joi.string().optional(),
      stockFrom: Joi.number().integer().min(1).optional(),
      stockTo: Joi.number()
        .integer()
        .min(1)
        .when('stockFrom', {
          is: Joi.number().exist(),
          then: Joi.number().integer().greater(Joi.ref('stockFrom')).required(),
          otherwise: Joi.number().integer().min(1).optional(),
        }),
      priceFrom: Joi.number().min(1).optional(),
      priceTo: Joi.number()
        .min(1)
        .when('priceFrom', {
          is: Joi.number().exist(),
          then: Joi.number().greater(Joi.ref('priceFrom')).required(),
          otherwise: Joi.number().min(1).optional(),
        }),
      totalPriceFrom: Joi.number().min(1).optional(),
      totalPriceTo: Joi.number()
        .min(1)
        .when('totalPriceFrom', {
          is: Joi.number().exist(),
          then: Joi.number().greater(Joi.ref('totalPriceFrom')).required(),
          otherwise: Joi.number().min(1).optional(),
        }),
    }),
  };