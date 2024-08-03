const {searchUser}= require('../../models/user.model')

async function httpHandleUserSearch(req, res){
    const handleUserSearch= await searchUser(req.query)
    return res.json(handleUserSearch)

}

module.exports= {
    httpHandleUserSearch
}