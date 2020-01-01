module.exports = {


    searchByFlightNoPage: (req, res) => {
        let query = "select distinct flight_ID from `booking` order by flight_ID asc";

        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            else {
                res.render('searchByFlightNo.ejs', {
                    title: "search  flight",
                    flight_Ids: result
                });
            }
        });
    },

    searchByFlightNo: (req, res) => {
        let flight_ID = req.body.flight_ID;
        let query = "select passenger_ID,name,age,arrival_time  from booking natural join passenger natural join flight_schedule where flight_ID='" + flight_ID + "' and arrival_time=(select min(arrival_time) from booking natural join flight natural join flight_schedule where flight_ID='" + flight_ID + "'); ";

        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            else {
                res.render('searchByFlightNoResult.ejs', {
                    passengers: result,
                    flight_No: flight_ID

                });
            }


        });
    },


    numberOFPassengersPage: (req, res) => {
        let query = "select distinct destination from flight order by destination asc";

        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            else {
                console.log(result);
                res.render('numberOFPassengers.ejs', {
                    destinations: result,
                });
            }
        });
    },


    numberOFPassengers: (req, res) => {
        let destination = req.body.destination;
        let start_date = req.body.start_date;
        let end_date = req.body.end_date;

        let query = "select count(passenger_ID) as count from booking natural join flight where destination='" + destination + "' and booking_date between '" + start_date + "' and '" + end_date + "'";

        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            else {
                console.log(result)
                res.render('numberOFPassengersResult.ejs', {
                    title: "search  flight",
                    result: result,
                    destination: destination,
                    start_date: start_date,
                    end_date: end_date

                });
            }
        });
    },











};