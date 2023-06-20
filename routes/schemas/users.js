const Joi = require("joi");

const registerSchema = Joi.object().keys({
  email: Joi.string().required(),
  password: Joi.string().required(),
  subscription: Joi.string(),
});

const loginSchema = Joi.object().keys({
  password: Joi.string().required(),
  email: Joi.string().required(),
  subscription: Joi.string(),
});

const userEmailSchema = Joi.object().keys({
  email: Joi.string().required(),
  
})
module.exports = { registerSchema, loginSchema, userEmailSchema, };