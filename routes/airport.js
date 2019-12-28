module.exports = {
    getAdminAirport: (req, res) => {
        let query = "SELECT * FROM `airport`"; // query database to get all the flights
        // execute query
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('airport.ejs', {
                title: ''
                ,airports: result
            });
        });
    },
    addAirportPage: (req, res) => {
        res.render('add-airport.ejs', {
            title: "Welcome to Airport | Add a new airport"
            ,message: ''
        });
    },
    addAirport: (req, res) => {
        let message = '';
        let airport_code = req.body.airport_code;
        let name = req.body.name;
        let location_ID = req.body.location_ID;

        let airportQuery = "SELECT * FROM `airport`";

        db.query(airportQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            } else {
                // send the flight's details to the database
                let query = "INSERT INTO `airport` (airport_code, name, location_ID) VALUES ('" + airport_code + "', '" + name +"', '" + location_ID + "')";
            db.query(query, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.redirect('/admin-airport');
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