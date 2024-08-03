const {findForm}= require('../../models/form.model')

async function httpHandleFormRetrieval(req, res){
    const handleFormRetrieval= await findForm(req.query)
    return res.json(handleFormRetrieval)
}

module.exports= {
    httpHandleFormRetrieval
}

