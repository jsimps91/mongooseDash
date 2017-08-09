var mongoose = require('mongoose');

var ElephantSchema = new mongoose.Schema({
    name: String,
    age: Number
})

var Elephant = mongoose.model('Elephant', ElephantSchema);
