'use strict'

var express = require( 'express' )
var morgan = require( 'morgan' )
var app = express()

app.use(morgan('dev'))

app.get('/', function(req, res) {
  res.send('Hey yooo!')
})

app.listen(8080);