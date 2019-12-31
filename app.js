const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();
const session = require('express-session');

const { getHomePage } = require('./routes/index');
const { getSignup, addPassenger, getLogin, login, logout } = require('./routes/passenger');
const { getAdmin, addAdmin, getLoginAdmin, loginAdmin, getbookingsByPassengerType, bookingsByPassengerType, getDetails, details, logoutAdmin } = require('./routes/admin');
const { getAdminFlight, addFlightPage, addFlight, editFlightPage, editFlight } = require('./routes/flight');
const { getAdminAirplane, addAirplanePage, addAirplane } = require('./routes/airplane');
const { getAdminAircraft, addAircraftPage, addAircraft } = require('./routes/aircraft');
const { getAdminAirport, addAirportPage, addAirport } = require('./routes/airport');
const { getAdminFlightSchedule, addFlightSchedulePage, addFlightSchedule } = require('./routes/flightSchedule');
const { getAdminFlightDelay, addFlightDelayPage, addFlightDelay } = require('./routes/flightDelay');
const { getAdminLocation, addLocationPage, addLocation } = require('./routes/location');
const { getAdminPrice, addPricePage, addPrice } = require('./routes/price');
const { getAdminSeat, addSeatPage, addSeat } = require('./routes/seat');
const { getAdminReport } = require('./routes/report');
const { searchFlight, searchFlightPage } = require('./routes/searchFlight');
const { flightBooking, flightBookingPage } = require('./routes/bookFlight');
const { searchByFlightNoPage, searchByFlightNo, numberOFPassengers, numberOFPassengersPage } = require('./routes/adminSearch');
const port = 5000;
process.env.TZ = 'Asia/Colombo';
// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'airline_reservation_system'
});

// connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;

// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
app.use(fileUpload()); // configure fileupload

app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: 'abcd',
}))

// routes for the app

app.get('/', getHomePage);
app.get('/signup', getSignup);
app.get('/login', getLogin);
app.get('/logout', logout);
// app.get('/admin-panel', getAdmin);
// app.post('/admin-panel', addAdmin);
app.get('/admin-logout', logoutAdmin);
app.get('/admin-panel', getLoginAdmin);
app.post('/admin-panel', loginAdmin);
app.get('/admin-flight', getAdminFlight);
app.get('/add-flight', addFlightPage);
app.post('/add-flight', addFlight);
app.get('/edit-flight/:flight_ID', editFlightPage);
app.post('/edit-flight/:flight_ID', editFlight);
app.get('/admin-airplane', getAdminAirplane);
app.get('/add-airplane', addAirplanePage)
app.post('/add-airplane', addAirplane);
app.get('/admin-aircraft', getAdminAircraft);
app.get('/add-aircraft', addAircraftPage)
app.post('/add-aircraft', addAircraft);
app.get('/admin-airport', getAdminAirport);
app.get('/add-airport', addAirportPage)
app.post('/add-airport', addAirport);
app.get('/admin-flightSchedule', getAdminFlightSchedule);
app.get('/add-flightSchedule', addFlightSchedulePage);
app.get('/bookings-passenger', getbookingsByPassengerType);
app.get('/details', getDetails);
app.post('/details', details);
app.post('/bookings-passenger', bookingsByPassengerType);
app.post('/add-flightSchedule', addFlightSchedule);
app.get('/admin-flightDelay', getAdminFlightDelay);
app.get('/add-flightDelay', addFlightDelayPage)
app.post('/add-flightdelay', addFlightDelay);
app.get('/admin-location', getAdminLocation);
app.get('/add-location', addLocationPage)
app.post('/add-location', addLocation);
app.get('/admin-price', getAdminPrice);
app.get('/add-price', addPricePage)
app.post('/add-price', addPrice);
app.get('/admin-seat', getAdminSeat);
app.get('/add-seat', addSeatPage)
app.post('/add-seat', addSeat);
app.get('/admin-report', getAdminReport);
app.post('/signup', addPassenger);
app.post('/login', login);
app.get('/searchFlight', searchFlightPage);
app.post('/searchFlight', searchFlight);
app.get('/bookFlight', flightBookingPage);
app.post('/bookFlight', flightBooking);
app.get('/searchByFlightNo', searchByFlightNoPage);
app.post('/searchByFlightNo', searchByFlightNo);
app.get('/numberOFPassengers', numberOFPassengersPage);
app.post('/numberOFPassengers', numberOFPassengers);




// set the app to listen on the port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});