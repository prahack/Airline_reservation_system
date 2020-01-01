module.exports = {
    getAdminAirplane: (req, res) => {
        if (req.session.type == 'admin') {
            let query = "SELECT * FROM `airplane`"; // query database to get all the flights
            // execute query
            db.query(query, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.render('airplane.ejs', {
                    title: ''
                    ,airplanes: result
                });
            });
        } else {
            res.redirect('/admin-panel');
        }
        
    },
    addAirplanePage: (req, res) => {
        if (req.session.type == 'admin') {
            let aircraftQuery = "SELECT * FROM `aircraft`";  
            db.query(aircraftQuery, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                } else {
                    res.render('add-airplanes.ejs', {
                        title: "Welcome to Airplane | Add a new airplane"
                        , aircrafts: result
                        , message: ''
                    });
                }
            });
        } else {
            res.redirect('/admin-panel');
        }
        
    },
    addAirplane: (req, res) => {
        if (req.session.type == 'admin') {
            let message = '';
        let type = req.body.type;

        let airplaneQuery = "SELECT * FROM `airplane`";

        db.query(airplaneQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            } else {
                // send the flight's details to the database
                let query = "INSERT INTO `airplane` (type) VALUES ('" + type +"')";
            db.query(query, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.redirect('/admin-airplane');
            });
            }
        });

        } else {
            res.redirect('/admin-panel');
        }
    },
};