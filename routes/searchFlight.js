const fs = require('fs');
module.exports = {
    searchFlightPage: (req, res) => {

        res.render('searchFlight.ejs', {
            title: "search  flight"
        });
        // });
    },
    searchFlight: (req, res) => {
        let origin = req.body.origin;
        let destination = req.body.destination;

        let query = "select * from `flight` inner join `flight_schedule` on flight.flight_ID=flight_schedule.flight_ID where  `origin`='" + origin + "' and `destination`='" + destination + "'";

        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            else {
                console.log(result)
                res.render('searchFlightResult.ejs', {
                    flights: result
                });
            }


        });
    },
};