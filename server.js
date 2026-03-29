const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongodb = require('./database/connect');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const createError = require('http-errors');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');
const port = process.env.PORT || 3000;
const authorRoutes = require('./routes/authors');
const bookRoutes = require('./routes/books');

app.use(bodyParser.json());
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});
app.use(cors({ methods: ['GET', 'POST', 'PUT', 'DELETE', 'UPDATE', 'PUT', 'PATCH'] }));
app.use(cors({ origin: '*' }));
app.use('/', require('./routes'));
app.use('/authors', authorRoutes);
app.use('/books', bookRoutes);

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL
    },
    function (accessToken, refreshToken, profile, done) {
      //User.findOrCreate({ githubId: profile.id }, function (err, user) {
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

app.get(
  '/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/api-docs', session: false }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
  }
);

// Error handling for 404 Not Found
app.use((req, res, next) => {
  next(createError(404, 'Not Found'));
});

// Error-handling middleware
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message
    }
  });
});

mongodb.initDb((err) => {
  if (err) {
    console.error(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on port ${port}`);
  }
});
