const Listing = require("../models/listing");
const ListingSchema = require("../db/listingSchema");

const getListings = async () => {
  const listings = await ListingSchema.find().exec();
  return listings.map(
    l =>
      new Listing(
        l.id,
        l.name,
        l.phone,
        l.email,
        l.duration,
        l.rentPerMonth,
        l.location,
        l.pets,
        l.furnished,
        l.startDate,
        l.endDate,
        l.comments,
        l.listingImage
      )
  ); //so that it uses listing.js and not the mongoose format
};

const getListing = async id => {
  //id is parameter
  const listing = await ListingSchema.findById(id).exec();
  return listing;
};

const addListing = async listing => {
  const insertedListing = await ListingSchema.create({
    name: listing.name,
    phone: listing.phone,
    email: listing.email,
    duration: listing.duration,
    rentPerMonth: listing.rentPerMonth,
    location: listing.location,
    pets: listing.pets,
    furnished: listing.furnished,
    startDate: listing.startDate,
    endDate: listing.endDate,
    comments: listing.comments,
    listingImage: listing.listingImage
  });
  return new Listing(
    insertedListing.id,
    insertedListing.name,
    insertedListing.phone,
    insertedListing.email,
    insertedListing.duration,
    insertedListing.rentPerMonth,
    insertedListing.location,
    insertedListing.pets,
    insertedListing.furnished,
    insertedListing.startDate,
    insertedListing.endDate,
    insertedListing.comments,
    insertedListing.listingImage
  ); //convert from doc type to listing type
};

const putListing = async (id, listing) => {
  //id is parameter
  const updatedListing = await ListingSchema.findByIdAndUpdate(
    id,
    listing
  ).exec();
  return updatedListing;
};

const removeListing = async id => {
  await ListingSchema.findByIdAndDelete(id).exec();
};

module.exports = {
  getListings,
  getListing,
  addListing,
  removeListing,
  putListing
};
