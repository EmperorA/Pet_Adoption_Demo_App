const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const {
  verifyPassword,
  findUserById,
  findUserByEmail,
} = require("../models/user.model"); // Adjust as needed

const strategy = new LocalStrategy(
  { usernameField: "email" },
  async (email, password, done) => {
    try {
      const user = await findUserByEmail(email); // Find the user by email
      if (!user) {
        return done(null, false, { message: "Incorrect email." });
      }
      const authenticatedUser = await verifyPassword(email, password);
      return done(null, authenticatedUser);
    } catch (err) {
      return done(err);
    }
  }
);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id); // Store user id in session
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await findUserById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports = passport;
