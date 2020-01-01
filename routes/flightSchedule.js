module.exports = {
    getAdminFlightSchedule: (req, res) => {
        if (req.session.type == 'admin') {
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
        } else {
            res.redirect('/admin-panel');
        }
        
    },
    addFlightSchedulePage: (req, res) => {
        if (req.session.type == 'admin') {
            let airplaneQuery = "SELECT * FROM `airplane`"; 
            let flightQuery = "SELECT * FROM `flight`";
            db.query(airplaneQuery, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                } else {
                    db.query(flightQuery,(err,result2)=>{
                        if (err){
                            return res.status(500).send(err);
                        }else{
                            res.render('add-flightSchedule.ejs', {
                                title: "Welcome to Flight Schedule | Add a new schedule"
                                ,airplanes: result
                                ,flights: result2
                                , message: ''
                            });
                        }
                    })
                }
            });
        } else {
            res.redirect('/admin-panel');
        }
        
    },
    addFlightSchedule: (req, res) => {
        if (req.session.type == 'admin') {
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
        } else {
            res.redirect('/admin-panel');
        }
        
    },
};