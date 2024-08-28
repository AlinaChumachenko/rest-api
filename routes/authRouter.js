const express = require("express");

const { register, login, getCurrent, logout } = require("../controllers/authControllers.js");
const authenticate = require("../helpers/authenticate.js");
const validateBody = require("../helpers/validateBody.js");
const { registerSchema, loginSchema } = require("../schemas/usersSchemas.js");


const contactsRouter = express.Router();

contactsRouter.post("/register", validateBody(registerSchema), register),
contactsRouter.post("/login", validateBody(loginSchema), login),

contactsRouter.get("/current", authenticate, getCurrent);
contactsRouter.post("/logout", authenticate, logout);

module.exports = contactsRouter;

