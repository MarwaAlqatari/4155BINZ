require("dotenv").config();

const express = require("express"); //importing is like making variables.
const listingRouter = require("./controllers/ListingController");
const connectDB = require("./db/db");

const app = express(); //starting point for app.js

connectDB();

app.use("/uploads", express.static("uploads"));
app.use(express.json()); //able to read json from req
console.log(process.env.PASSWORD);
//get post put delete crud
app.use("/listings", listingRouter); //any req will be sent to this file

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Running on port ${PORT}`)); //starts server on port 8080
