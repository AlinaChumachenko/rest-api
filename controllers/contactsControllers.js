// import contactsService from "../services/contactsServices.js";
const {listContacts, getContactById, addContact, updateContactById} = require("../services/contactsServices.js");
const HttpError = require("../helpers/HttpError.js");
const { createContactSchema, updateContactSchema } = require("../schemas/contactsSchemas.js");


const getAllContacts = async (req, res, next) => {
    try {
        const contacts = await listContacts();
    
        res.status(200).json(contacts);
      } catch (error) {
        next(error);
      }
    };
const getOneContact = async (req, res, next) => {
    try {
        const { id } = req.params;
        const contact = await getContactById(id);
    
        if (!contact) {
          throw HttpError(404);
        }
    
        res.status(200).json(contact);
      } catch (error) {
        next(error);
      }
};

// const deleteContact = async (req, res, next) => {};

const createContact = async (req, res, next) => {
    try {
        const {error} = createContactSchema.validate(req.body);
        if(error) {
            throw HttpError(400, error.message);
        }
        const newContact = await addContact(req.body);
        res.status(201).json(newContact);
    } catch (error) {
        next(error);
      }
};

const updateContact = async (req, res, next) => {
    try {
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
    } catch (error) {
        next(error);
};}

module.exports = {
    getAllContacts,
    getOneContact,
    // deleteContact,
    createContact,
    updateContact
};