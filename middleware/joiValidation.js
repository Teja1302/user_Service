const Joi = require('joi');


const userschema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    role: Joi.string().valid('ADMIN', 'NON-ADMIN').required(),
    email: Joi.string().email().required()
  });

  module.exports = userschema;