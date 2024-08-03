const express = require("express");

const healthRouter = express.Router();

const {
  returnHealthStatus,
} = require("../routes/health.controller");


//Test function to check that only logged in users can access protected routes
//DO NOT DELETE, it will be reused later
function isAuthenticated (req,res,next){
  if(req.isAuthenticated())
      next();
  else
      res.status(401).json({
       error: 'User not authenticated'
     })

}
//TO DO remove isAuthenticated later, leave for test purposes
healthRouter.get('/health', isAuthenticated, returnHealthStatus);

module.exports = healthRouter;
