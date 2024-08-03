const {
  newApplication,
  findApplicationById,
  searchApplication,
  updateApplication,
  deleteApplication,
} = require("../../models/application.model");

async function httpHandleApplicationCreation(req, res) {
  const httpHandleApplicationCreation = await newApplication(req.body);
  return res.json(httpHandleApplicationCreation);
}

async function httpHandleGetApplicationById(req, res) {
  const handleGetApplicationById = await findApplicationById(req.params.id);
  return res.json(handleGetApplicationById);
}

async function httpHandleApplicationSearch(req, res) {
  const handleApplicationSearch = await searchApplication(req.query);
  return res.json(handleApplicationSearch);
}

async function httpHandleApplicationUpdate(req, res) {
  const handleApplicationUpdate = await updateApplication(req.params.id, req.body);
  return res.json(handleApplicationUpdate);
}

async function httpHandleApplicationDelete(req, res) {
  const handleApplicationDelete = await deleteApplication(req.params.id, req.body);
  return res.json(handleApplicationDelete);
}


module.exports = {
  httpHandleApplicationCreation,
  httpHandleGetApplicationById,
  httpHandleApplicationSearch,
  httpHandleApplicationUpdate,
  httpHandleApplicationDelete,
};
