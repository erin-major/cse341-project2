const validate = require('../helpers/validate');

const saveBook = (req, res, next) => {
  const rules = {
    title: 'required|string|min:2',
    author: 'required|string|min:2',
    publicationYear: 'required|integer|min:1000|max:9999',
    genre: 'required|string|min:2',
    publisher: 'required|string|min:2',
    language: 'required|string|min:2',
    rating: 'required|numeric|min:0|max:5',
    blurb: 'required|string|min:10'
  };
  validate(req.body, rules, {}, (err, valid) => {
    if (!valid) {
      res.status(422).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = { saveBook };
