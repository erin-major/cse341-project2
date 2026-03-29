const isAuthenticated = (req, res, next) => {
  console.log('Checking authentication for user:', req.session.user);
  if (req.session.user === undefined) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};

module.exports = {
  isAuthenticated
};
