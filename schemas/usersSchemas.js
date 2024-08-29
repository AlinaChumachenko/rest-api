const Joi = require("joi");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const registerSchema = Joi.object({
    name: Joi.string().required(),
    password: Joi.string().min(3).required(),
    email: Joi.string().pattern(emailRegexp).required(),    
});
  
const loginSchema = Joi.object({
    password: Joi.string().min(3).required(),
    email: Joi.string().pattern(emailRegexp).required(), 
});

module.exports = { registerSchema, loginSchema };