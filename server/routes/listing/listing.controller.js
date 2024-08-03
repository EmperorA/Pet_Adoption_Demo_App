
const { newListing, findListingById, searchListing,updateListing } = require('../../models/listing.model')

async function httpHandleListingCreation(req, res){
    const httpHandleListingCreation = await newListing(req.body)
    return res.json(httpHandleListingCreation)
 }
 

async function httpHandleGetListingById(req,res){
  const handleGetListingById= await findListingById(req.params.id)
  return res.json(handleGetListingById)
 }

 async function httpHandleListingSearch(req,res){
  const handleListingSearch= await searchListing(req.query)
  return res.json(handleListingSearch)
 }

 async function httpHandleListingUpdate(req,res){
  const handleListingUpdate= await updateListing(req.params.id, req.body)
  return res.json(handleListingUpdate)
 }

 module.exports = {
   httpHandleListingCreation,
   httpHandleGetListingById,
   httpHandleListingSearch,
   httpHandleListingUpdate

 }