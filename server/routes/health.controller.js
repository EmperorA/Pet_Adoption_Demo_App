//The controller takes in actions from the router and updates/makes changes to the model

function returnHealthStatus(req, res){
   return res.status(200).json({
    message: 'UP'
   })
}

module.exports = {
    returnHealthStatus,
}