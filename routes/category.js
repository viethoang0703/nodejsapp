var express = require('express');
var router = express.Router();
var models = require('../models');
/* GET home page. */
/*Lay tat ca cac ban ghi trong bang Categories*/
router.get('/', function(req, res) {
	models.Category.findAll()
		.then(function(categories) {
			if (categories) {
				res.render('category/index', {
					title: 'Quản lý danh mục',
					categories: categories,
				});
				return false;
			}
			res.render('404');
		})
});

router.get('/create', function(req, res) {
	res.render('category/create', {
		title: 'Quản lý danh mục'
	});
});

/* Thuc hien tao ban ghi moi va luu ban ghi moi vao CSDL*/
router.post('/create', function(req, res) {
	var category = {};
	category.cat_name = req.body.cat_name;
	category.cat_status = req.body.cat_status;
	category.cat_url = req.body.cat_name;

	models.Category.create(category)
		.then(function(catgegory) {
			res.render('category/create', {
				title: 'Quản lý danh mục',
				status: (!category ? 'error' : 'success'),
				message: (!category ? 'Create Error!' : 'Create successful!')
			});
		});
});

/* query tra ve ban ghi nhan duoc theo id truyen vao */
router.get('/update/:id', function(req, res) {
	var id = req.params.id;
	models.Category.findById(id).then(function(category) {
		if (category) {
			res.render('category/update', {
				title: 'Quản lý danh mục',
				category: category
			});
			return false;
		}
		res.render('404');
	});
});

/* Cap nhat lai data cua bar ghi voi id nhan duoc*/
router.post('/update/:id', function(req, res) {
	var id = req.params.id;
	models.Category.findById(id)
		.then(function(category) {
			if (!category) {
				res.render('404');
				return false;
			}
			category.cat_name = req.body.cat_name;
			category.cat_status = req.body.cat_status;
			category.cat_url = req.body.cat_name;

			category.save()
				.then(function(cat) {
					if (!cat) {
						res.render('category/update', {
							title: 'Quản lý danh mục',
							status: 'error',
							message: 'Update Fails!',
							category: category,
						});
						return false;
					} else {
						res.redirect('/category');
					}
				});
		});
});

/* Thuc hien xoa ban ghi voi id nhan duoc*/
/* Xoa 1 ban ghi theo id truyen vao*/
router.get('/destroy/:id?', function(req, res) {
	var id = req.params.id;
	models.Category.findById(id).then(function(category) {
		if (category) {
			category.destroy()
				.then(function() {
					res.redirect('/category');
				});
			return false;
		}
		res.render('404');
	});
});
module.exports = router;