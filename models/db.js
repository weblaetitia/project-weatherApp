var mongoose = require('mongoose')
require('dotenv').config()

var uri = process.env.DB_INFO

var options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true
  }
 

mongoose.connect(uri, options, function(error){
      if (error) {
        console.log(error);
      } else {
        console.log("connection ok");
      }
    }
  )
