const fs = require('fs');
module.exports = {
    searchFlightPage: (req, res) => {

        let query = "select name,airport_code from `airport` order by name asc";

        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            else {
                res.render('searchFlight.ejs', {
                    title: "search  flight",
                    airports: result
                });
            }
        });
    },

    searchFlight: (req, res) => {
        let origin = req.body.origin;
        let origin1 = origin.substring(0, origin.length - 1);
        let originCode = origin1.substr(origin1.length - 3);

        let destination = req.body.destination;
        let destination1 = destination.substring(0, destination.length - 1);
        let destinationCode = destination1.substr(destination1.length - 3);

        let query = "select * from `flight` inner join `flight_schedule` on flight.flight_ID=flight_schedule.flight_ID where  `origin`='" + originCode + "' and `destination`='" + destinationCode + "'";

        db.query(query, (err, result) => {
            //console.log(result);
            if (err) {
                return res.status(500).send(err);
            }
            else {
                //console.log(result)
                res.render('searchFlightResult.ejs', {
                    flights: result,
                    origin: origin,
                    destination: destination

                });
            }


        });
    },
};