const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(bodyParser.json());

Book = require('./models/book');

mongoose.connect('mongodb://localhost:27017/bookstore');
const db = mongoose.connection;

app.get('/', async (req, res) => {
	await res.send('Please use api books');
});

app.get('/api/books', async (req, res) => {
	await Book.getBooks((err, books) => {
		if(err){
			throw err;
		}
		res.json(books);
	});
});

app.get('/api/books/:_id', async (req, res) => {
	await Book.getBookById(req.params._id, (err, book) => {
		if(err){
			throw err;
		}
		res.json(book);
	});
});

app.post('/api/books', async (req, res) => {
	const book = req.body;
	await Book.addBook(book, (err, book) => {
		if(err){
			throw err;
		}
		res.json(book);
	});
});

app.put('/api/books/:_id', async (req, res) => {
	const id = req.params._id;
    const book = req.body;

	await Book.updateBook(id, book, {}, (err, book) => {
		if(err){
			throw err;
		}
		res.json(book);
	});
});

app.delete('/api/books/:_id', async (req, res) => {
	const id = req.params._id;
	await Book.removeBook(id, (err, book) => {
		if(err){
			throw err;
		}
		res.json(book);
	});
});

app.listen(3000);
console.log('Running on port 3000...');