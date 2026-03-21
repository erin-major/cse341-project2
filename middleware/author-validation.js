const validate = require('../helpers/validate');

const saveAuthor = (req, res, next) => {
  const rules = {
    firstName: 'required|string|min:2',
    lastName: 'required|string|min:2',
    birthYear: 'required|integer|min:1000|max:9999',
    bio: 'required|string'
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

module.exports = { saveAuthor };
