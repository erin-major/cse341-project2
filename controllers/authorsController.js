const mongodb = require('../database/connect');
const ObjectId = require('mongodb').ObjectId;

/* ****************************************
 *  Deliver all authors data
 * *************************************** */
async function getAllAuthors(req, res) {
  // #swagger.summary = 'Get all authors'
  // #swagger.description = 'Endpoint to get all authors from the database.'
  // #swagger.tags = ['Authors']
  const results = await mongodb.getDb().db().collection('authors').find();
  results.toArray().then((authors) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(authors);
  });
}

/* ****************************************
 *  Deliver author by ID data
 * *************************************** */
async function getAuthorById(req, res) {
  // #swagger.summary = 'Get author by ID'
  // #swagger.description = 'Endpoint to get an author by ID from the database.'
  // #swagger.tags = ['Authors']
  const authorId = new ObjectId(req.params.id);
  const results = await mongodb.getDb().db().collection('authors').find({ _id: authorId });
  results.toArray().then((authors) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(authors[0]);
  });
}

/* ****************************************
 *  Add an author
 * *************************************** */
async function createAuthor(req, res) {
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
}

/* ****************************************
 *  Update an author
 * *************************************** */
async function updateAuthor(req, res) {
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
  if (result.modifiedCount === 1) {
    res.status(200).send();
  } else {
    res.status(500).json(result.error || 'An error occurred while updating the author.');
  }
}

/* ****************************************
 *  Delete author data by id
 * *************************************** */
async function deleteAuthor(req, res) {
  // #swagger.summary = 'Delete an author by ID'
  // #swagger.description = 'Endpoint to delete an author from the database by its ID.'
  // #swagger.tags = ['Authors']
  const authorId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('authors').deleteOne({ _id: authorId });
  if (result.deletedCount === 1) {
    res.status(204).send();
  } else {
    res.status(500).json(result.error || 'An error occurred while deleting the author.');
  }
}

module.exports = { getAllAuthors, getAuthorById, createAuthor, updateAuthor, deleteAuthor };
