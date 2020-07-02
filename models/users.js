var mongoose = require('mongoose')

// Schema
var userSchema = mongoose.Schema({
    name: String,
    email : String,
    password: String
})

// model
var UsersModel = mongoose.model('users',userSchema)

// export models 
module.exports = UsersModel