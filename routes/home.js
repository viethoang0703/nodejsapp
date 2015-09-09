var express = require('express');
var router = express.Router();
var models = require('../models');

router.get('/', function(req, res) {
	res.render('home/index', {
		title: 'Home',

	});
});
module.exports = router;