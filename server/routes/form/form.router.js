const express = require("express");

const formRouter = express.Router();

const {httpHandleFormRetrieval}= require('./form.controller')

formRouter.get('/form',httpHandleFormRetrieval )

module.exports= formRouter