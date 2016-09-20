'use strict'

var express = require( 'express' );
var morgan = require( 'morgan' );
var nunjucks = require('nunjucks');
var socketio = require('socket.io');
var routes = require('./routes');
var app = express();
var server = app.listen(8080);
var io = socketio.listen(server);

nunjucks.configure('views', { noCache: true })
app.set('view engine', 'html'); // have res.render work with html files
app.engine('html', nunjucks.render); // when giving html files to res.render, tell it to use nunjucks

app.use(morgan('dev'));
app.use('/', routes(io));
app.use(express.static('public'));
