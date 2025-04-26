
import Joi from "joi"
import { Types } from "mongoose"


export const idValid = (val: any, helper: any) => {
    return Types.ObjectId.isValid(val) ? val : helper.message("id mustbe valid")
}





export const generalRules = {
    _ids: Joi.string().custom(idValid),
    my_headers: {
        "content-type": Joi.string().optional(),
        "user-agent": Joi.string().optional(),
        accept: Joi.string().optional(),
        "postman-token": Joi.string().optional(),
        host: Joi.string().optional(),
        "accept-encoding": Joi.string().optional(),
        connection: Joi.string().optional(),
        "content-length": Joi.string().optional(),
        'cdn-loop': Joi.string().optional(),
        'cf-connecting-ip': Joi.string().optional(),
        'cf-ipcountry': Joi.string().optional(),
        'cf-ray': Joi.string().optional(),
        'cf-visitor': Joi.string().optional(),
        'render-proxy-ttl': Joi.string().optional(),
        'rndr-id': Joi.string().optional(),
        'true-client-ip': Joi.string().optional(),
        'x-forwarded-for': Joi.string().optional(),
        'x-forwarded-proto': Joi.string().optional(),
        'x-request-start': Joi.string().optional(),
    },
    mails: Joi.string().required().email({
        tlds: { allow: true, deny: ["bhaa", "com", "net"] },
        minDomainSegments: 3, // 3 section @a.a.a   
        maxDomainSegments: 3,
    }).messages({
        "any.required": "Mail field is required field",
        "string.email": "Mail field must be a valid email"
    }),
}