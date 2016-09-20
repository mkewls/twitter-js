'use strict'

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
// could use one line instead: var router = require('express').Router();
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var tweetBank = require('../tweetBank');

router.get('/', function (req, res) {
  var tweets = tweetBank.list();
  res.render( 'index', { tweets: tweets, showForm: true, showName: false } );
});

router.get('/users/:name', function(req, res) {
  var name = req.params.name;
  var tweets = tweetBank.find(function(element){
	return element.name.indexOf(name) > -1;
  });
  res.render( 'index', { tweets: tweets, showForm: true, showName: true } );
});

router.get('/tweets/:ident', function(req, res) {
  var ident = Number(req.params.ident);
  var tweets = tweetBank.find({ident: ident});
  res.render( 'index', { tweets: tweets, showForm: false } );
});

router.post('/tweets', urlencodedParser, function (req, res) {
  if (!req.body) return res.sendStatus(400);
  var name = req.body.name;
  var text = req.body.text;
  tweetBank.add(name, text);
  res.redirect('/');
});

// io.sockets.emit('newTweet', { tweets: tweets });

module.exports = function (io) {
  router.io = io;
  return router;
};