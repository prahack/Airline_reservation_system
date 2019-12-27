module.exports = {
    getAdminAirplanes: (req, res) => {
        let query = "SELECT * FROM `airplane`"; // query database to get all the flights
        // execute query
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('airplanes.ejs', {
                title: ''
                ,airplanes: result
            });
        });
    },
    addAirplanesPage: (req, res) => {
        res.render('add-airplanes.ejs', {
            title: "Welcome to Airplane | Add a new airplane"
            ,message: ''
        });
    },
    addAirplane: (req, res) => {
        let message = '';
        let type = req.body.type;

        let airplaneQuery = "SELECT * FROM `airplane`";

        db.query(airplaneQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                message = 'flight already exists';
                res.render('add-flight.ejs', {
                    message,
                });
            } else {
                // send the flight's details to the database
                flight_ID = result['insertId'];
                let query = "INSERT INTO `flight` (flight_ID, origin, destination) VALUES ('" +
                flight_ID + "', '" + origin + "', '" + destination +"')";
            db.query(query, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.redirect('/admin-flight');
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