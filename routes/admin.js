const fs = require('fs');
var md5 = require('md5');
module.exports = {
    getAdmin: (req, res) => {
        let query = "SELECT * FROM `admin`"; // query database to get all the flights
        // execute query
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('admin.ejs', {
                title: ''
                ,admins: result
            });
        });
    },
    addAdmin: (req, res) => {
        let username = req.body.username;
        let password = req.body.password;
        let coPassword = req.body.coPassword;

        let usernameQuery = "SELECT * FROM `admin` WHERE username = '" + username + "'";
        if(password != coPassword){
            message = 'password confirmation fail';
                res.render('admin.ejs', {
                    message,
                });
        } else {
            if (validateEmail(username)) { 
                db.query(usernameQuery, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    if (result.length > 0) {
                        message = 'Username already exists';
                        res.render('username.ejs', {
                            message,
                        });
                    } else {
                        let query = "INSERT INTO `admin` (username, password) VALUES ('" +
                                    username + "', '" + password + "')";
                                db.query(query, (err, result) => {
                                    if (err) {
                                        return res.status(500).send(err);
                                    } else {
                                        console.log(result['insertId']);
                                        admin_ID = result['insertId'];
                                        let pw = md5(password);
                                        db.query(q, (err, result) => {
                                            if (err) {
                                                return res.status(500).send(err);
                                            }else {
                                                res.redirect('/');
                                            }
                                        });
                                            
                                    }
                                });
                    }
                });
            } else {
                message = 'incorrect username';
                res.render('admin.ejs', {
                    message,
                });
            }
        }
    },
    getLoginAdmin: (req, res) => {
        message =''
        if (req.session.type == undefined) {
            res.render('admin.ejs', {
                message
            });
        } else {
            res.redirect('/admin-flight');
        }
        
    },
    loginAdmin: (req, res) => {
        let username = req.body.username;
        let password = req.body.password;
        console.log(username);
        console.log(password);
        let usernameQuery = "SELECT * FROM `admin` WHERE username = '" + username + "'";
        db.query(usernameQuery,(err, result) => {
            let x = (result == 0);
            if (err) {
                return res.status(500).send(err);
            }
            if ( x ) {
                message = 'incorrect username or password';
                res.render('admin.ejs', {
                    message,
                });
            } else {
                console.log(result[0]);
                let pw = result[0]['password'];
                console.log(md5(password));
                if (pw == md5(password)) {
                    req.session.type = 'admin';
                    res.redirect('/admin-flight');
                } else {
                    console.log('in');
                    message = 'incorrect username or password';
                    res.render('admin.ejs', {
                        message,
                    });
                }
            }
        });

    },
    getbookingsByPassengerType: (req, res) => {
        message =''
        res.render('bookings-by-passenger-type.ejs', {
            message
        });
    },
    bookingsByPassengerType: (req, res) => {
        let startDate = req.body.startDate;
        let endDate = req.body.endDate;
        let q1 = "SELECT count(`booking_ID`) from `booking` natural join `passenger` where (`booking_date` BETWEEN '" + startDate + "'AND '" + endDate + "') and type = 'Frequent'";
        let q2 = "SELECT count(`booking_ID`) from `booking` natural join `passenger` where (`booking_date` BETWEEN '" + startDate + "'AND '" + endDate + "') and type = 'Gold'";
        let q3 = "SELECT count(`booking_ID`) from `booking` natural join `passenger` where (`booking_date` BETWEEN '" + startDate + "'AND '" + endDate + "') and type = 'Guest'";

        let gold;
        let frequent;
        db.query(q1,(err, result1) => {
            console.log(result1);
            frequent = result1[0]['count(`booking_ID`)'];

            db.query(q2,(err, result2) => {
                console.log(result2);
                gold = result2[0]['count(`booking_ID`)'];
                db.query(q3,(err, result3) => {
                    console.log(result3);
                    guest = result3[0]['count(`booking_ID`)'];

                    message = 'hiii'
                    res.render('search-results-bookings-by-passenger-type.ejs', {
                        message,
                        startDate,
                        endDate,
                        gold,
                        frequent,
                        guest
                    });

                });
                
            });
        });
        
        console.log(startDate);
    },
    getDetails: (req, res) => {
        let query = "select name,airport_code from `airport` order by name asc";
        db.query(query,(err, result) => {
            message =''
            res.render('details-by-origin-destination.ejs', {
                message,
                airports:result
            });
        });
    },
    details: (req, res) => {
        let origin = req.body.origin;
        let destination = req.body.destination;
        process.env.TZ = 'Asia/Colombo';
        var datetime = new Date();
        //datetime.setTimezone('Asia/Colombo');
        console.log(datetime);
        console.log(datetime.toISOString().slice(0,10));
        console.log(origin);
        console.log(destination);
        let q = "select * from `flight_schedule` where `date` < '"+datetime.toISOString().slice(0,10)+"'";
        db.query(q,(err, result) => {
            if (err) {
                return res.status(500).send(err);
            } else {
                console.log(result);
            }
        });

    },
    logoutAdmin: (req, res) => {
        req.session.destroy();
        res.redirect('/admin-panel');
    }
};