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
      name: req.body.username,
      email: req.body.email,
      password: req.body.password
    })
     var user = await newUser.save()

    // stock une info dans un objet de session
    req.session.name = user.name
    req.session.id = user._id

    res.redirect('/weather')
  } else {
    // envoyer une erreur
  }
});

/* POST sign-in page */
router.post('/sign-in', async function(req, res) {
  if((req.body.email) && (req.body.password)) {
    // verifier si email et password existent dans la base de donné
    var okUser = await UsersModel.find({
      email: req.body.email
    })
    if (okUser[0].password == req.body.password) {
      console.log('meme email meme password')
      res.redirect('/weather')
    } else {
      // envoyer une erreur
      console.log('pas les memes passwords')
      res.redirect('/')
    }
    
  } else {
    // envoyer une erreur
    console.log('remplire les 2 champs svp')
    res.redirect('/')
  }

});












// kepp that at the end
module.exports = router;
