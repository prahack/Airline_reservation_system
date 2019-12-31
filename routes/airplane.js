module.exports = {
    getAdminAirplane: (req, res) => {
        if (req.session.type == 'admin') {
            let query = "SELECT * FROM `airplane`"; // query database to get all the flights
            // execute query
            db.query(query, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.render('airplane.ejs', {
                    title: ''
                    ,airplanes: result
                });
            });
        } else {
            res.redirect('/admin-panel');
        }
        
    },
    addAirplanePage: (req, res) => {
        if (req.session.type == 'admin') {
            res.render('add-airplanes.ejs', {
                title: "Welcome to Airplane | Add a new airplane"
                ,message: ''
            });
        } else {
            res.redirect('/admin-panel');
        }
        
    },
    addAirplane: (req, res) => {
        if (req.session.type == 'admin') {
            let message = '';
        let type = req.body.type;

        let airplaneQuery = "SELECT * FROM `airplane`";

        db.query(airplaneQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            } else {
                // send the flight's details to the database
                let query = "INSERT INTO `airplane` (type) VALUES ('" + type +"')";
            db.query(query, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.redirect('/admin-airplane');
            });
            }
        });

        } else {
            res.redirect('/admin-panel');
        }
    },
    editFlightPage: (req, res) => {
        if (req.session.type == 'admin') {
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

        } else {
            res.redirect('/admin-panel');
        }
    
    },
    editFlight: (req, res) => {
        if (req.session.type == 'admin') {
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

        } else {
            res.redirect('/admin-panel');
        }
    },
};