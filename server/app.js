//Module imports
require("dotenv").config();
const express = require("express");
const cors = require("cors"); //for client side requests
const helmet = require("helmet"); // good practice for securing http response headers
const morgan = require("morgan"); // for logging http requests
const session = require("express-session"); // for session-based authentication
const passport = require("passport"); //for authentication
const MemoryStore = require("memorystore")(session); //for storing session data in Express

//Create express server
const app = express();
//add JSON parsing
app.use(express.json());

//add Helmet
app.use(helmet());
// add cors middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
//add logging
app.use(morgan("combined")); //combined is a predefined format as to how the output is logged; this is the standard Apache combined log output

//Import passport configuration
require("./services/passport");

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MemoryStore({
      checkPeriod: 86400000, // prune/remove expired entries every 24h
    }),
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, // Equals 1 day (1 day * 24 hr/1 day * 60 min/1 hr * 60 sec/1 min * 1000 ms / 1 sec)
    },
  })
);

//Initialize sessions & passport
app.use(passport.initialize());
app.use(passport.session());

//FOR TESTING PURPOSES
app.use((req, res, next) => {
  // console.log("Session ID:", req.sessionID);
  // console.log("Session:", req.session);
  // console.log("User:", req.user);
  next();
});

//Import v1 api configuration. Good practice to work with versions
const api = require("./api");
app.use("/v1", api);

module.exports = app;
