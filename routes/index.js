/*var express = require('express');
var router = express.Router();

// views/index.hbs
router.get('/', function(req, res, next) {
  res.render('index');
});

module.exports = router;
*/

exports.view = function(req, res){
  res.render('index');
};
