var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var Comments = new Schema({
    fullName: String,
    stars: Number,
    date: Date,
    title: String,
    body: String
});

var dishSchema = new Schema({
    dishName: String,
    restaurantName: String,
    dishDescription: String,
    dishDetailedDesc: String,
    imageUrl: String,
    location: String,
    starAverage: Number,
    comments: [Comments],
    meta : {
        votes: Number
    }
});


var userSchema = new Schema({
    username: String,
    password: String,
    permissionProfile: String,
    fullName: String,
    email: String,
    birthDate: Date,
    cellphoneNumber: String
});


var Dishs = mongoose.model('Dish', dishSchema);
console.log("se creo modelo");
module.exports = Tickets;
