var express = require('express');
var router = express.Router();
var request = require('sync-request');

var CityModel = require('../models/weather')

/* GET weather page. */
router.get('/', async function(req, res, next) {
  // user existe
  if (req.session.user != null) {
    cityList = await CityModel.find()
    res.render('weather', {cityList:cityList});
  } else {
    res.redirect('/')
  }
});

/* POST newcity page. */
router.post('/add-city', async function(req, res) {
  //  appeler weather api
  var myRequest = request('GET', (`https://api.openweathermap.org/data/2.5/weather?q=${req.body.cityname}&units=metric&lang=en&appid=3a50b49408c422fcd643322fc5c918c9`))
  if (myRequest.statusCode > 300) {
    // city not found
    res.locals.notFound = 'City not found'
    res.render('weather')
  } else {
    var myRequest = JSON.parse(myRequest.getBody())
    // verif si une entré existe
    var cityExist = await CityModel.findOne({name: myRequest.name})

    if (cityExist) {
      // city exist
      res.locals.exist = "This city is allready in your list"
      res.render('weather')
    }
    
    if ((cityExist == null) && (myRequest.name)) {
      var newCity = new CityModel ({
        name : myRequest.name,
        description : myRequest.weather[0].description,
        icon : myRequest.weather[0].icon,
        minTemp: myRequest.main.temp_min,
        maxTemp: myRequest.main.temp_max,
        lon: myRequest.coord.lon,
        lat: myRequest.coord.lat
      })
      await newCity.save()
    } 
  }
    res.redirect(`/weather`)
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
    myRequest = JSON.parse(myRequest.getBody())
    await CityModel.updateOne( 
      { _id : cityList[i].id },
      {
        description : myRequest.weather[0].description,
        icon : myRequest.weather[0].icon,
        minTemp: myRequest.main.temp_min,
        maxTemp: myRequest.main.temp_max, 
        lon: myRequest.coord.lon,
        lat: myRequest.coord.lat
      })
  }
  
  res.render('weather')
});






// keep this at the end
module.exports = router;
