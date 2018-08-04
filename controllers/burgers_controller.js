// ### IMPORT EXPRESS ###
var express = require('express');
var router = express.Router();

// ### IMPORT MODEL ###
var burger = require('../models/burger.js');

router.get('/', function (req, res) {
    burger.all(function (data) {
        var burgerObject = {
            burgers: data
        };
        console.log(burgerObject);

        // display the returned database data
        res.render('index', burgerObject);
    });
});

router.post('api/burgers', function (req, res) {
    burger.create([
        'burger_name', 'devoured'
    ], [
        req.body.burger_name, req.body.devoured
    ], function (result) {
        res.json({
            id: result.insertId
        });
    });
});

router.put('api/burgers/:id', function (req, res) {
    var condition = 'id = ' + req.params.id;

    console.log('condition', condition);

    burger.update({
        devoured: req.body.devoured
    }, condition, function (result) {
        if (result.changedRows == 0) {
            // if no rows were changed, return '404 not found'
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

router.delete('/api/burgers/:id', function (req, res) {
    var condition = 'id = ' + req.params.id;

    burger.delete(condition, function (result) {
        if (result.affectedRows == 0) {
            // if no rows will be deleted, return '404 not found'
            return res.status(404).end();
        } else {
            return res.status(200).end();
        }
    });
});

// ### EXPORT ### Export the routes for server.js
module.exports = router;