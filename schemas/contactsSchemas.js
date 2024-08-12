// import Joi from "joi";
const Joi = require("joi");

const createContactSchema = Joi.object({

    name: Joi.string().required(),
    email: Joi.string().email().required(), 
    phone: Joi.string().min(6).required(),

})

const updateContactSchema = Joi.object({

})

module.exports = { createContactSchema, updateContactSchema };