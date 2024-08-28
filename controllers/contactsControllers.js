const Contact = require("../models/contact.js");
const HttpError = require("../helpers/HttpError.js");
const ctrlWrapper = require("../helpers/ctrlWrapper.js");
const { createContactSchema, updateContactSchema, updateFavoriteSchema } = require("../schemas/contactsSchemas.js");

const getAllContacts = async (req, res, next) => {
  const {_id: owner} = req.user;
  const {page = 1, limit = 10} = req.query;
  const skip = (page - 1) * limit;
  // const contacts = await Contact.find({name:"Alec Howard"}); // шукає повне співпадіння
  // const contacts = await Contact.find({}, "name email"); // повернути лише деякі поля
  // const contacts = await Contact.find({}, "-сreatedAt -updatedAt"); // не повертати ці поля
  const contacts = await Contact.find({owner}, "-сreatedAt -updatedAt", {skip, limit}).populate('owner', 'name email');

  res.status(200).json(contacts);
};

const getOneContact = async (req, res, next) => {
  
  const { id } = req.params;
  // const contact = await Contact.findOne({ _id: id }); // шукає до першого співпадіння передаємо об'єкт для пошуку
  const contact = await Contact.findById(id);

  if (!contact) {
    throw HttpError(404);
  }

  res.status(200).json(contact);
  
};

const deleteContact = async (req, res, next) => {
  
  const { id } = req.params;
  // const deletedContact = await Contact.findByIdAndRemove(id);
  const deletedContact = await Contact.findByIdAndDelete(id);

  if (!deletedContact) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json(deletedContact);
  
};

const createContact = async (req, res, next) => {
  
  const { error } = createContactSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const {_id: owner} = req.user;
  const newContact = await Contact.create({...req.body, owner});
  res.status(201).json(newContact);
  
};

const updateContact = async (req, res, next) => {
  
  if (!Object.keys(req.body).length > 0) {
    throw HttpError(400, "Body must have at least one field");
  }
  const { error } = updateContactSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }

  const { id } = req.params;

  const updatedContact = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!updatedContact) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json(updatedContact);
  
};

const updateFavorite = async (req, res, next) => {
 
  if (!("favorite" in req.body)) {
    throw HttpError(400, "Missing field favorite");
  }

  const { error } = updateFavoriteSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }

  const { id } = req.params;

  const updatedContact = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!updatedContact) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json(updatedContact);
 
};

module.exports = {
    getAllContacts: ctrlWrapper(getAllContacts),
    getOneContact: ctrlWrapper(getOneContact),
    deleteContact: ctrlWrapper(deleteContact),
    createContact: ctrlWrapper(createContact),
    updateContact: ctrlWrapper(updateContact),
    updateFavorite: ctrlWrapper(updateFavorite)
};