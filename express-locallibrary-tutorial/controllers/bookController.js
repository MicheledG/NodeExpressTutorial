var Book = require('../models/book');
var Author = require('../models/author');
var Genre = require('../models/genre');
var BookInstance = require('../models/bookinstance');

var async = require('async');

exports.index = function(req, res) {

    async.parallel({
        book_count: bookCounter,
        book_instance_count: bookInstanceCounter,
        book_instance_available_count: availableBookInstanceCounter,
        author_count: authorCounter,
        genre_count: genresCounter
    },function(err, counts){
        res.render('index', {title: 'Local Library Home', error: err, data: counts});
    });

};

// Display list of all books
exports.book_list = function(req, res, next) {

    Book.find({}, 'title author')
        .populate('author')
        .exec(function (err, list_books) {
            if (err) { return next(err); }
            //Successful, so render
            res.render('book_list', { title: 'Book List', book_list: list_books });
        });

};
// Display detail page for a specific book
exports.book_detail = function(req, res, next) {

    async.parallel({
        book: function(callback){
            Book.findById(req.params.id, callback);
        },
        book_instance: function(callback){
            BookInstance.find({'book': req.params.id}, callback);
        }
    }, function (err, results) {
        if (err) {return next(err);}
        if (results == null) {
            var err = new Error('book not found');
            err.status = 404;
            return next(err);
        }
        //successful
        res.render('book_detail', {title:'Book Detail', book: results.book, book_instances: results.book_instance});
    });

};

// Display book create form on GET
exports.book_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Book create GET');
};

// Handle book create on POST
exports.book_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Book create POST');
};

// Display book delete form on GET
exports.book_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Book delete GET');
};

// Handle book delete on POST
exports.book_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Book delete POST');
};

// Display book update form on GET
exports.book_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Book update GET');
};

// Handle book update on POST
exports.book_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Book update POST');
};

// services functions
// count the books in the db
// the callback function is passed by async.parallel is of type "function(err, result)"
// and is called, with the right arguments, when mongoose complete the query to the db
function bookCounter(callback){
    Book.count(callback);
}
// count the authors in the db
function authorCounter(callback){
    Author.count(callback);
}
// count the genres in the db
function genresCounter(callback){
    Genre.count(callback);
}
//count the bookinstances in the db
function bookInstanceCounter(callback){
    BookInstance.count(callback);
}
//count the bookinstances available in the db
function availableBookInstanceCounter(callback){
    BookInstance.count(
        {
            status: 'Available'
        },
        callback);
}