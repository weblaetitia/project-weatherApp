var express = require('express');
var router = express.Router();
var request = require('sync-request');

var CityModel = require('../models/weather')

/* GET weather page. */
router.get('/', async function(req, res, next) {
  cityList = await CityModel.find()
  res.render('weather', {cityList:cityList});
});

/* POST newcity page. */
router.post('/add-city', async function(req, res) {
  //  appeler weather api
  var myRequest = request('GET', (`https://api.openweathermap.org/data/2.5/weather?q=${req.body.cityname}&units=metric&lang=fr&appid=3a50b49408c422fcd643322fc5c918c9`))
  if (myRequest.statusCode > 300) {
    res.locals.notFound = 'City not found'
  } else {
    var myRequest = JSON.parse(myRequest.getBody())
    // verif si une entré existe
    var cityExist = await CityModel.findOne({name: myRequest.name})

    if (cityExist) {
      res.locals.exist = "This city is allready in your list"
    }
    
    if ((cityExist == null) && (myRequest.name)) {
      var newCity = new CityModel ({
        name : myRequest.name,
        description : myRequest.weather[0].description,
        icon : myRequest.weather[0].icon,
        minTemp: myRequest.main.temp_min,
        maxTemp: myRequest.main.temp_max,
      })
      await newCity.save()
    } 
  }
    res.redirect('/weather')
})
  

/* GET deletecity page. */
router.get('/delete-city', async function(req, res) {
  var cityID = req.query.id
  await CityModel.deleteOne( {_id:cityID})
  
  res.redirect('/weather')
});

/* GET update-city page. */
router.get('/update-city', async function(req, res) {
  var cityList = await CityModel.find()
  
  for (i=0; i<cityList.length; i++) {
    var myRequest = request('GET', (`https://api.openweathermap.org/data/2.5/weather?q=${cityList[i].name}&units=metric&lang=fr&appid=3a50b49408c422fcd643322fc5c918c9`))
    // console.log(cityList[i].name)
    myRequest = JSON.parse(myRequest.getBody())
    // console.log(myRequest)
    await CityModel.updateOne( 
      { _id : cityList[i].id },
      {
        description : myRequest.weather[0].description,
        icon : myRequest.weather[0].icon,
        minTemp: myRequest.main.temp_min,
        maxTemp: myRequest.main.temp_max, 
      })
  }
  
  res.redirect('/weather')
});






// keep this at the end
module.exports = router;
