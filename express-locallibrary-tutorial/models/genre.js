//definition of Genre model
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

//define model properties
var GenreSchema = new Schema({
    name: {type: String, required: true, min: 3, max: 100}
});

//define model virtual properties
//url
GenreSchema
.virtual('url')
.get(function(){
   return '/catalog/bookgenre/' + this._id;
});

var GenreModel = mongoose.model('Genre', GenreSchema);

module.exports = GenreModel;