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
            let flightScheduleQuery = "SELECT * FROM `flight_schedule`";
            db.query(flightScheduleQuery, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                } else {
                    res.render('add-flightDelay.ejs', {
                        title: "Welcome to Flight Delay | Add a new flight delay"
                        , schedules: result
                        , message: ''
                    });
                }
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
    editFlightDelayPage: (req, res) => {
        if (req.session.type == 'admin') {
            let delay_ID = req.params.delay_ID;
        let query = "SELECT * FROM `flight_delay` WHERE delay_ID = '" + delay_ID + "' ";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('edit-flightDelay.ejs', {
                title: "Edit  Flight Delay"
                ,flightDelay: result[0]
                ,message: ''
            });
        });
        } else {
            res.redirect('/admin-panel');
        }
        
    },
    editFlightDelay: (req, res) => {
        if (req.session.type == 'admin') {
        let delay_ID = req.params.delay_ID;
        let flight_schedule_ID = req.body.flight_schedule_ID;
        let delayed_time = req.body.delayed_time;
        let reason = req.body.reason;

        let query = "UPDATE `flight_delay` SET `flight_schedule_ID` = '" + flight_schedule_ID + "', `delayed_time` = '" + delayed_time + "', `reason` = '" + reason +"' WHERE `flight_delay`.`delay_ID` = '" + delay_ID + "'";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/admin-flightDelay');
        });
        } else {
            res.redirect('/admin-panel');
        }
        
    },
    deleteFlightDelay: (req, res) => {
        let delay_ID = req.params.delay_ID;
        let flight_schedule_ID = req.params.flight_schedule_ID;
        let delayed_time = req.params.delayed_time;
        let reason = req.params.reason;
        let getidQuery = 'SELECT flight_schedule_ID from `flight_delay` WHERE delay_ID = "' + delay_ID + '"';
        let deleteDelayQuery = 'DELETE FROM flight_delay WHERE delay_ID = "' + delay_ID + '"';

        db.query(getidQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            db.query(deleteDelayQuery, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.redirect('/admin-flightDelay');
            });
        });
    }
};