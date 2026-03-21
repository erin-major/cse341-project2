const mongodb = require('../database/connect');
// const ObjectId = require('mongodb').ObjectId;

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

module.exports = { getAllAuthors };
