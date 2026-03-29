const router = require('express').Router();
const passport = require('passport');

router.get('/', (req, res) => {
  // #swagger.summary = 'Welcome message'
  // #swagger.description = 'Endpoint to return a welcome message.'
  // #swagger.tags = ['General']
  res.send(
    req.session.user !== undefined
      ? `Welcome to the Books and Authors API! Logged in as ${req.session.user.displayName}`
      : 'Welcome to the Books and Authors API! Not logged in'
  );
});

router.get('/login', passport.authenticate('github'));

router.get('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

module.exports = router;
