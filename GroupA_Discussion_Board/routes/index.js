var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Group A Discussion board', home: 'all users' });
});

module.exports = router;
