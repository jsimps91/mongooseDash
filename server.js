var express = require('express');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mongooseDashboard');
var ElephantSchema = new mongoose.Schema({
    name: String,
    age: Number
})
mongoose.model('Elephant', ElephantSchema);
var Elephant = mongoose.model('Elephant');

var app = express();

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

var path = require('path');

app.use(express.static(path.join(__dirname, './static')));

app.set('views', path.join(__dirname, './views'));

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    Elephant.find({}, function (err, elephants) {
        res.render('index', { 'elephants': elephants })
    })
})
app.get('/new', function (req, res) {
    res.render('new')
})
app.post('/elephants', function (req, res) {
    var elephant = new Elephant({ name: req.body.name, age: req.body.age });
    elephant.save(function (err) {
        if (err) {
            console.log("something went wrong");
        }
        else {
            console.log("succesfully added elephant!")
            res.redirect('/')
        }
    })

})
app.get('/elephants/edit/:id', function (req, res) {
    Elephant.find({ _id: req.params.id }, function (err, elephant) {
        if (err) {
            console.log("something went wrong");
        }
        else {
            res.render('edit', { 'elephant': elephant[0] })
            
        }
    })

})

app.post('/elephants/:id', function(req, res){
    Elephant.update({_id: req.params.id}, {$set:{name:req.body.name, age:req.body.age}},  function (err, elephant){
        if(err){
            console.log("something went wrong");
        }
        else{
            res.redirect('/')
        }
    })
})
app.post('/elephants/destroy/:id', function(req, res){
    Elephant.remove({_id: req.params.id}, function(err){
        if(err){
            console.log("something went wrong")
        }
        else{
            res.redirect('/')
        }
    })
})
app.listen(8000, function () {
    console.log("listening on port 8000");
})