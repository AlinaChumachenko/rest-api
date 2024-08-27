const express = require("express");
const { register, login } = require("../controllers/authControllers.js");


const contactsRouter = express.Router();

contactsRouter.post("/register", register),
contactsRouter.post("/login", login),

module.exports = contactsRouter;

