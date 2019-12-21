const fs = require('fs');
var md5 = require('md5');

module.exports = {
    getSignup: (req, res) => {
        res.render('signup.ejs', {
            
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
        

        let emailQuery = "SELECT * FROM `passenger` WHERE email = '" + email + "'";

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
    }
}