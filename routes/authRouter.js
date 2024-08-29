const express = require("express");

const { register, login, getCurrent, logout, updateAvatar } = require("../controllers/authControllers.js");
const authenticate = require("../helpers/authenticate.js");
const validateBody = require("../helpers/validateBody.js");
const { registerSchema, loginSchema } = require("../schemas/usersSchemas.js");
const upload = require("../middlewares/upload.js");


const authRouter = express.Router();

authRouter.post("/register", validateBody(registerSchema), register),
authRouter.post("/login", validateBody(loginSchema), login),

authRouter.get("/current", authenticate, getCurrent);
authRouter.post("/logout", authenticate, logout);
authRouter.patch("/avatars", authenticate, upload.single("avatar"), updateAvatar);

module.exports = authRouter;