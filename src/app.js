const express = require("express"); //importing is like making variables.
const listingRouter = require("./controllers/ListingController");
const connectDB = require("./db/db");

const app = express(); //starting point for app.js

connectDB();

app.use("/uploads", express.static("uploads"));
app.use(express.json()); //able to read json from req

//get post put delete crud
app.use("/listings", listingRouter); //any req will be sent to this file

app.listen(8081, () => console.log("Running on port 8081")); //starts server on port 8080
