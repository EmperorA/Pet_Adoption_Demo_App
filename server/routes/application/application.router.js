const express = require("express");

const applicationRouter = express.Router();

const {
    httpHandleApplicationCreation,
    httpHandleGetApplicationById,
    httpHandleApplicationSearch,
    httpHandleApplicationUpdate,
    httpHandleApplicationDelete
} = require("./application.controller");


//Create a new application
applicationRouter.post('/application', httpHandleApplicationCreation);

//Update an existing application
applicationRouter.patch('/application/:id', httpHandleApplicationUpdate)

//Get an application by id
applicationRouter.get('/application/:id', httpHandleGetApplicationById)


//Get an application by search query
applicationRouter.get('/applications/search', httpHandleApplicationSearch)


//Delete an application by id
applicationRouter.delete('/application/:id', httpHandleApplicationDelete)

module.exports = applicationRouter;