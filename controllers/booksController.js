const mongodb = require('../database/connect');
const ObjectId = require('mongodb').ObjectId;
const createError = require('http-errors');

/* ****************************************
 *  Deliver all books data
 * *************************************** */
async function getAllBooks(req, res, next) {
  // #swagger.summary = 'Get all books'
  // #swagger.description = 'Endpoint to get all books from the database.'
  // #swagger.tags = ['Books']
  try {
    const results = await mongodb.getDb().db().collection('books').find();
    const books = await results.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
}

/* ****************************************
 *  Deliver book by ID data
 * *************************************** */
async function getBookById(req, res, next) {
  // #swagger.summary = 'Get book by ID'
  // #swagger.description = 'Endpoint to get a book by ID from the database.'
  // #swagger.tags = ['Books']
  try {
    const bookId = new ObjectId(req.params.id);
    const results = await mongodb.getDb().db().collection('books').find({ _id: bookId });
    const books = await results.toArray();
    if (books.length === 0) {
      return next(createError(404, 'Book not found'));
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(books[0]);
  } catch (error) {
    next(error);
  }
}

/* ****************************************
 *  Add a book
 * *************************************** */
async function createBook(req, res, next) {
  // #swagger.summary = 'Create a new book'
  // #swagger.description = 'Endpoint to create a new book in the database.'
  // #swagger.tags = ['Books']
  /*  #swagger.parameters['body'] = {
        in: 'body',
        description: 'Book data',
        required: true,
        schema: {
          $title: 'any',
          $author: 'any',
          $publicationYear: 1900,
          $genre: 'any',
          $publisher: 'any',
          $language: 'any',
          $rating: 3.5,
          $blurb: 'any'
        }
      }
  */
  try {
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
  } catch (error) {
    next(error);
  }
}

/* ****************************************
 *  Update a book
 * *************************************** */
async function updateBook(req, res, next) {
  // #swagger.summary = 'Update a book by ID'
  // #swagger.description = 'Endpoint to update an existing book by its ID.'
  // #swagger.tags = ['Books']
  /*  #swagger.parameters['body'] = {
        in: 'body',
        description: 'Book data',
        required: true,
        schema: {
          $title: 'any',
          $author: 'any',
          $publicationYear: 1900,
          $genre: 'any',
          $publisher: 'any',
          $language: 'any',
          $rating: 3.5,
          $blurb: 'any'
        }
      }
  */
  try {
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
    if (!result.acknowledged) {
      return next(createError(500, 'An error occurred while updating the book.'));
    }
    if (result.matchedCount === 0) {
      return next(createError(404, 'Book not found'));
    }
    res.status(200).send();
  } catch (error) {
    next(error);
  }
}

/* ****************************************
 *  Delete book data by id
 * *************************************** */
async function deleteBook(req, res, next) {
  // #swagger.summary = 'Delete a book by ID'
  // #swagger.description = 'Endpoint to delete a book from the database by its ID.'
  // #swagger.tags = ['Books']
  try {
    const bookId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('books').deleteOne({ _id: bookId });
    if (!result.acknowledged) {
      return next(createError(500, 'An error occurred while deleting the book.'));
    }
    if (result.deletedCount === 0) {
      return next(createError(404, 'Book not found'));
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

module.exports = { getAllBooks, getBookById, createBook, updateBook, deleteBook };
