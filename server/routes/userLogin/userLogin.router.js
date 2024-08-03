const express = require("express");

const loginRouter = express.Router();

const {
  httpHandleUserLogin,
  httpHandleUserLogout,
  httpGetAuthenticatedUser,
} = require("./userLogin.controller");

//Router for user login
loginRouter.post("/user/login", httpHandleUserLogin);
//Router for user logout
loginRouter.post("/user/logout", httpHandleUserLogout);
//Router for user authentication
loginRouter.get("/auth/user", httpGetAuthenticatedUser);

module.exports = loginRouter;
