const router = require('express').Router();
const booksController = require('../controllers/booksController');
const bookValidation = require('../middleware/book-validation');
const auth = require('../middleware/authenticate');

router.get('/', booksController.getAllBooks);
router.get('/:id', booksController.getBookById);
router.post('/', auth.isAuthenticated, bookValidation.saveBook, booksController.createBook);
router.put('/:id', auth.isAuthenticated, bookValidation.saveBook, booksController.updateBook);
router.delete('/:id', auth.isAuthenticated, booksController.deleteBook);

module.exports = router;
