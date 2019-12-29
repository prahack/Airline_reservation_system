const fs = require('fs');
var md5 = require('md5');
function validateEmail(email) {
    var re = new RegExp("\\S+@\\S+\\.\\S+");
    return re.test(email);
}

module.exports = {
    getSignup: (req, res) => {
        message =''
        res.render('signup.ejs', {
            message
        });
    },
    addPassenger: (req, res) => {
        // if (!req.files) {
        //     return res.status(400).send("No files were uploaded.");
        // }

        let name = req.body.name;
        let age = req.body.age;
        let email = req.body.email;
        let password = req.body.password;
        let coPassword = req.body.coPassword;
        console.log(validateEmail(email));

        let emailQuery = "SELECT * FROM `passenger` WHERE email = '" + email + "'";
        if(password != coPassword){
            message = 'password confirmation fail';
                res.render('signup.ejs', {
                    message,
                });
        } else {
            if (validateEmail(email)) { 
                db.query(emailQuery, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    if (result.length > 0) {
                        message = 'Email already exists';
                        res.render('signup.ejs', {
                            message,
                        });
                    } else {
                        let query = "INSERT INTO `passenger` (name, age, email, type, number_of_times) VALUES ('" +
                                    name + "', '" + age + "', '" + email + "', 'Frequent', 0)";
                                db.query(query, (err, result) => {
                                    if (err) {
                                        return res.status(500).send(err);
                                    } else {
                                        console.log(result['insertId']);
                                        passenger_ID = result['insertId'];
                                        let pw = md5(password);
                                        let q = "INSERT INTO `account` (passenger_ID, password, email) VALUES ('"+
                                        passenger_ID +"', '" + pw +"','" + email + "')";
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
                message = 'incorrect email address';
                res.render('signup.ejs', {
                    message,
                });
            }
        }
    },
    getLogin: (req, res) => {
        message =''
        res.render('login.ejs', {
            message
        });
    },
    login: (req, res) => {
        let email = req.body.email;
        let password = req.body.password;
        console.log(email);
        console.log(password);
        let emailQuery = "SELECT * FROM `account` WHERE email = '" + email + "'";
        db.query(emailQuery,(err, result) => {
            let x = (result == 0);
            if (err) {
                return res.status(500).send(err);
            }
            if ( x ) {
                message = 'incorrect email or password';
                res.render('login.ejs', {
                    message,
                });
            } else {
                console.log(result[0]);
                let pw = result[0]['password'];
                if (pw == md5(password)) {
                    req.session.email = email;
                    res.redirect('/');
                } else {
                    message = 'incorrect email or password';
                    res.render('login.ejs', {
                        message,
                    });
                }
            }
        });

    }
}