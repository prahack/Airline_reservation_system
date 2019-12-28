module.exports = {
    getAdminAircraft: (req, res) => {
        let query = "SELECT * FROM `aircraft`"; // query database to get all the flights
        // execute query
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('aircraft.ejs', {
                title: ''
                ,aircrafts: result
            });
        });
    },
    addAircraftPage: (req, res) => {
        res.render('add-aircraft.ejs', {
            title: "Welcome to Aircraft | Add a new aircraft"
            ,message: ''
        });
    },
    addAircraft: (req, res) => {
        let message = '';
        let type = req.body.type;
        let capacity = req.body.capacity;

        let aircraftQuery = "SELECT * FROM `aircraft`";

        db.query(aircraftQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            } else {
                // send the flight's details to the database
                let query = "INSERT INTO `aircraft` (type, capacity) VALUES ('" + type + "', '" + capacity +"')";
            db.query(query, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.redirect('/admin-aircraft');
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