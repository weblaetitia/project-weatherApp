var express = require('express');
var router = express.Router();
var request = require('sync-request');

var UsersModel = require('../models/users')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* POST sign-up page */
router.post('/sign-up', async function(req, res) {
  if((req.body.username) && (req.body.email) && (req.body.password)) {
    var newUser = new UsersModel ({
      name : req.body.username,
      email : req.body.email,
      password : req.body.password
    })
    await newUser.save()

    res.redirect('/weather')
  } else {
    // envoyer une erreur
  }
  
});

module.exports = router;
