module.exports = {
    getAdminBooking: (req, res) => {
        if (req.session.type == 'admin') {
            let query = "SELECT * FROM `booking`"; // query database to get all the bookings
            // execute query
            db.query(query, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.render('viewbooking.ejs', {
                    title: ''
                    , bookings: result
                });
            });
        } else {
            res.redirect('/admin-panel');
        }
    },
    AdminEditBookingPage: (req, res) => {
        if (req.session.type == 'admin') {
            let booking_ID = req.params.booking_ID;
        let query = "SELECT * FROM `booking` WHERE booking_ID = '" + booking_ID + "' ";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('edit-booking.ejs', {
                title: "Edit  Booking"
                ,booking: result[0]
                ,message: ''
            });
        });
        } else {
            res.redirect('/admin-panel');
        }
    },
    AdminEditBooking: (req, res) => {
        if (req.session.type == 'admin') {
            let booking_ID = req.params.booking_ID;
            let passenger_ID = req.body.passenger_ID;
            let seat_ID = req.body.seat_ID;
            let flight_schedule_ID = req.body.flight_schedule_ID;
            let booking_date = req.body.booking_date;
    
            let query = "UPDATE `booking` SET `passenger_ID` = '" + passenger_ID + "', `seat_ID` = '" + seat_ID + "', `flight_schedule_ID` = '" + flight_schedule_ID + "', `booking_date` = '" + booking_date+ "' WHERE `booking`.`booking_ID` = '" + booking_ID + "'";
            db.query(query, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.redirect('/admin-viewbookings');
            });
            } else {
                res.redirect('/admin-panel');
            }
    },
    AdminDeleteBooking: (req, res) => {
        let booking_ID = req.params.booking_ID;
        let getidQuery = 'SELECT booking_ID from `booking` WHERE booking_ID = "' + booking_ID + '"';
        let deleteBookingQuery = 'DELETE FROM booking WHERE booking_ID = "' + booking_ID + '"';

        db.query(getidQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            db.query(deleteBookingQuery, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.redirect('/admin-viewbookings');
            });
        });
    }
};