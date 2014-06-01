'use strict';

var mongoose = require('mongoose'),
    Stat = mongoose.model('Stat');


exports.stats = function(req, res){
    var promise = Stat.find({}).sort({date: -1}).exec();
    
    promise.then(function(stats){
        res.json(stats);
    }, function(err){
        res.send(500, err);
    });
};

exports.add = function(req, res){
    var stat = new Stat();
    
    stat.holod = req.param('holod');
    stat.gor = req.param('gor');
    stat.svet = req.param('svet');
    
    stat.save(function(){
        res.send(200);
    });
};

exports.delete = function(req, res){
    var id = req.param('id');
    console.log('trying to remove ' + id);
    
    Stat.findByIdAndRemove(id, function(){
        console.log('Removed ' + id);
        res.send(200);
    });
};