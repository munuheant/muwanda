// server.js
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var morgan = require('morgan');
var chalk = require('chalk');
var cors = require('cors');
var db = require('./dao/database.js');
var person=require('./routes/person.js');
var app = express();
var port =Number(process.env.PORT || 8080);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
 app.use(cors({
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'origin': '*',
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
 }));
app.use(function(req, res, next) {       
  console.log(chalk.bold.blue(req.method, req.url));          next();
});
app.param('key',function(req,res,next,value){
  //validate key
  console.log( chalk.bold.green(value));
  next();
});
app.param('signature',function(req,res,next,value){
  console.log( chalk.bold.green(value));  
  next(); 
});
app.use('/api/:key/:signature/',person);
app.listen(port, function() {
  console.log(chalk.bold.cyan( '... API-v1  ') + chalk.bold.red(port));
});

