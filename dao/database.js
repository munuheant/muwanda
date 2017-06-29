//database access object
// Require the nedb module

var store = require('nedb');
var person = new store({ 
  filename: __dirname +'/store/person',
  autoload: true,
  timestampData:true
});
person.ensureIndex({
  fieldName: 'email', 
  unique: true
});
function createPerson(req,res,next){
  var p = {firstname:req.body.firstname,
	  secondname: req.body.secondname,
	  surname: req.body.surname,
	  email: req.body.email,
	  cellphone: req.body.cellphone,
	  password: req.body.password
  };
  person.insert(p, function(err,p){
    if(err){res.send(err);}
    res.status(200).json({
       status: 'success',
       message: 'Inserted one Person'
    });
  });                                   
};
function getAllPerson(req,res,next){
  person.find({}).sort({updatedAt:-1}).exec(function(err, p) {
    if (err) res.send(err);
    req.data = p;
    res.status(200).json({
      status: 'success',
      data: p,
      message: 'Retrieved ALL Persons'
    });
  });
};
function getSinglePerson(req,res,next){
  var id = req.params.personid;
  person.findOne({ _id: id }, {}, function(err, p) {
    if(err) res.send(err);
    res.status(200).json({
      status: 'success',
      data: p,
      message: 'Retrieved ONE Person'
    });
  });
};
function updatePerson(req,res,next){};
function removePerson(req,res,next){};
module.exports = {
  getAllPerson: getAllPerson,
  getSinglePerson: getSinglePerson,
  createPerson: createPerson,
  updatePerson: updatePerson,
  removePerson: removePerson
};
