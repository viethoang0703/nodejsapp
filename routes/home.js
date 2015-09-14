var express = require('express');
var router = express.Router();
var models = require('../models');
/* GET home page. */
/*Lay tat ca cac ban ghi trong bang Categories*/

router.get('/', function(req, res) {
	models.New.findAll()
		.then(function(news) {
			if (news) {
				res.render('home/index', {
					title: 'Home',
					news: news,
				});
				return false;
			}
			res.render('404');
		})
});

router.get('/detail/:id?', function(req, res) {
	var id = req.params.id;
	models.New.findById(id)
		.then(function(news) {
			if (news) {
				res.render('home/detail', {
					title: 'Home',
					news: news,
				});
				return false;
			}
			res.render('404');
		});
});

router.get('/category/:id?', function(req, res) {
	var id = req.params.id;
	models.Category.findById(id)
		.then(function(category) {
			if (category) {
				res.render('home/category', {
					title: 'Home',
					category: category,
				});
				return false;
			}
			res.render('404');
		});
});

module.exports = router;