module.exports = {
    getAdminAircraft: (req, res) => {
        if (req.session.type  == 'admin') {
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
        } else {
            res.redirect('/admin-panel');
        }
        
    },
    addAircraftPage: (req, res) => {
        if (req.session.type  == 'admin') {
            res.render('add-aircraft.ejs', {
                title: "Welcome to Aircraft | Add a new aircraft"
                ,message: ''
            });
        } else {
            res.redirect('/admin-panel');
        }
        
    },
    addAircraft: (req, res) => {
        if (req.session.type  == 'admin') {
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
        } else {
            res.redirect('/admin-panel');
        }
        
    },
    editAircraftPage: (req, res) => {
        if (req.session.type  == 'admin') {
            let type = req.params.type;
            let query = "SELECT * FROM `aircraft` WHERE type = '" + type + "' ";
            db.query(query, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.render('edit-aircraft.ejs', {
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
        if (req.session.type  == 'admin') {
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