const passport = require("passport");

function httpHandleUserLogin(req, res) {
  // The controller will use the local strategy defined in the passport.js configuration
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    if (!user) {
      return res
        .status(401)
        .json({ message: "Username or password incorrect." });
    }
    // If username & password are correct, Passport will log in the user to the passport session
    req.logIn(user, function (err) {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      return res.json({
        message: "Login successful.",
        data: { username: user.email, userId: user.id },
      });
    });
  })(req, res);
}
const httpHandleUserLogout = (req, res) => {
  if (req.isAuthenticated()) {
    req.logout(function (err) {
      if (err) {
        return res
          .status(500)
          .json({ message: "There was an error logging out." });
      }
      req.session.destroy(function (err) {
        if (err) {
          return res
            .status(500)
            .json({ message: "There was an error destroying the session." });
        }
        res.clearCookie("connect.sid");

        return res.json({ message: "Logout successful" });
      });
    });
  } else {
    res.clearCookie("connect.sid");
    res.status(401).json({ message: "You are not logged in." });
  }
};

const httpGetAuthenticatedUser = (req, res) => {
  if (req.isAuthenticated()) {
    return res.json(req.user);
  } else {
    return res.status(401).json({ message: "You are not logged in." });
  }
};

module.exports = {
  httpHandleUserLogin,
  httpHandleUserLogout,
  httpGetAuthenticatedUser,
};
