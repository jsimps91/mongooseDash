var elephants = require('../controllers/elephants.js');
module.exports = function (app) {
    app.get('/', function (req, res) {
            elephants.show_all(req,res)
    })
    app.get('/new', function (req, res) {
        res.render('new')
    })
    app.post('/elephants', function (req, res) {
      elephants.create(req, res)

    })
    app.get('/elephants/edit/:id', function (req, res) {

        elephants.edit(req, res, req.params.id)
    })

    app.post('/elephants/:id', function (req, res) {
        elephants.update(req, res, req.params.id)
    })
    app.post('/elephants/destroy/:id', function (req, res) {
        elephants.delete(req, res, req.params.id)
    })
}