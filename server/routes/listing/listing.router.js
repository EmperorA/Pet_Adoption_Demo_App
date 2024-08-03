const express = require("express");

const listingRouter = express.Router();

const {
    httpHandleListingCreation,
    httpHandleGetListingById,
    httpHandleListingSearch,
    httpHandleListingUpdate
} = require("./listing.controller");


//Create a new listing
listingRouter.post('/listing', httpHandleListingCreation);

//Update an existing listing
listingRouter.patch('/listing/:id', httpHandleListingUpdate)

//Get a listing by id
listingRouter.get('/listing/:id', httpHandleGetListingById)


//Get a listing by id
listingRouter.get('/listings/search', httpHandleListingSearch)


module.exports = listingRouter;