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
            let airplaneQuery = "SELECT * FROM `airplane`";
            db.query(airplaneQuery, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                } else {
                    res.render('add-seat.ejs', {
                        title: "Welcome to Seat | Add a new seat"
                        , airplanes: result
                        , message: ''
                    });
                }
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
};