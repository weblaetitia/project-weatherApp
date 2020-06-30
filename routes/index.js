var express = require('express');
var router = express.Router();
var request = require('sync-request');

// my city-list
var cityList = []

var pushCity = (apiResult) => {
  cityList.push({
    name : apiResult.name,
    description : apiResult.weather[0].description,
    icon : apiResult.weather[0].icon,
    minTemp: apiResult.main.temp_min,
    maxTemp: apiResult.main.temp_max,
  })
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('weather', {cityList:cityList});
});

/* GET weather page. */
router.get('/weather', function(req, res, next) {
  res.render('weather', {cityList:cityList});
});

/* POST newcity page. */
router.post('/addcity', function(req, res, next) {

  //  appeler weather api
  var myRequest = request('GET', (`https://api.openweathermap.org/data/2.5/weather?q=${req.body.cityname}&units=metric&lang=fr&appid=3a50b49408c422fcd643322fc5c918c9`))
  console.log(myRequest)
  if (myRequest.statusCode == 404) {
    console.log('NOT FOUND')
    res.locals.notFound = 'City not found'
    res.render('weather', {cityList:cityList});
  } else {
    var myResult = JSON.parse(myRequest.getBody())
    if (cityList < 1) {
      pushCity(myResult)
    } else {
      var cityExist = false
      cityList.forEach(city => {
        if ( city.name.toLowerCase() == req.body.cityname.toLowerCase() ) {
          cityExist = true
          res.locals.exist = 'City allready added'
        }
      })
      if (cityExist == false) {
        pushCity(myResult)
      }
    }
    res.render('weather', {cityList:cityList});
  }
  
});

/* GET deletecity page. */
router.get('/deletecity', function(req, res, next) {
  cityList.splice(req.query.position, 1)
  res.render('weather', {cityList:cityList});
});

module.exports = router;
