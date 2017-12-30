var express = require('express');
var router = express.Router();

/* redirect to the actual home page. */
router.get('/', function(req, res) {
  res.redirect('/catalog');
});

module.exports = router;
