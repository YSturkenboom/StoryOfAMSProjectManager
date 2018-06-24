//server/routes/routes.js
var express = require('express');
var router = express.Router();
router.get('/', function(req, res){
  res.render('index')
});
module.exports = router;

var bodyParser = require('body-parser');
var Project = require('../../models/Project');

router.get('/', function(req, res){
  res.render('index')
});

router.route('/insert')
.post(function(req,res) {
    var project = new Project();
    project.title = req.body.title;
    project.description = req.body.desc;
    project.category = req.body.category;
    project.date_created = req.body.date;
    
    project.save(function(err) {
        if (err)
            res.send(err);
        res.send('Project successfully added!:' + req.body.category);
    });
})

router.route('/update')
.post(function(req, res) {
    const doc = {
        title: req.body.title,
        description: req.body.description,
        date_created: req.body.date
    };
    console.log(doc);
    Project.update({_id: req.body._id}, doc, function(err, result) {
        if (err)
            res.send(err);
        res.send('Project successfully updated!');
    });
});

router.get('/delete', function(req, res){
    var id = req.query.id;
    Project.find({_id: id}).remove().exec(function(err, project) {
        if(err)
            res.send(err)
        res.send('Project successfully deleted!');
    })
});

router.get('/getAll',function(req, res) {
    Project.find({}, function(err, projects) {
        if (err)
            res.send(err);
        res.json(projects);
    });
});

module.exports = router;
