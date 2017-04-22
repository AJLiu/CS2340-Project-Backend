import Joi = require('joi');
export const validateRegister = {
  body: {
    'username': Joi.string().required(),
    'email': Joi.string().email().required(),
    'firstName': Joi.string().required(),
    'lastName': Joi.string().required(),
    'password': Joi.string().required(),
    'title': Joi.string().required(),
    'address': Joi.string().required(),
    'userType': Joi.string().valid('User', 'Worker', 'Manager', 'Admin').required()
  }
};
export const validateLogin = {
  body: {
    'username': Joi.string().required(),
    'password': Joi.string().required()
  }
};

export const validateSourceReport = {
  body: {
    'location': Joi.object({ 'lat': Joi.number().required(), 'long': Joi.number().required() }).required(),
    'waterType': Joi.string().valid('Bottled', 'Well', 'Stream', 'Lake', 'Spring', 'Other').required(),
    'waterCondition': Joi.string().valid('Waste', 'TreatableClear', 'TreatableMuddy', 'Potable').required()
  }
};

export const validatePurityReport = {
  body: {
    'location': Joi.object({ 'lat': Joi.number().required(), 'long': Joi.number().required() }).required(),
    'waterCondition': Joi.string().valid('Safe', 'Treatable', 'Unsafe').required(),
    'virusPPM': Joi.number().required(),
    'contaminantPPM': Joi.number().required()
  }
};

export const validateReset = {
  body: {
    'username': Joi.string().required()
  }
};