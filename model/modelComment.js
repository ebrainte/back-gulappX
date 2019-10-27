var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var commentsSchema = new Schema({
    restaurantId: String,
    fullName: String,
    stars: Number,
    date: Date,
    title: String,
    body: String
});

var Comments = mongoose.model('Comment', commentsSchema);

console.log("se creo modelo comentarios");
module.exports = Comments;
