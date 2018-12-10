const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(bodyParser.json());

Book = require('./models/book');

mongoose.connect('mongodb://localhost:27017/bookstore');
const db = mongoose.connection;

function startRequest(req, res) {
	return new Promise((resolve, reject) => {
		resolve(
			res.send('Please use api books')
		);	
	});
}

function getAllBook(req, res) {
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

function getOneBook(req, res) {
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

function addNewBook(req, res) {
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

function editBookProps(req, res) {
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

function removeBookById(req, res) {
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

app.listen(3000);
console.log('Running on port 3000...');
