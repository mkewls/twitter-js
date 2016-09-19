'use strict'

var express = require( 'express' )
var morgan = require( 'morgan' )
var nunjucks = require('nunjucks')
var app = express()

nunjucks.configure('views'); // point nunjucks to the proper directory for templates
app.set('view engine', 'html'); // have res.render work with html files
app.engine('html', nunjucks.render); // when giving html files to res.render, tell it to use nunjucks

nunjucks.configure('views', { noCache: true })



app.use(morgan('dev'))

app.get('/', function(req, res) {
	var people = [{name: '1'}, {name: '2'}, {name: '3'}];
	res.render( 'index', {title: 'Hello', people: people} );
})

app.listen(8080);