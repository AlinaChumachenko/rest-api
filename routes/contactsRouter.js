const express = require("express");
const {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateFavorite
} = require("../controllers/contactsControllers.js");
const isValidId = require("../helpers/isValidId.js");
const authenticate = require("../helpers/authenticate.js");

const contactsRouter = express.Router();

contactsRouter.get("/", authenticate, getAllContacts);

contactsRouter.get("/:id", authenticate, isValidId, getOneContact);

contactsRouter.delete("/:id", authenticate, isValidId, deleteContact);

contactsRouter.post("/", authenticate, createContact);

contactsRouter.put("/:id", authenticate, isValidId, updateContact);

contactsRouter.patch("/:id/favorite", authenticate, isValidId, updateFavorite);

module.exports = contactsRouter;