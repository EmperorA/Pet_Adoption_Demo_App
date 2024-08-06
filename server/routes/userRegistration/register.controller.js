const { createUser } = require("../../models/user.model");

async function httpHandleUserRegistration(req, res) {
  const { username, email, password, role } = req.body;
  const result = await createUser(username, email, password, role);
  if (result.error) {
    return res.status(400).json(result);
  }
  return res.status(201).json(result);
}

module.exports = {
  httpHandleUserRegistration,
};
