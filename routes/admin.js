module.exports = {
    getAdmin: (req, res) => {
        let query = "SELECT * FROM `flight`"; // query database to get all the flights
        // execute query
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('admin.ejs', {
                title: ''
                ,flights: result
            });
        });
    },
};