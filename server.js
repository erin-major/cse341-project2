const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongodb = require('./database/connect');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});
app.use('/', require('./routes'));

mongodb.initDb((err) => {
  if (err) {
    console.error(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on port ${port}`);
  }
});
