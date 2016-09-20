var express = require('express');
var router = express.Router();
// could use one line instead: var router = require('express').Router();
var tweetBank = require('../tweetBank');

router.get('/', function (req, res) {
  var tweets = tweetBank.list();
     // console.log('tweets: ', tweets);
  res.render( 'index', { tweets: tweets } );
});

router.get('/users/:name', function(req, res) {
  var name = req.params.name;

  var tweets = tweetBank.find(function(element){
	return element.name.indexOf(name) > -1;
});
    //console.log('tweets: ', tweets);
  res.render( 'index', { tweets: tweets } );
});

router.get('/tweets/:ident', function(req, res) {
  var ident = Number(req.params.ident);
  console.log(typeof ident);
  var tweets = tweetBank.find({ident: ident});
    //console.log('tweets: ', tweets);
  res.render( 'index', { tweets: tweets } );
});


module.exports = router;