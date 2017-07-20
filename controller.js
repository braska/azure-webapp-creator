const Websites = require('./services/websites');
const config = require('./config');

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
      return client
        .createHostingPlan(req.body.appname)
        .then((result) => {
          return client.createWebSite(req.body.appname, result.id);
        });
    })
    .then(() => {
      res.redirect('/');
    })
    .catch(next)
};
