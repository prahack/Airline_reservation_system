module.exports = {
    getAdminSeat: (req, res) => {
        if (req.session.type == 'admin') {
            let query = "SELECT * FROM `seat`"; // query database to get all the seats
        // execute query
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('seat.ejs', {
                title: ''
                ,seat: result
            });
        });
        } else {
            res.redirect('/admin-panel');
        }
        
    },
    addSeatPage: (req, res) => {
        if (req.session.type == 'admin') {
            res.render('add-seat.ejs', {
                title: "Welcome to Airport | Add a new seat"
                ,message: ''
            });
        } else {
            res.redirect('/admin-panel');
        }
        
    },
    addSeat: (req, res) => {
        if (req.session.type == 'admin') {
            let message = '';
        let seat_ID = req.body.seat_ID;
        let plane_ID = req.body.plane_ID;
        let seat_type = req.body.seat_type;

        let seatQuery = "SELECT * FROM `seat`";

        db.query(seatQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            } else {
                // send the flight's details to the database
                let query = "INSERT INTO `seat` (seat_ID, plane_ID, seat_type) VALUES ('" + seat_ID + "', '" + plane_ID +"', '" + seat_type + "')";
            db.query(query, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.redirect('/admin-seat');
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