var express = require('express');
var router = express.Router();

// my city-list

var cityList = [

]

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

/* GET weather page. */
router.get('/weather', function(req, res, next) {
  res.render('weather', {cityList:cityList});
});

/* POST newcity page. */
router.post('/addcity', function(req, res, next) {
  if (cityList < 1) {
    cityList.push({
      name : req.body.cityname,
      image: './images/picto-1.png',
      minTemp: '18.2',
      maxTemp: '26.5',
    })
  } else {
    var cityExist = false
    cityList.forEach(city => {
      if ((city.name != req.body.cityname) && (cityExist == false)) {
        cityList.push({
          name : req.body.cityname,
          image: './images/picto-1.png',
          minTemp: '18.2',
          maxTemp: '26.5',
        })
      } else {
        cityExist = true
        res.locals.exist = 'City allready added';
      }
    })
  }
  res.render('weather', {cityList:cityList});
});

/* GET deletecity page. */
router.get('/deletecity', function(req, res, next) {
  cityList.splice(req.query.position, 1)
  res.render('weather', {cityList:cityList});
});

module.exports = router;
