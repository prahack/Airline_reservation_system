module.exports = {
    getAdminLocation: (req, res) => {
        if (req.session.type == 'admin') {
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
        } else {
            res.redirect('/admin-panel');
        }
        
    },
    addLocationPage: (req, res) => {
        if (req.session.type == 'admin') {
            res.render('add-location.ejs', {
                title: "Welcome to Airport | Add a new location"
                ,message: ''
            });
        } else {
            res.redirect('/admin-panel');
        }
        
    },
    addLocation: (req, res) => {
        if (req.session.type == 'admin') {
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
        } else {
            res.redirect('/admin-panel');
        }
        
    },
};