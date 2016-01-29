/**
 * Created by SMD on 1/8/2016.
 */
var express = require('express');
var server= require('http');
var path= require("path");
var mongoose= require("mongoose");
var mongodb = require('mongodb');

var bodyParser = require('body-parser');
var app= express();

var	publicPath	=	path.resolve(__dirname,	"www");
app.use(bodyParser.json());
app.use(express.static(publicPath));
app.get('*', function(req,res){
  var indexViewPath = path.resolve(__dirname, "./www/index.html");
  res.sendFile(indexViewPath);
  //console.log(publicPath);
  //res.sendFile("./www/index.html", { root: __dirname });
});
//
//app.get('/account', function(req, res){
//  res.sendFile("./www/templates/tab-account.html");
//});
//
app.post('/account', function(req, res){
var abc=req.body;
 res.send(abc);

});





//mongoose.connect('mongodb://localhost/Company');
//
//var Schema = new mongoose.Schema({
//  _id    : String,
//  name: String,
//  age   : Number
//});
//
//var user = mongoose.model('emp', Schema);
//
//
//app.post('/SalesMenDetail', function(req, res){
//
// var   body=req.body;
//
//res.send(body);
//});
//
//
//
//
//var MongoClient = mongodb.MongoClient;
//
//// Connection URL. This is where your mongodb server is running.
//var url = 'mongodb://localhost:27017/my_database_name';
//
//// Use connect method to connect to the Server
//MongoClient.connect(url, function (err, db) {
//  if (err) {
//    console.log('Unable to connect to the mongoDB server. Error:', err);
//  } else {
//    //HURRAY!! We are connected. :)
//    console.log('Connection established to', url);
//
//    // do some work here with the database.
//
//    //Close connection
//    db.close();
//  }
//});

app.listen(3000);
console.log("Server Running on port 3000");
