const Websites = require('./services/websites');

exports.index = (req, res) => {
  res.render('index', {
    title: 'Create webapp',
  });
};

exports.post = (req, res, next) => {
  if (!req.body.appname) {
    const error = new Error('App name is required');
    error.status = 400;
    next(error);
    return;
  }
  Websites
    .getInstance()
    .then((client) => {
      res.redirect('/');
    })
    .catch(next)
};
