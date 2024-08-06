const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { findUserById, verifyPassword } = require("../models/user.model");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await verifyPassword(email, password);
        if (!user) {
          return done(null, false, { message: "Incorrect email or password." });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await findUserById(id); // Ensure findUserById is correctly implemented
    done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports = passport;
