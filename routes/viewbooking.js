module.exports = {
    getAdminBooking: (req, res) => {
        if (req.session.type == 'admin') {
            let query = "SELECT * FROM `booking`"; // query database to get all the bookings
            // execute query
            db.query(query, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.render('viewbooking.ejs', {
                    title: ''
                    , bookings: result
                });
            });
        } else {
            res.redirect('/admin-panel');
        }
    },
};