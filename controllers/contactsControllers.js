// import contactsService from "../services/contactsServices.js";
const {listContacts, getContactById, addContact, updateContactById, removeContact} = require("../services/contactsServices.js");
const HttpError = require("../helpers/HttpError.js");
const ctrlWrapper = require("../helpers/ctriWrapper.js");
const { createContactSchema, updateContactSchema } = require("../schemas/contactsSchemas.js");


const getAllContacts = async (req, res) => {
  const contacts = await listContacts();
  res.status(200).json(contacts);
};
const getOneContact = async (req, res) => {
  const { id } = req.params;
  const contact = await getContactById(id);
  if (!contact) {
    throw HttpError(404);
  }
  res.status(200).json(contact);  
};
const deleteContact = async (req, res) => {
  const { id } = req.params;
  const contact = await removeContact(id);
  if (!contact) {
    throw HttpError(404);
  }
  res.status(200).json(contact);
};

const createContact = async (req, res) => {
  const {error} = createContactSchema.validate(req.body);
  if(error) {
      throw HttpError(400, error.message);
  }
  const newContact = await addContact(req.body);
  res.status(201).json(newContact);
};

const updateContact = async (req, res) => {
  const {error} = updateContactSchema.validate(req.body);
  if(error) { 
      throw HttpError(400, error.message);
  }   
  const { id } = req.params;  
  const contact = await updateContactById(id, req.body);
  if(!contact) {
      throw HttpError(404);
  }
  res.status(200).json(contact);
};

module.exports = {
    getAllContacts: ctrlWrapper(getAllContacts),
    getOneContact: ctrlWrapper(getOneContact),
    deleteContact: ctrlWrapper(deleteContact),
    createContact: ctrlWrapper(createContact),
    updateContact: ctrlWrapper(updateContact)
};