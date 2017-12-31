//definition of BookInstance model
var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

//define model properties
var BookInstanceSchema = new Schema({
    book: {type: Schema.ObjectId, ref: 'Book', required: true},
    imprint: {type: String, required: true},
    status: {
        type: String,
        required: true,
        enum: ['Available', 'Maintenance', 'Loaned', 'Reserved'],
        default: 'Maintenance'
    },
    due_back: {type: Date, default: Date.now()}
});

//define model virtual properties
//url
BookInstanceSchema
.virtual('url')
.get(function(){
    return '/catalog/bookinstance/' + this._id;
});
//formatted due back date
BookInstanceSchema
    .virtual('due_back_formatted')
    .get(function () {
        return moment(this.due_back).format('MMMM Do, YYYY');
    });


var BookModel = mongoose.model('BookInstance', BookInstanceSchema);

module.exports = BookModel;