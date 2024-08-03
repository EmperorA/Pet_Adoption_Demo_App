const express = require("express");

const userSearchRouter = express.Router();

const {
    httpHandleUserSearch,
} = require("./userSearch.controller");


//Router for user login
userSearchRouter.get('/user/search', httpHandleUserSearch);

module.exports = userSearchRouter;