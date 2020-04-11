require("dotenv").config();

const express = require("express"); //importing is like making variables.
const listingRouter = require("./controllers/ListingController");
const connectDB = require("./db/db");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require ("mongoose");

const userRoutes = require('./routes/user');

const userRouter = require("./controllers/userController");
const cors = require("cors");

const app = express(); //starting point for app.js

connectDB();

app.use(cors());
app.use("/uploads", express.static("uploads"));
app.use("/user", listingRouter); //user route
app.use(express.json()); //able to read json from req
app.use("/user", userRouter);
console.log(process.env.PASSWORD);
//get post put delete crud
app.use("/listings", listingRouter); //any req will be sent to this file

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Running on port ${PORT}`)); //starts server on port 8080