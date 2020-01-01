const fs = require('fs');

module.exports = {
    addBookingPage: (req, res) => {

        let id = req.params.id;
        let date = req.params.date;
        let dateQuery = "SELECT * FROM `flight_schedule` WHERE flight_schedule_ID = '"+ id +"'";
        email = req.session.email;
        let user;
        let q = "select * from `passenger` where `email` = '" + email + "'";
        db.query(q,(err,result1) => {
            console.log(email);
            console.log(result1);
            user = result1[0];
            if (err) {
                return res.status(500).send(err);
            } else {
                db.query(dateQuery, (err, result) => {
                    console.log(result);
                    plane_id = result[0]['plane_ID'];
                    flight_id = result[0]['flight_schedule_ID'];
                    console.log(plane_id);
                    if (err) {
                        return res.status(500).send(err);
                    }
                    else {
                        let seatQuery = "select seat_ID from `seat` where plane_ID = '" + plane_id + "'";
                        let seatQuery2 = "select seat_ID from `booking` where flight_ID = '" + flight_id + "'";

                        db.query(seatQuery,(err, result2) => {
                            if (err) {
                                return res.status(500).send(err);
                            } else {
                                console.log(result2);
                                db.query(seatQuery2,(err, result3) => {
                                    if (err) {
                                        return res.status(500).send(err);
                                    } else {
                                        console.log(result3);
                                        res.render('add-booking.ejs', {
                                            title: 'Welcome to airline_reservation_system | Add a new booking',
                                            flight_schedule: result[0], 
                                            id,
                                            email,
                                            user
                                        });
                                    }
                                });
                                
                            }
                        });
                    }
                });
            }
        });
        
        
    },
    addBooking: (req, res) => {

        let message = '';
        let name = req.body.name;
        let age = req.body.age;
        let email = req.body.email;
        let seat_ID = req.body.seat_ID;
        let flight_ID = req.params.id;
        let booking_date = req.body.booking_date;
        let bookingQuery = "SELECT * FROM `booking` WHERE flight_ID = '" + flight_ID + "' AND seat_ID = '" + seat_ID + "'";

        db.query(bookingQuery, (err, result) => {
            console.log(result);
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                console.log('if');
                message = 'Seat already booked';
                res.render('add-booking.ejs', {
                    message,
                    title: 'Welcome to airline_reservation_system | Add a new booking'
                });
            } else {
                console.log('else');
                 // send the booking's details to the database
                let query = "INSERT INTO `booking` (passenger_ID, seat_ID, flight_ID, booking_date) VALUES ('" + passenger_ID + "', '" + seat_ID + "', '" + flight_ID + "', '" + booking_date + "')";
                db.query(query, (err, result) => {
                    console.log(result);
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/');
                });

        }
        });
    }, 
};