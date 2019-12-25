const fs = require('fs');

module.exports = {
    addFlightPage: (req, res) => {
        res.render('add-flight.ejs', {
            title: "Welcome to Flight | Add a new flight"
            ,message: ''
        });
    },
    addFlight: (req, res) => {
        if (!req.files) {
            return res.status(400).send("No files were uploaded.");
        }

        let message = '';
        let flight_ID = req.body.flight_ID;
        let origin = req.body.origin;
        let destination = req.body.destination;
        /*let number = req.body.number;
        let username = req.body.username;
        let uploadedFile = req.files.image;
        let image_name = uploadedFile.name;
        let fileExtension = uploadedFile.mimetype.split('/')[1];
        image_name = username + '.' + fileExtension;*/

        let flightQuery = "SELECT * FROM `flight`";

        db.query(flightQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                message = 'flight already exists';
                res.render('add-flight.ejs', {
                    message,
                    title: "Welcome to Flight | Add a new flight"
                });
            } else {
                // send the flight's details to the database
                let query = "INSERT INTO `flight` (flight_ID, origin, destination) VALUES ('" +
                flight_ID + "', '" + origin + "', '" + destination +"')";
            db.query(query, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.redirect('/');
            });
            }
        });
    },
    editFlightPage: (req, res) => {
        let flight_ID = req.params.id;
        let query = "SELECT * FROM `flight` WHERE id = '" + flight_ID + "' ";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('edit-flight.ejs', {
                title: "Edit  Flight"
                ,flight: result[0]
                ,message: ''
            });
        });
    },
    editFlight: (req, res) => {
        let flight_ID = req.params.flight_ID;
        let origin = req.body.origin;
        let destination = req.body.destination;

        let query = "UPDATE `flight` SET `flight_ID` = '" + flight_ID + "', `origin` = '" + origin + "', `destination` = '" + destination + "'";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    },
};