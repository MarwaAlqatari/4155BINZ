require("dotenv").config();

const express = require("express"); //importing is like making variables.
const listingRouter = require("./controllers/ListingController");
const connectDB = require("./db/db");
<<<<<<< HEAD
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require ("mongoose");

const userRoutes = require('./api/routes/user');
=======
const userRouter = require("./controllers/userController");
const cors = require("cors");
>>>>>>> 9e18b06d3c3f9350a77e96288e22df43832aae30

const app = express(); //starting point for app.js

connectDB();

app.use(cors());
app.use("/uploads", express.static("uploads"));
app.use("/user", listingRoutes); //user route
app.use(express.json()); //able to read json from req
app.use("/user", userRouter);
console.log(process.env.PASSWORD);
//get post put delete crud
app.use("/listings", listingRouter); //any req will be sent to this file

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Running on port ${PORT}`)); //starts server on port 8080
