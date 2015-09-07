var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('category/index', {
		title: 'Category'
	});
});

router.get('/create', function(req, res, next) {
	res.render('category/create', {
		title: 'Category-Create'
	});
});

router.get('/update', function(req, res, next) {
	res.render('category/update', {
		title: 'Category-Update'
	});
});
module.exports = router;