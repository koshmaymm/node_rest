const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

process.env.VAR_BOOKSTORE = 'mongodb://localhost:27017/bookstore';
process.env.VAR_PORT = 3000;

app.use(bodyParser.json());

Book = require('./models/book');

mongoose.connect(process.env.VAR_BOOKSTORE);
const db = mongoose.connection;

function startRequest(req, res) {
	return new Promise((resolve, reject) => {
		resolve(
			res.send('Please use api books')
		);	
	});
}

getAllBook = (req, res) => {
	return new Promise((resolve, reject) => {
		resolve(
			Book.getBooks((err, books) => {
				if(err){
					throw err;
				}
				res.json(books);
			})
		);	
	});
}

getOneBook = (req, res) => {
	return new Promise((resolve, reject) => {
		resolve(
			Book.getBookById(req.params._id, (err, book) => {
				if(err){
					throw err;
				}
				res.json(book);
			})
		);
	});
}

addNewBook = (req, res) => {
	return new Promise((resolve, reject) => {
		const book = req.body;

		resolve(
			Book.addBook(book, (err, book) => {
			if(err){
				throw err;
			}
			res.json(book);
			})
		);
	});
}

editBookProps = (req, res) => {
	return new Promise((resolve, reject) => {
		const id = req.params._id;
    	const book = req.body;

		resolve(
			Book.updateBook(id, book, {}, (err, book) => {
				if(err){
					throw err;
				}
				res.json(book);
			})
		);
	});
}

removeBookById = (req, res) => {
	return new Promise((resolve, reject) => {
		const id = req.params._id;

		resolve(
			Book.removeBook(id, (err, book) => {
				if(err){
					throw err;
				}
				res.json(book);
			})
		);
	});
}


app.get('/', startRequest );
app.get('/api/books', getAllBook );
app.get('/api/books/:_id', getOneBook );
app.post('/api/books', addNewBook );
app.put('/api/books/:_id', editBookProps );
app.delete('/api/books/:_id', removeBookById );

app.listen(process.env.VAR_PORT);