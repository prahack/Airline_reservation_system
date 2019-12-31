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
            res.render('add-price.ejs', {
                title: "Welcome to Airport | Add a new price"
                ,message: ''
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