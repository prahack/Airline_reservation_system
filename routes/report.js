module.exports = {
    getAdminReport: (req, res) => {
        let query = "SELECT * FROM `seat`"; // query database to get all the seats
        // execute query
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('report.ejs', {
                title: ''
                ,report: result
            });
        });
    },
};