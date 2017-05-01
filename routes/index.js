var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
var router = express.Router();
var shortURL = require('./models/short_url');




router.use(bodyParser.json());
router.use(cors());

router.get('/', function (req, res, next) {
  res.render('index');
});


//Database
router.get('/new/:urlToShorten(*)', function(req, res, next) {




  res.json({original_url:req.params.urlToShorten})
});


module.exports = router;
