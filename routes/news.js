var express = require('express');
var router = express.Router();
var models = require('../models');
/* GET news index. */
router.get('/', function(req, res, next) {
	models.News.findAll({
		order: 'id DESC'
	}).then(function(news) {
		res.render('news/index', {
			title: 'News',
			news: news,
		});
	})
});

/* GET create news. */
router.get('/create', function(req, res, next) {
	res.render('news/create', {
		title: 'Create a Post'
	});
});
router.post('/create', function(req, res) {
	//module.prototype.create = function()
	var post = {};
	post.news_tittle = req.body.news_tittle;
	post.news_category = req.body.news_category;
	post.news_image = req.body.news_image;
	post.news_status = req.body.news_status;
	post.news_detail = req.body.news_detail;
	post.news_url = req.body.news_tittle;

	save(post);
	return false;
})

/* GET update news. */
router.get('/update/:id?', function(req, res, next) {
	res.render('news/update', {
		title: 'News-Update'
	});
});
module.exports = router;