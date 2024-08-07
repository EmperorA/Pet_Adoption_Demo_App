// middlewares/authentication.js
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: "User is not authenticated" });
}

function httpGetAuthenticatedUser(req, res) {
  if (req.isAuthenticated()) {
    return res.json(req.user);
  } else {
    return res.status(401).json({ message: "You are not logged in." });
  }
}

module.exports = {
  ensureAuthenticated,
  httpGetAuthenticatedUser,
};
