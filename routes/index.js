var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
var router = express.Router();
var short_url = require('./models/short_url.js');




router.use(bodyParser.json());
router.use(cors());
//Database connection
var MongoClient = require('mongodb').MongoClient;

var uri = "mongodb://njanne19:janne123@cluster0-shard-00-00-oke0j.mongodb.net:27017,cluster0-shard-00-01-oke0j.mongodb.net:27017,cluster0-shard-00-02-oke0j.mongodb.net:27017/,cluster0-shard-00-00-oke0j.mongodb.net:27017/admin?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin";
MongoClient.connect(uri, function(err, db) {
  db.close();
});


router.get('/', function (req, res, next) {
  res.render('index');
});


//Database Referencing
router.get('/:urlToForward', function (req, res, next) {

  var userSnippet = req.params.urlToForward;

  short_url.findOne({'short_url' : userSnippet}, function (err, data) {
     if (err) res.send("ERROR READING DATABASE/URL NOT FOUND");

     var regEx2 = new RegExp("^(http|https)://", "i");

     var toCheck = data.original_url;

     if(regEx2.test(toCheck) == true) {
       res.redirect(301, data.original_url);
     }

     else {
       res.redirect(301, 'http://' + data.original_url);
     }
  });
});






//Database logging
router.get('/new/:urlToShorten(*)', function(req, res, next) {

var original_url = req.params.urlToShorten;


var regEx = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;



if(regEx.test(original_url) == true) {
  var short =  Math.floor(Math.random()*10000000000).toString();
  var data = new short_url(
    {
      original_url : original_url,
      short_url : short
    }
  );

  data.save(function (err) {
    if (err) {
      return res.send("Error with database");
    }
  });
  res.json({original_url : data.original_url, short_url: data.short_url});
}
return res.json({response: "Error invalid URL"});
});


module.exports = router;
