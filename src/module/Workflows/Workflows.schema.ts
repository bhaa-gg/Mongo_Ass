import Joi from "joi";
import { generalRules } from "../../utils";

export const createOrderSchema = {
  body: Joi.object({
    productName: Joi.string().min(1).optional(),
    productId: Joi.string().min(1).optional(),
    amount: Joi.number().positive().required(),
  }).xor('productName', 'productId'), // Ensures exactly one is provided
  headers: Joi.object({
    token: Joi.string().required(),
    ...generalRules.my_headers,
  }),
};