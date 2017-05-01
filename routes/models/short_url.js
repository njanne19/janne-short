//Template for short URL

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var urlSchema = new Schema({
original_url: String,
short_url: String
}, {timestamps: true});

var ModelClass = mongoose.model('short_url', urlSchema);

module.exports = ModelClass;
