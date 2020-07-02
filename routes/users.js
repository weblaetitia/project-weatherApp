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
    // verif if email n'existe pas
    var inputEmail = req.body.email
    var existUser = await UsersModel.findOne({
      email: inputEmail
    })
    if (existUser == null) {
      var newUser = new UsersModel ({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password
      })
       var user = await newUser.save()
      // stock une info dans un objet de session
      req.session.user = {
        name: user.name,
        _id: user._id
      }
      res.redirect('/weather')
    } else {
      // renvoyer une erreur
      console.log('email deja existant')
      res.render('login')
    }
    
  } else {
    // envoyer une erreur
    console.log('veuillez remplir tous les champs')
    res.render('login')
  }
});

/* POST sign-in page */
router.post('/sign-in', async function(req, res) {
  if((req.body.email) && (req.body.password)) {
    // verifier si email et password existent dans la base de donné
    var okUser = await UsersModel.findOne({
      email: req.body.email
    })
    if ((okUser != null) && (okUser.password == req.body.password)) {
      req.session.user = {
        name: okUser.name,
        _id: okUser._id
      }
      res.redirect('/weather')
    } else {
      // envoyer une erreur
      console.log('pas les memes passwords')
      res.render('login')
    }
    
  } else {
    // envoyer une erreur
    console.log('remplire les 2 champs svp')
    res.render('login')
  }

});


/* GET log-out page */
router.get('/logout', function (req, res) {
  req.session.user = null

  res.redirect('/')
})








// kepp that at the end
module.exports = router;
