//models/Project.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var projectSchema = new Schema({
  title: String,
  description: String,
  category: String,
  date_created: Date,
});
module.exports = mongoose.model('Project', projectSchema);