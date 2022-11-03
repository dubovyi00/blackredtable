var express = require('express');
var socket = require('socket.io');
var fs = require('fs');
var util = require('util');
var app = express();
var server = app.listen(8888);
const { send } = require('process');
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json({limit: '10mb'})
  
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/auth', function(req, res) {
	console.log("auth", req.body)
    res.send("hi, " + req.body.login)
})