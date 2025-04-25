import Joi from "joi";
import { generalRules, WorkflowStatus } from "../../utils";

export const createOrderSchema = {
  body: Joi.object({
    products: Joi.array().required().items(Joi.object({
      id: generalRules._ids.required(),
      quantity: Joi.number().integer().min(1).required(),
    })).min(1),
  }).required(),
  headers: Joi.object({
    token: Joi.string().required(),
    ...generalRules.my_headers,
  }),
};


export const getOrderSchema = {
  query: Joi.object({
    startDate: Joi.date().optional().max(new Date()),
    endDate: Joi.date().optional().greater(Joi.ref('startDate')), 
    status: Joi.string().valid(...Object.values(WorkflowStatus)).optional(),
    totalSalaryFrom: Joi.number().min(1).optional(),
    totalSalaryTo: Joi.number().greater(Joi.ref('totalSalaryFrom')).optional()
  }),
  headers: Joi.object({
    token: Joi.string().required(),
    ...generalRules.my_headers,
  }),
}