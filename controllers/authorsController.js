const mongodb = require('../database/connect');
const ObjectId = require('mongodb').ObjectId;
const createError = require('http-errors');

/* ****************************************
 *  Deliver all authors data
 * *************************************** */
async function getAllAuthors(req, res, next) {
  // #swagger.summary = 'Get all authors'
  // #swagger.description = 'Endpoint to get all authors from the database.'
  // #swagger.tags = ['Authors']
  try {
    const results = await mongodb.getDb().db().collection('authors').find();

    const authors = await results.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(authors);
  } catch (error) {
    next(error);
  }
}

/* ****************************************
 *  Deliver author by ID data
 * *************************************** */
async function getAuthorById(req, res, next) {
  // #swagger.summary = 'Get author by ID'
  // #swagger.description = 'Endpoint to get an author by ID from the database.'
  // #swagger.tags = ['Authors']
  try {
    const authorId = new ObjectId(req.params.id);
    const results = await mongodb.getDb().db().collection('authors').find({ _id: authorId });

    const authors = await results.toArray();
    if (authors.length === 0) {
      return next(createError(404, 'Author not found'));
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(authors[0]);
  } catch (error) {
    next(error);
  }
}

/* ****************************************
 *  Add an author
 * *************************************** */
async function createAuthor(req, res, next) {
  // #swagger.summary = 'Create a new author'
  // #swagger.description = 'Endpoint to create a new author in the database.'
  // #swagger.tags = ['Authors']
  /*  #swagger.parameters['body'] = {
        in: 'body',
        description: 'Author data',
        required: true,
        schema: {
          $firstName: 'any',
          $lastName: 'any',
          $birthYear: 1900,
          $bio: 'any'
        }
      }
  */
  try {
    const author = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      birthYear: req.body.birthYear,
      bio: req.body.bio
    };
    const result = await mongodb.getDb().db().collection('authors').insertOne(author);
    if (result.acknowledged) {
      res.status(201).json(result.insertedId);
    } else {
      res.status(500).json(result.error || 'An error occurred while creating the author.');
    }
  } catch (error) {
    next(error);
  }
}

/* ****************************************
 *  Update an author
 * *************************************** */
async function updateAuthor(req, res, next) {
  // #swagger.summary = 'Update an author by ID'
  // #swagger.description = 'Endpoint to update an existing author by its ID.'
  // #swagger.tags = ['Authors']
  /*  #swagger.parameters['body'] = {
        in: 'body',
        description: 'Author data',
        required: true,
        schema: {
          $firstName: 'any',
          $lastName: 'any',
          $birthYear: 1900,
          $bio: 'any'
        }
      }
  */
  try {
    const authorId = new ObjectId(req.params.id);
    const author = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      birthYear: req.body.birthYear,
      bio: req.body.bio
    };
    const result = await mongodb
      .getDb()
      .db()
      .collection('authors')
      .updateOne(
        { _id: authorId },
        {
          $set: {
            firstName: author.firstName,
            lastName: author.lastName,
            birthYear: author.birthYear,
            bio: author.bio
          }
        }
      );
    if (result.matchedCount === 0) {
      next(createError(404, 'Author not found'));
    } else {
      res.status(200).send();
    }
  } catch (error) {
    next(error);
  }
}

/* ****************************************
 *  Delete author data by id
 * *************************************** */
async function deleteAuthor(req, res, next) {
  // #swagger.summary = 'Delete an author by ID'
  // #swagger.description = 'Endpoint to delete an author from the database by its ID.'
  // #swagger.tags = ['Authors']
  try {
    const authorId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('authors').deleteOne({ _id: authorId });
    if (result.deletedCount === 1) {
      res.status(204).send();
    } else {
      res.status(500).json(result.error || 'An error occurred while deleting the author.');
    }
  } catch (error) {
    next(error);
  }
}

module.exports = { getAllAuthors, getAuthorById, createAuthor, updateAuthor, deleteAuthor };
