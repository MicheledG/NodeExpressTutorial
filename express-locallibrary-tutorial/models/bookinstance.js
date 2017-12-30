//definition of BookInstance model
var mongoose = require('mongoose');

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
    return '/catalog/bookinstance' + this._id;
});

var BookModel = mongoose.model('BookInstance', BookInstanceSchema);

module.exports = BookModel;