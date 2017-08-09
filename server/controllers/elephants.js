var mongoose = require('mongoose');
var Elephant = mongoose.model('Elephant');
module.exports = {
    show_all: function (req, res) {
        Elephant.find({}, function (err, elephants) {
            res.render('index', { 'elephants': elephants })
        })
    },
    create: function (req, res) {
        var elephant = new Elephant({ name: req.body.name, age: req.body.age });
        elephant.save(function (err) {
            if (err) {
                console.log("could not create elephant")
            }
            else {
                res.redirect('/')
            }
        })
    },
    edit: function (req, res) {
        Elephant.find({ _id: req.params.id }, function (err, elephant) {
            if (err) {
                console.log("could not find elephant!");
            }
            else {
                res.render('edit', { 'elephant': elephant[0] })

            }
        })
    },
    update: function (req, res) {
        Elephant.update({ _id: req.params.id }, { $set: { name: req.body.name, age: req.body.age } }, function (err, elephant) {
            if (err) {
                console.log("couldl not update elephant");
            }
            else {
                res.redirect('/')
            }
        })
    },
    delete: function (req, res) {
        Elephant.remove({ _id: req.params.id }, function (err) {
            if (err) {
                console.log("could not remove elephant!")
            }
            else {
                res.redirect('/')
            }
        })
    }
}