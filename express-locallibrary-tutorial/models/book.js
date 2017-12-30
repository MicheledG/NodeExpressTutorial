//Definition of the Book model
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

//define the model properties
var BookSchema = new Schema({
    title: {type: String, required: true},
    author: {type: Schema.ObjectId, ref: 'Author', required: true},
    summary: {type: String, required: true},
    isbn: {type: String, required: true},
    genre: [{type: Schema.ObjectId, ref: 'Genre'}]
});

//define the model virtual properties
//URL
BookSchema
    .virtual('url')
    .get(function(){
       return '/catalog/book/' + this._id;
    });

var BookModel = mongoose.model('Book', BookSchema);

module.exports = BookModel;
