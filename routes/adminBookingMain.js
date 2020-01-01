module.exports = {
    getAdminBookingMainPage: (req, res) => {
        let query = "SELECT * FROM `booking` ORDER BY booking_ID ASC"; // query database to get all bookings

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('adminBookingMain.ejs', {
                title: 'Welcome to airline_reservation_system | View bookings'
                ,booking: result
            });
        });
    },
};