const router = require('express').Router();
const authorsController = require('../controllers/authorsController');

router.get('/', authorsController.getAllAuthors);

module.exports = router;
