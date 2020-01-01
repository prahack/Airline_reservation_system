module.exports = {
    getAdminPrice: (req, res) => {
        if (req.session.type == 'admin') {
            let query = "SELECT * FROM `price`"; // query database to get all the locations
            // execute query
            db.query(query, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.render('price.ejs', {
                    title: ''
                    ,price: result
                });
            });
        } else {
            res.redirect('/admin-panel');
        }
        
    },
    addPricePage: (req, res) => {
        if (req.session.type == 'admin') {
            let flightScheduleQuery = "SELECT * FROM `flight_schedule`";
            db.query(flightScheduleQuery, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                } else {
                    res.render('add-price.ejs', {
                        title: "Welcome to Price | Add a new price"
                        , schedules: result
                        , message: ''
                    });
                }
            });
        } else {
            res.redirect('/admin-panel');
        }
        
    },
    addPrice: (req, res) => {
        if (req.session.type == 'admin') {
            let message = '';
            let flight_schedule_ID = req.body.flight_schedule_ID;
            let economy_price = req.body.economy_price;
            let business_price = req.body.business_price;
            let platinum_price = req.body.platinum_price;
    
            let priceQuery = "SELECT * FROM `price`";
    
            db.query(priceQuery, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                } else {
                    // send the flight's details to the database
                    let query = "INSERT INTO `price` (flight_schedule_ID, economy_price, business_price, platinum_price) VALUES ('" + flight_schedule_ID + "', '" + economy_price +"', '" + business_price + "', '" + platinum_price + "')";
                db.query(query, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/admin-price');
                });
                }
            });
        } else {
            res.redirect('/admin-panel');
        }
        
    },
    editPricePage: (req, res) => {
        if (req.session.type == 'admin') {
            let flight_schedule_ID = req.params.flight_schedule_ID;
        let query = "SELECT * FROM `price` WHERE flight_schedule_ID = '" + flight_schedule_ID + "' ";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('edit-price.ejs', {
                title: "Edit  Price"
                ,price: result[0]
                ,message: ''
            });
        });
        } else {
            res.redirect('/admin-panel');
        }
        
    },
    editPrice: (req, res) => {
        if (req.session.type == 'admin') {
        let flight_schedule_ID = req.params.flight_schedule_ID;
        let economy_price = req.body.economy_price;
        let business_price = req.body.business_price;
        let platinum_price = req.body.platinum_price;

        let query = "UPDATE `price` SET `economy_price` = '" + economy_price + "', `business_price` = '" + business_price +"', `platinum_price` = '" + platinum_price +"' WHERE `price`.`flight_schedule_ID` = '" + flight_schedule_ID + "'";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/admin-price');
        });
        } else {
            res.redirect('/admin-panel');
        }
        
    },
    deletePrice: (req, res) => {
        let flight_schedule_ID = req.params.flight_schedule_ID;
        let economy_price = req.params.economy_price;
        let business_price = req.params.business_price;
        let platinum_price = req.params.platinum_price;
        let getidQuery = 'SELECT flight_schedule_ID from `price` WHERE flight_schedule_ID = "' + flight_schedule_ID + '"';
        let deletePriceQuery = 'DELETE FROM price WHERE flight_schedule_ID = "' + flight_schedule_ID + '"';

        db.query(getidQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            db.query(deletePriceQuery, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.redirect('/admin-price');
            });
        });
    }
};