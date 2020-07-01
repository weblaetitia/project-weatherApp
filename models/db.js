var mongoose = require('mongoose')

// require('dotenv')
// var uri = DB_INFO
var uri = ***REMOVED***

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
