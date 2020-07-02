var express = require('express');
var router = express.Router();
var request = require('sync-request');


/* GET home page. */
router.get('/', function(req, res, next) {
  // faire un truc
  res.render('login');
});












// keep this at the end
module.exports = router;
