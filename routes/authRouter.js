const express = require("express");
const { register, login, getCurrent, logout } = require("../controllers/authControllers.js");
const authenticate = require("../helpers/authenticate.js");


const contactsRouter = express.Router();

contactsRouter.post("/register", register),
contactsRouter.post("/login", login),

contactsRouter.get("/current", authenticate, getCurrent);
contactsRouter.post("/logout", authenticate, logout);

module.exports = contactsRouter;

