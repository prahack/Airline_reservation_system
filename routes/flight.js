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
            let maxID = "SELECT MAX(flight_ID) FROM `flight`";
            let originQuery = "SELECT origin FROM `flight`";
            db.query(maxID, (err, result) => {
                console.log(result[0]['MAX(flight_ID)']);
                if (err) {
                    return res.status(500).send(err);
                } else {
                    res.render('add-flight.ejs', {
                        title: "Welcome to Flight | Add a new flight"
                        , maximumID: result[0]['MAX(flight_ID)'] + 1
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
    editFlightPage: (req, res) => {
        if (req.session.type == 'admin') {
            let flight_ID = req.params.flight_ID;
            console.log(flight_ID);
            let query = "SELECT * FROM `flight` WHERE flight_ID = '" + flight_ID + "' ";
            db.query(query, (err, result) => {
                console.log(result);
                if (err) {
                    return res.status(500).send(err);
                }
                res.render('edit-flight.ejs', {
                    title: "Edit  Flight"
                    , flight: result[0]
                    , message: ''
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

            let query = "UPDATE `flight` SET `origin` = '" + origin + "', `destination` = '" + destination + "' WHERE `flight`.`flight_ID` = '" + flight_ID + "'";
            db.query(query, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.redirect('/admin-flight');
            });
        } else {
            res.redirect('/admin-panel');
        }
        
    },
};