const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
	title:{
		type: String,
		required: true
    },
    pageCount: {
        type: String,
        required: true
    },
    publishedDate:{
		type: String,
		default: Date.now
    },
    thumbnailUrl: {
        type: String,
		required: true
    },
    status: {
        type: String,
		default: "UNPUBLISHED"
    },
	authors:{
		type: Array,
		required: true
    },
    categories: {
        type: Array,
		required: true 
    }
});

const Book = module.exports = mongoose.model('Book', bookSchema);

module.exports.getBooks = (callback, limit) => {
	Book.find(callback).limit(limit);
}

module.exports.getBookById = (id, callback) => {
	Book.findById(id, callback);
}

module.exports.addBook = (book, callback) => {
	Book.create(book, callback);
}

module.exports.updateBook = (id, book, options, callback) => {
    const query = {_id: id };
	const update = {
		title: book.title,
		pageCount: book.pageCount,
        publishedDate: book.publishedDate,
        thumbnailUrl: book.thumbnailUrl,
        status: book.status,
        authors: book.authors,
        categories: book.categories,
	}
	Book.findOneAndUpdate(query, update, options, callback);
}

module.exports.removeBook = (id, callback) => {
	const query = {_id: id};
	Book.remove(query, callback);
}