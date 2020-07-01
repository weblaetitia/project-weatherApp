var mongoose = require('mongoose')

// Schema
var citySchema = mongoose.Schema({
    name: String,
    description : String,
    icon: String,
    minTemp: Number,
    maxTemp: Number,
})

// model
var CityModel = mongoose.model('citys',citySchema)

// export models 
module.exports = CityModel