module.exports = {
    getAdminPassenger: (req, res) => {
        if (req.session.type == 'admin') {
            let query = "SELECT * FROM `passenger`"; // query database to get all the passengers
            // execute query
            db.query(query, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.render('viewpassenger.ejs', {
                    title: ''
                    , passenger: result
                });
            });
        } else {
            res.redirect('/admin-panel');
        }
    },
};