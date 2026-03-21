const router = require('express').Router();
const authorsController = require('../controllers/authorsController');
const authorValidation = require('../middleware/author-validation');

router.get('/', authorsController.getAllAuthors);
router.get('/:id', authorsController.getAuthorById);
router.post('/', authorValidation.saveAuthor, authorsController.createAuthor);
router.put('/:id', authorValidation.saveAuthor, authorsController.updateAuthor);
router.delete('/:id', authorsController.deleteAuthor);

module.exports = router;
