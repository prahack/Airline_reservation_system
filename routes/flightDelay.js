module.exports = {
    getAdminFlightDelay: (req, res) => {
        if (req.session.type == 'admin') {
            let query = "SELECT * FROM `flight_delay`"; // query database to get all the flight delays
        // execute query
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('flightDelay.ejs', {
                title: ''
                ,flightDelay: result
            });
        });
        } else {
            res.redirect('/admin-panel');
        }
        
    },
    addFlightDelayPage: (req, res) => {
        if (req.session.type == 'admin') {
            res.render('add-flightDelay.ejs', {
                title: "Welcome to Flight Delay | Add a new flight delay"
                ,message: ''
            });
        } else {
            res.redirect('/admin-panel');
        }
        
    },
    addFlightDelay: (req, res) => {
        if (req.session.type == 'admin') {
            let message = '';
        let flight_schedule_ID = req.body.flight_schedule_ID;
        let delayed_time = req.body.delayed_time;
        let reason = req.body.reason;

        let flightDelayQuery = "SELECT * FROM `flight_delay`";

        db.query(flightDelayQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            } else {
                // send the flight's details to the database
                let query = "INSERT INTO `flight_delay` (flight_schedule_ID, delayed_time, reason) VALUES ('" + flight_schedule_ID + "', '" + delayed_time +"', '" + reason + "')";
            db.query(query, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.redirect('/admin-flightDelay');
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