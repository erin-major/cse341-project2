const router = require('express').Router();
const authorsController = require('../controllers/authorsController');
const authorValidation = require('../middleware/author-validation');
const auth = require('../middleware/authenticate');

router.get('/', authorsController.getAllAuthors);
router.get('/:id', authorsController.getAuthorById);
router.post('/', auth.isAuthenticated, authorValidation.saveAuthor, authorsController.createAuthor);
router.put(
  '/:id',
  auth.isAuthenticated,
  authorValidation.saveAuthor,
  authorsController.updateAuthor
);
router.delete('/:id', auth.isAuthenticated, authorsController.deleteAuthor);

module.exports = router;
