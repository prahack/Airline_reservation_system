const fs = require('fs');

module.exports = {
    adminAddBookingPage: (req, res) => {
        res.render('admin-add-booking.ejs', {
            title: 'Welcome to airline_reservation_system | Add a new booking'
            ,message: ''
        });
    },
    adminAddBooking: (req, res) => {

        let message = '';
        let booking_ID = req.body.booking_ID;
        let passenger_ID = req.body.passenger_ID;
        let seat_ID = req.body.seat_ID;
        let flight_ID = req.body.flight_ID;
        let booking_date = req.body.booking_date;

        let bookingQuery = "SELECT * FROM `booking` WHERE flight_ID = '" + flight_ID + "' AND seat_ID = '" + seat_ID + "'";

        db.query(bookingQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                message = 'Seat already booked';
                res.render('admin-add-booking.ejs', {
                    message,
                    title: 'Welcome to airline_reservation_system | Add a new booking'
                });
            } else {
                 // send the booking's details to the database
                let query = "INSERT INTO `booking` (booking_ID, passenger_ID, seat_ID, flight_ID, booking_date) VALUES ('" +booking_ID + "', '" + passenger_ID + "', '" + seat_ID + "', '" + flight_ID + "', '" + booking_date + "')";
                db.query(query, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/adminBooking');
                });

        }
        });
    },

    AdminEditBookingPage: (req, res) => {
        let booking_ID = req.params.id;
        let query = "SELECT * FROM `booking` WHERE booking_ID = '" + booking_ID + "' ";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('admin-edit-booking.ejs', {
                title: 'Edit Booking'
                ,booking: result[0]
                ,message: ''
            });
        });
    },
    adminEditBooking: (req, res) => {
        let booking_ID = req.params.id;
        let passenger_ID = req.body.passenger_ID;
        let seat_ID = req.body.seat_ID;
        let flight_ID = req.body.flight_ID;
        let booking_date = req.body.booking_date;

        let query = "UPDATE `booking` SET `passenger_ID` = '" + passenger_ID + "', `seat_ID` = '" + seat_ID + "', `flight_ID` = '" + flight_ID + "', `booking_date` = '" + booking_date+ "' WHERE `booking`.`booking_ID` = '" + booking_ID + "'";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    },
    adminDeleteBooking: (req, res) => {
        let booking_ID = req.params.id;
        let deleteUserQuery = 'DELETE FROM booking WHERE booking_ID = "' + booking_ID + '"';

        db.query(deleteUserQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    }
};