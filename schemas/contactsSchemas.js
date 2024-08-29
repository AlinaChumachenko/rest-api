const Joi = require("joi");

const createContactSchema = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().required(),
    phone: Joi.string().min(6).required(),
    favorite: Joi.boolean(),
});
  
const updateContactSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string(),
    phone: Joi.string(),
});
  
const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required(),
});

module.exports = { createContactSchema, updateContactSchema, updateFavoriteSchema };