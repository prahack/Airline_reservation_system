module.exports = {
    getAdminFlight: (req, res) => {
        if (req.session.type == 'admin') {
            let query = "SELECT * FROM `flight`"; // query database to get all the flights
            // execute query
            db.query(query, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.render('flight.ejs', {
                    title: ''
                    , flights: result
                });
            });
        } else {
            res.redirect('/admin-panel');
        }
        
    },
    addFlightPage: (req, res) => {
        if (req.session.type == 'admin') {
            let airportQuery = "SELECT * FROM `airport`";
            db.query(airportQuery, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                } else {
                    res.render('add-flight.ejs', {
                        title: "Welcome to Flight | Add a new flight"
                        , airports: result
                        , message: ''
                    });
                }
            });
        } else {
            res.redirect('/admin-panel');
        }
        
    },
    addFlight: (req, res) => {
        if (req.session.type == 'admin') {
            let message = '';
            let origin = req.body.origin;
            let destination = req.body.destination;
    
            let flightQuery = "SELECT * FROM `flight`";
    
            db.query(flightQuery, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
    
                } else {
                    let query = "INSERT INTO `flight` (origin, destination) VALUES ('" + origin + "', '" + destination + "')";
                    db.query(query, (err, result) => {
                        if (err) {
                            return res.status(500).send(err);
                        }
                        res.redirect('/admin-flight');
                    });
                }
            });
        } else {
            res.redirect('/admin-panel');
        }
        
    },
};