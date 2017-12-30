//definition of the Author model
var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

//define the model properties
var AuthorSchema = new Schema({
    first_name: {type: String, required: true, max: 100},
    family_name: {type: String, required: true, max: 100},
    date_of_birth: Date,
    date_of_death: Date
});

//define the model virtual properties
//complete name
AuthorSchema
    .virtual('name')
    .get(function(){
        return this.family_name+ ', ' + this.first_name;
    });

//URL
AuthorSchema
    .virtual('url')
    .get(function(){
        return '/catalog/author' + this._id;
    });
//life span
AuthorSchema
    .virtual('life_span')
    .get(function () {
        var lifeSpan =
            moment(this.date_of_birth).format('YYYY/MM/DD')
            + ' - '
            + moment(this.date_of_death).format('YYYY/MM/DD');
        return lifeSpan;
    });

var AuthorModel = mongoose.model('Author', AuthorSchema);

module.exports = AuthorModel;