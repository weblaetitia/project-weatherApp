var express = require('express');
var router = express.Router();
var request = require('sync-request');

// my city-list

var cityList = [

]

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

  //  appeler wether api
  var myRequest = request('GET', (`https://api.openweathermap.org/data/2.5/weather?q=${req.body.cityname}&units=metric&lang=fr&appid=3a50b49408c422fcd643322fc5c918c9`))
  console.log(JSON.parse(myRequest.getBody()))
  var myResult = JSON.parse(myRequest.getBody())

  // end appeler wether api


  if (cityList < 1) {
    cityList.push({
      name : myResult.name,
      description : myResult.weather[0].description,
      icon : myResult.weather[0].icon,
      image: './images/picto-1.png',
      minTemp: myResult.main.temp_min,
      maxTemp: myResult.main.temp_max,
    })
  } else {
    var cityExist = false
    cityList.forEach(city => {
      if ( city.name.toLowerCase() == req.body.cityname.toLowerCase() ) {
        cityExist = true
        res.locals.exist = 'City allready added'
      }
    })
    if (cityExist == false) {
      cityList.push({
        name : myResult.name,
        description : myResult.weather[0].description,
        icon : myResult.weather[0].icon,
        image: './images/picto-1.png',
        minTemp: myResult.main.temp_min,
        maxTemp: myResult.main.temp_max,
      })
    }
  }
  res.render('weather', {cityList:cityList});
});

/* GET deletecity page. */
router.get('/deletecity', function(req, res, next) {
  cityList.splice(req.query.position, 1)
  res.render('weather', {cityList:cityList});
});

module.exports = router;
