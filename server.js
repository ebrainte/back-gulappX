// const googleMapsClient = require('@google/maps').createClient({
//     key: 'AIzaSyBHfXPuQY3IGXBEFXzZ3Oo3HDqilYNVFv4'
//   });

// googleMapsClient.geocode({
//   address: '1600 Amphitheatre Parkway, Mountain View, CA'
// }, function(err, response) {
//   if (!err) {
//     console.log(response.json.results);
//   }
// });


var request = require("request")

// var url = "https://maps.googleapis.com/maps/api/directions/json?origin=Medrano 516, Buenos Aires, Argentina&destination=Moreno 1800, Buenos Aires, Argentina&key=AIzaSyBHfXPuQY3IGXBEFXzZ3Oo3HDqilYNVFv4"
// // var url = "https://maps.googleapis.com/maps/api/directions/json?origin=41.43206,-81.38992&destination=42.43206,-81.38992&key=AIzaSyBHfXPuQY3IGXBEFXzZ3Oo3HDqilYNVFv4"
// let options = {json: true};
// var obj;

// request(url, options, (error, res, body) => {
//     if (error) {
//         return  console.log(error)
//     };

//     if (!error && res.statusCode == 200) {
//         obj = body.routes[0].legs[0].distance.text;
//         console.log(obj);
//     };
// });



// Import express
var express = require('express')
//Import Body Parser
var bodyParser = require('body-parser');
var cors = require('cors');
// Initialize the server express
var app = express();

//conectar BD
//var urlBD = 'mongodb://localhost/test';
var urlBD = "mongodb+srv://apitickets:OsylkRfjHJkK0zvK@apitickets-yb4pe.gcp.mongodb.net/test?retryWrites=true&w=majority";

//opciones conexion
var opts = {useNewUrlParser : true, connectTimeoutMS:20000};
//importo driver
var mongoose = require('mongoose');
//Pruebo conexion
mongoose.connect(urlBD,opts).then
(
    () => {
            console.log("Conectado!!");
          }, //se conecto
    err => { 
            console.log("ERROR:" + err); 
           } //manejo error
);

// Import router
var apiRoutes = require("./api-endpoints")


// Todo lo que recibe la app se tratara como json
app.use(bodyParser.urlencoded(
{
    extended: true
}));
app.use(bodyParser.json());
app.use(cors());

// Setup server port
var port = process.env.PORT || 47000;

// Send message for default URL
app.get('/', (req, res) => res.send('Hello World'));

// Use Api routes in the App
app.use('/apiGulappX', apiRoutes);

// Launch app to listen to specified port
app.listen(port, function () {
     console.log("Running on port " + port);
});

