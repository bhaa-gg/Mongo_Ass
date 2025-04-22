import Joi from "joi"
import { generalRules } from "../../utils"



export const getUserProfileSchema = {
    headers : Joi.object({
        token: Joi.string().required(),
        ...generalRules.my_headers
    }).required().unknown(true)
}