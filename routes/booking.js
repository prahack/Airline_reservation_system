const fs = require('fs');

module.exports = {
    addBookingPage: (req, res) => {

        let id = req.params.id;
        let date = req.params.date;
        //let dateQuery = "SELECT * FROM `flight_schedule` WHERE flight_schedule_ID = '"+ id +"'";
        let dateQuery = "SELECT * FROM `flight_schedule` WHERE flight_schedule_ID = ?";
        email = req.session.email;
        let user;
        //let q = "select * from `passenger` where `email` = '" + email + "'";
        let q = "select * from `passenger` where `email` = ?";
        db.query(q,[email],(err,result1) => {
            console.log(email);
            console.log(result1);
            user = result1[0];
            if (err) {
                return res.status(500).send(err);
            } else {
                db.query(dateQuery,[id], (err, result) => {
                    console.log(result);
                    plane_id = result[0]['plane_ID'];
                    flight_id = result[0]['flight_schedule_ID'];
                    console.log(plane_id);
                    if (err) {
                        return res.status(500).send(err);
                    }
                    else {
                        //let seatQuery = "select * from `seat` where plane_ID = '" + plane_id + "'";
                        let seatQuery = "select * from `seat` where plane_ID = ?";
                        //let seatQuery2 = "select seat_ID from `booking` where flight_schedule_ID = '" + flight_id + "'";
                        let seatQuery2 = "select seat_ID from `booking` where flight_schedule_ID = ?";

                        db.query(seatQuery,[plane_id],(err, result2) => {
                            if (err) {
                                return res.status(500).send(err);
                            } else {
                                //let pricesQ = "select * from `price` where flight_schedule_ID = '"+ flight_id +"'";
                                let pricesQ = "select * from `price` where flight_schedule_ID = ?";
                                console.log(result2);
                                db.query(pricesQ,[flight_id],(err, prices) => {
                                    if (err) {
                                        return res.status(500).send(err);
                                    } else {
                                        db.query(seatQuery2,[flight_id],(err, result3) => {
                                            if (err) {
                                                return res.status(500).send(err);
                                            } else {
                                                y = [];
                                                for (x of result2) {
                                                    y.push(x['seat_ID']);
                                                }
                                                z = [];
                                                for (x of result3) {
                                                    z.push(x['seat_ID']);
                                                }
                                               
                                                console.log(result3);
                                                console.log(result2.length);
                                                var st = y.filter(function(obj) { return z.indexOf(obj) == -1; });
        
                                                seats = []
        
                                                for (x of result2) {
                                                    if (st.includes(x['seat_ID'])) {
                                                        seats.push(x);
                                                    }
                                                }
        
                                                console.log(seats);
                                                res.render('add-booking.ejs', {
                                                    title: 'Welcome to airline_reservation_system | Add a new booking',
                                                    flight_schedule: result[0], 
                                                    id,
                                                    email,
                                                    user,
                                                    seats,
                                                    prices:prices[0]
                                                });
                                            }
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
        let flight_schedule_ID = req.params.id;
        let passenger_ID = req.body.passenger_id;
        // let booking_date = req.body.date;
        var datetime = new Date();
        console.log(datetime.toISOString().slice(0,10));
        let booking_date = datetime.toISOString().slice(0,10);
        //let bookingQuery = "SELECT * FROM `booking` WHERE flight_schedule_ID = '" + flight_schedule_ID + "' AND seat_ID = '" + seat_ID + "'";
        let bookingQuery = "SELECT * FROM `booking` WHERE flight_schedule_ID = ? AND seat_ID = ?";

        db.query(bookingQuery,[flight_schedule_ID, seat_ID], (err, result) => {
            console.log(result);
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                message = 'Seat already booked';
                res.render('add-booking.ejs', {
                    message,
                    title: 'Welcome to airline_reservation_system | Add a new booking'
                });
            } else {
                if (req.session.email == undefined) {
                    //let insertGP = "insert into `passenger` (name, age, email, type, number_of_times) VALUES('"+ name +"','"+ age +"','"+ email +"','Guest',1)";
                    let insertGP = "insert into `passenger` (name, age, email, type, number_of_times) VALUES(?,?,?,'Guest',1)";
                    db. query(insertGP,[name, age, email],(err, result) => {
                        console.log(result);
                         if (err) {
                             return res.status(500).send(err);
                         } else {
                             console.log(result['insertId']);
                             pasID = result['insertId'];
                             //let query = "INSERT INTO `booking` (passenger_ID, seat_ID, flight_schedule_ID, booking_date) VALUES ('" + pasID + "', '" + seat_ID + "', '" + flight_schedule_ID + "', '" + booking_date + "')";
                             let query = "INSERT INTO `booking` (passenger_ID, seat_ID, flight_schedule_ID, booking_date) VALUES (?, ?, ?, ?)";
                             db.query(query,[pasID, seat_ID, flight_schedule_ID, booking_date],(err, result1) => {
                                if (err) {
                                    return res.status(500).send(err);
                                } else {
                                    console.log(result1['insertId']);
                                    bID = result1['insertId'];
                                    //let ticket = "insert into `ticket` (booking_ID) values ('" + bID + "')";
                                    let ticket = "insert into `ticket` (booking_ID) values (?)";
                                    db.query(ticket,[bID], (err, result2) =>{
                                        if (err) {
                                            return res.status(500).send(err);
                                        }
                                        res.redirect('/');
                                    });
                                }
                             });
                         }
                    });
                } else {
                     // send the booking's details to the database
                     //let query = "INSERT INTO `booking` (passenger_ID, seat_ID, flight_schedule_ID, booking_date) VALUES ('" + passenger_ID + "', '" + seat_ID + "', '" + flight_schedule_ID + "', '" + booking_date + "')";
                     let query = "INSERT INTO `booking` (passenger_ID, seat_ID, flight_schedule_ID, booking_date) VALUES (?, ?, ?, ?)";
                     db.query(query,[passenger_ID, seat_ID, flight_schedule_ID, booking_date], (err, result) => {
                         console.log(result);
                         if (err) {
                             return res.status(500).send(err);
                         } else {
                            console.log(result1['insertId']);
                            bID = result1['insertId'];
                            //let ticket = "insert into `ticket` (booking_ID) values ('" + bID + "')";
                            let ticket = "insert into `ticket` (booking_ID) values (?)";
                            db.query(ticket,[bID], (err, result2) =>{
                                if (err) {
                                    return res.status(500).send(err);
                                } else {
                                    
                                }
                                res.redirect('/');
                            });
                         }
                     });
                }
            }
        });
    }, 
};