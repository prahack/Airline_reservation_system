module.exports = {
    getAdminLocation: (req, res) => {
        let query = "SELECT * FROM `location`"; // query database to get all the locations
        // execute query
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('location.ejs', {
                title: ''
                ,location: result
            });
        });
    },
    addLocationPage: (req, res) => {
        res.render('add-location.ejs', {
            title: "Welcome to Airport | Add a new location"
            ,message: ''
        });
    },
    addLocation: (req, res) => {
        let message = '';
        let location_ID = req.body.location_ID;
        let parent = req.body.parent;
        let child = req.body.child;

        let locationQuery = "SELECT * FROM `location`";

        db.query(locationQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            } else {
                // send the flight's details to the database
                let query = "INSERT INTO `location` (location_ID, parent, child) VALUES ('" + location_ID + "', '" + parent +"', '" + child + "')";
            db.query(query, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.redirect('/admin-location');
            });
            }
        });
    },
    editLocationPage: (req, res) => {
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
    },
    editFlight: (req, res) => {
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
    },
};