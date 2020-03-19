const express = require("express");
const Listing = require("../models/listing");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});
const fileFilter = (re1, file, cb) => {
  //reject a file
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

const {
  getListing,
  getListings,
  addListing,
  removeListing,
  putListing
} = require("../repositories/listingRepository");

const router = express.Router(); //all routes are added to /listings

router.post("/", upload.single("listingImage"), async (req, res) => {
  //add listing
  //take in data from user
  const {
    name,
    phone,
    email,
    duration,
    rentPerMonth,
    location,
    pets,
    furnished,
    startDate,
    endDate,
    comments
  } = req.body;
  const listingImage = req.file.path;
  const listing = new Listing(
    null,
    name,
    phone,
    email,
    duration,
    rentPerMonth,
    location,
    pets,
    furnished,
    startDate,
    endDate,
    comments,
    listingImage
  ); //creating object
  const insertedListing = await addListing(listing);
  return res.status(201).json(insertedListing);
});

router.put("/:id", async (req, res) => {
  //Update listing
  const {
    name,
    phone,
    email,
    duration,
    rentPerMonth,
    location,
    pets,
    furnished,
    startDate,
    endDate,
    comments
  } = req.body;
  const listingImage = req.file.path;
  const { id } = req.params;
  const listing = new Listing(
    null,
    name,
    phone,
    email,
    duration,
    rentPerMonth,
    location,
    pets,
    furnished,
    startDate,
    endDate,
    comments,
    listingImage
  );
  const updatedListing = await putListing(id, listing);
  return res.status(201).json(updatedListing);
});

router.get("/", async (req, res) => {
  //get '/' means get all the listings
  const listings = await getListings(); // getes list of listings
  return res.json(listings);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params; //get id
  console.log(id);
  const listing = await getListing(id);

  if (!listing) {
    return res.sendStatus(404);
  }

  return res.json(listing);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params; //get id
  await removeListing(id);
  res.sendStatus(200);
});

module.exports = router;
