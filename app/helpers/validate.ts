import Joi = require('joi');
export const validateRegister = {
    body: {
        'username': Joi.string().required(),
        'email': Joi.string().email().required(),
        'firstName': Joi.string().required(),
        'lastName': Joi.string().required(),
        'password': Joi.string().required()
    }
}
export const validateLogin = {
    body: {
        'username': Joi.string().required(),
        'password': Joi.string().required()
    }
}