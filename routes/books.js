const router = require('express').Router();
const booksController = require('../controllers/booksController');
const bookValidation = require('../middleware/book-validation');

router.get('/', booksController.getAllBooks);
router.get('/:id', booksController.getBookById);
router.post('/', bookValidation.saveBook, booksController.createBook);
router.put('/:id', bookValidation.saveBook, booksController.updateBook);
router.delete('/:id', booksController.deleteBook);

module.exports = router;
