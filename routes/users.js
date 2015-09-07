var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.render('users/index', {
		title: 'Users'
	});
});
router.get('/update', function(req, res, next) {
	res.render('users/update', {
		title: 'Users-Update'
	});
});
router.get('/update-role', function(req, res, next) {
	res.render('users/update_role', {
		title: 'Users-Update Role'
	});
});

module.exports = router;