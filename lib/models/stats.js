'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
var StatSchema = new Schema({
    date: {type: Date, default: new Date()},
    holod: Number,
    gor: Number,
    svet: Number
});

mongoose.model('Stat', StatSchema);