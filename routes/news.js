var express = require('express');
var router = express.Router();
var models = require('../models');
/* GET news index. */
/*Lay tat ca cac ban ghi trong bang news*/
router.get('/', function(req, res, next) {
	models.New.findAll({
		order: 'id DESC',
		include: [{
			as: 'category',
			model: models.Category,
			require: false,
		}]
	}).then(function(news) {
		if (!news) {
			res.render('404');
			return false;
		}
		res.render('news/index', {
			title: 'Quản lý bài viết',
			news: news,
		});
	});
});

/* GET create news. */
/* Lay thong tin show ra giao dien create*/
router.get('/create', function(req, res, next) {
	models.Category.findAll().then(function(category) {
		res.render('news/create', {
			title: 'Quản lý bài viết',
			categories: category,
		});
	});
});

/* Thuc hien luu data vao CSDL*/
router.post('/create', function(req, res) {
	var post = {};
	post.news_tittle = req.body.news_tittle;
	post.news_category = req.body.news_category;
	post.news_image = req.body.news_image;
	post.news_status = req.body.news_status;
	post.news_detail = req.body.news_detail;
	post.news_url = req.body.news_tittle;

	models.New.create(post).then(function(cat) {
		models.Category.findAll().then(function(category) {
			res.render('news/create', {
				title: 'Create Post',
				categories: category,
				status: (!cat ? 'error' : 'success'),
				message: (!cat ? 'Create Error!' : 'Create successful!')
			});
		});
	});
});

/* GET update news. */
/* Lay data theo params id nhan duoc tra ve data cua ban ghi do*/
router.get('/update/:id?', function(req, res) {
	var id = req.params.id;
	models.New.findById(id)
		.then(function(data) {
			if (!data) {
				res.render('404');
				return false;
			}
			models.Category.findAll().then(function(categories) {
				res.render('news/update', {
					title: 'Quản lý bài viết',
					news: data,
					categories: categories
				});
			})
		});
});

/* Thuc hien cap nhat data cua id*/
router.post('/update/:id?', function(req, res) {
	var id = req.params.id;
	models.New.findById(id).then(function(news) {
		news.news_tittle = req.body.news_tittle
		news.news_category = req.body.news_category;
		news.news_image = req.body.news_image;
		news.news_status = req.body.news_status;
		news.news_detail = req.body.news_detail;
		news.news_url = req.body.news_tittle;
		news.save()
			.then(function() {
				res.redirect('/news');
			});
	});
});

/* Xoa 1 ban ghi theo id truyen vao*/
router.get('/destroy/:id?', function(req, res) {
	var id = req.params.id;
	models.New.findById(id).then(function(news) {
		if (news) {
			news.destroy()
				.then(function() {
					res.redirect('/news');
				});
			return false;
		}
		res.render('404');
	});
});
module.exports = router;