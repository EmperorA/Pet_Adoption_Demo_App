//Module imports
const express= require('express')

//Initialize router
const api= express.Router()


//Health endpoint
const healthRouter= require('./routes/health.router')
api.use(healthRouter)


//User Registration
const registerRouter= require('./routes/userRegistration/register.router')
api.use(registerRouter)

//Listing endpoint
const listingRouter= require('./routes/listing/listing.router')
api.use(listingRouter)

//Application endpoint
const applicationRouter= require('./routes/application/application.router')
api.use(applicationRouter)

//User login
const loginRouter= require('./routes/userLogin/userLogin.router')
api.use(loginRouter)

//User search
const userSearchRouter= require('./routes/userSearch/userSearch.router')
api.use(userSearchRouter)

//Form router
const getForm= require('./routes/form/form.router')
api.use(getForm)

module.exports= api