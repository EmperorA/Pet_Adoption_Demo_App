//Module imports
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const MemoryStore = require("memorystore")(session);
const { httpGetAuthenticatedUser } = require("./middleware/authentication");

//Create express server
const app = express();
//add JSON parsing
app.use(express.json());

//add Helmet
app.use(helmet());

app.use(cookieParser());

// add cors middleware
app.use(
  cors({
    origin: ["https://pet-adoption-demo-app.vercel.app"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Specify allowed methods
    allowedHeaders: ["Content-Type", "Authorization"],
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
      secure: process.env.NODE_ENV === "production", // Secure cookies only in production
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // SameSite set to 'None' for production, 'Lax' for development
      path: "/",
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

// Import chat routes
const chatRoutes = require("./routes/chatService/chatRoutes");
app.use("/api", httpGetAuthenticatedUser, chatRoutes); // Use the chat routes

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something broke!", error: err.message });
});

module.exports = app;
