module.exports = {
    getAdminFlightSchedule: (req, res) => {
        let query = "SELECT * FROM `flight_schedule`"; // query database to get all the flights
        // execute query
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('flightSchedule.ejs', {
                title: ''
                ,flightSchedules: result
            });
        });
    },
    addFlightSchedulePage: (req, res) => {
        res.render('add-flightSchedule.ejs', {
            title: "Welcome to Flight Schedule | Add a new flight schedule"
            ,message: ''
        });
    },
    addFlightSchedule: (req, res) => {
        let message = '';
        let flight_schedule_ID = req.body.flight_schedule_ID;
        let plane_ID = req.body.plane_ID;
        let flight_ID = req.body.flight_ID;
        let arrival_time = req.body.arrival_time;
        let date= req.body.date;
        let departure_time = req.body.departure_time;

        let flightScheduleQuery = "SELECT * FROM `flight_schedule`";

        db.query(flightScheduleQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            } else {
                // send the flight's details to the database
                let query = "INSERT INTO `flight_schedule` (flight_schedule_ID, plane_ID, flight_ID, arrival_time, date, departure_time) VALUES ('" + flight_schedule_ID + "', '" + plane_ID +"', '" + flight_ID + "','" + arrival_time + "','" + date +"','" + departure_time +"')";
            db.query(query, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.redirect('/admin-flightSchedule');
            });
            }
        });
    },
    editFlightPage: (req, res) => {
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