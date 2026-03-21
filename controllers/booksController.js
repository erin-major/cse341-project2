const mongodb = require('../database/connect');
const ObjectId = require('mongodb').ObjectId;

/* ****************************************
 *  Deliver all books data
 * *************************************** */
async function getAllBooks(req, res) {
  // #swagger.summary = 'Get all books'
  // #swagger.description = 'Endpoint to get all books from the database.'
  // #swagger.tags = ['Books']
  const results = await mongodb.getDb().db().collection('books').find();
  results.toArray().then((books) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(books);
  });
}

/* ****************************************
 *  Deliver book by ID data
 * *************************************** */
async function getBookById(req, res) {
  // #swagger.summary = 'Get book by ID'
  // #swagger.description = 'Endpoint to get a book by ID from the database.'
  // #swagger.tags = ['Books']
  const bookId = new ObjectId(req.params.id);
  const results = await mongodb.getDb().db().collection('books').find({ _id: bookId });
  results.toArray().then((books) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(books[0]);
  });
}

/* ****************************************
 *  Add a book
 * *************************************** */
async function createBook(req, res) {
  // #swagger.summary = 'Create a new book'
  // #swagger.description = 'Endpoint to create a new book in the database.'
  // #swagger.tags = ['Books']
  const book = {
    title: req.body.title,
    author: req.body.author,
    publicationYear: req.body.publicationYear,
    genre: req.body.genre,
    publisher: req.body.publisher,
    language: req.body.language,
    rating: req.body.rating,
    blurb: req.body.blurb
  };
  const result = await mongodb.getDb().db().collection('books').insertOne(book);
  if (result.acknowledged) {
    res.status(201).json(result.insertedId);
  } else {
    res.status(500).json(result.error || 'An error occurred while creating the book.');
  }
}

/* ****************************************
 *  Update a book
 * *************************************** */
async function updateBook(req, res) {
  // #swagger.summary = 'Update a book by ID'
  // #swagger.description = 'Endpoint to update an existing book by its ID.'
  // #swagger.tags = ['Books']
  const bookId = new ObjectId(req.params.id);
  const book = {
    title: req.body.title,
    author: req.body.author,
    publicationYear: req.body.publicationYear,
    genre: req.body.genre,
    publisher: req.body.publisher,
    language: req.body.language,
    rating: req.body.rating,
    blurb: req.body.blurb
  };
  const result = await mongodb
    .getDb()
    .db()
    .collection('books')
    .updateOne(
      { _id: bookId },
      {
        $set: {
          title: book.title,
          author: book.author,
          publicationYear: book.publicationYear,
          genre: book.genre,
          publisher: book.publisher,
          language: book.language,
          rating: book.rating,
          blurb: book.blurb
        }
      }
    );
  if (result.modifiedCount === 1) {
    res.status(200).send();
  } else {
    res.status(500).json(result.error || 'An error occurred while updating the book.');
  }
}

/* ****************************************
 *  Delete book data by id
 * *************************************** */
async function deleteBook(req, res) {
  // #swagger.summary = 'Delete a book by ID'
  // #swagger.description = 'Endpoint to delete a book from the database by its ID.'
  // #swagger.tags = ['Books']
  const bookId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('books').deleteOne({ _id: bookId });
  if (result.deletedCount === 1) {
    res.status(204).send();
  } else {
    res.status(500).json(result.error || 'An error occurred while deleting the book.');
  }
}

module.exports = { getAllBooks, getBookById, createBook, updateBook, deleteBook };
