// import express from "express";
// import morgan from "morgan";
// import cors from "cors";

// import contactsRouter from "./routes/contactsRouter.js";

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
// const dotenv = require("dotenv");

const contactsRouter = require("./routes/contactsRouter.js");

// dotenv.config();

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

//-----------------------------------------------------------------
// app.get("/", (req, res) => {
//   res.json({ message: "It works!" });
// })

//-----------------------------------------------------------------
// app.get("/contacts", (req, res) => {
//   res.json({ message: "It works page contacts!" });
// })

//-----------------------------------------------------------------
// const contacts = require("./bd/contacts.json");

// app.use((req, res, next) => {
//   console.log('Hello from the first middleware');
//   next();
// });

// app.use((req, res, next) => {
//   console.log('Hello from the second middleware');
//   next();
// });

// app.get("/contacts", (req, res) => {
//   res.json(contacts);
// })

app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

app.listen(3000, () => {
  console.log("Server is running. Use our API on port: 3000");
});