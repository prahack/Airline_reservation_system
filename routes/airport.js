module.exports = {
    getAdminAirport: (req, res) => {
        if (req.session.type == 'admin') {
            let query = "SELECT * FROM `airport`"; // query database to get all the flights
        // execute query
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('airport.ejs', {
                title: ''
                ,airports: result
            });
        });
        } else {
            res.redirect('/admin-panel');
        }
        
    },
    addAirportPage: (req, res) => {
        if (req.session.type == 'admin') {
            let locationQuery = "SELECT * FROM `location`"; 
            db.query(locationQuery, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                } else {
                    res.render('add-airport.ejs', {
                        title: "Welcome to Airport | Add a new airport"
                        , locations: result
                        , message: ''
                    });
                }
            });
        } else {
            res.redirect('/admin-panel');
        }
        
    },
    addAirport: (req, res) => {
        if (req.session.type == 'admin') {
            let message = '';
        let airport_code = req.body.airport_code;
        let name = req.body.name;
        let location_ID = req.body.location_ID;

        let airportQuery = "SELECT * FROM `airport`";

        db.query(airportQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            } else {
                // send the flight's details to the database
                let query = "INSERT INTO `airport` (airport_code, name, location_ID) VALUES ('" + airport_code + "', '" + name +"', '" + location_ID + "')";
            db.query(query, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.redirect('/admin-airport');
            });
            }
        });
        } else {
            res.redirect('/admin-panel');
        }
        
    },
};