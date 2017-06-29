//person router
var express = require('express');
var chalk = require('chalk');
var person = express.Router();
var db = require('../dao/database.js');
person.param('personid',function(req,res,next,value){
  //get usr from db and save in req
  console.log( chalk.bold.green(value)); 
  next();
});
person.post('/person',db.createPerson);
person.get('/person',db.getAllPerson);
person.get('/person/:personid',db.getSinglePerson);
module.exports = person;
