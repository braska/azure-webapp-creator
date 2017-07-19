const express = require('express');
const router = express.Router();
const path = require('path');
const controller = require('./controller');

router.get('/', controller.index);
router.post('/', controller.post);
router.use(express.static(path.join(__dirname, 'public')));

router.use(function (req, res, next) {
  var err = new Error('Cтраница не найдена');
  err.status = 404;
  next(err);
});

router.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    error: err,
    title: `${err.status} - ${err.message}`
  });
});

module.exports = router;
