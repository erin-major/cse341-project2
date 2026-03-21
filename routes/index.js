const router = require('express').Router();

router.get('/', (req, res) => {
  // #swagger.summary = 'Welcome message'
  // #swagger.description = 'Endpoint to return a welcome message.'
  // #swagger.tags = ['General']
  res.send('Welcome to the Books and Authors API! Use /api-docs for API documentation.');
});

module.exports = router;
