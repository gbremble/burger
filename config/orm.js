var connection = require('./connection.js');

var orm = {
    selectAll: function (callback) {
        // ORM query to select all burgers from the database
        var queryString = 'SELECT * FROM burgers';

        connection.query(queryString, function(error, result) {
            if (error) throw error;
            
            // Callback: here's the result
            callback(result);
        });
    },
    insertOne: function (burgerName, callback) {
        // ORM to add a new burger to the database
        var queryString = 'INSERT INTO burgers (burger_name, devoured) VALUES (?, false);'

        connection.query(queryString, burgerName, function(error, result) {
            if (error) throw error;

            // Callback: here's the result
            callback(result);
        });
    },
    updateOne: function (burgerName, devoured, callback) {
        // ORM to update just one burger from the database
        var queryString = 'UPDATE burgers SET (burger_name, devoured) TO (?,?) WHERE ';

        connection.query(queryString, [burgerName, devoured], function (error, result) {
            if (error) throw error;

            // Callback: here's the result
            callback(result);
        })
    }
}

module.exports = orm;