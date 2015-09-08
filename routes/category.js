var express = require('express');
var router = express.Router();
var models = require('../models');
/* GET home page. */
/*Lay tat ca cac ban ghi trong bang Categories*/
router.get('/', function(req, res) {
	models.Category.findAll()
		.then(function(categories) {
				if (!categories) return res.json({
					message: 'not exits'
				});
				return res.json(categories);
			},
			function(err) {
				return res.send(err);
			});
});

router.get('/create', function(req, res) {
	res.render('category/create', {
		title: 'Category-Create'
	});
});

/* query tra ve ban ghi nhan duoc theo id truyen vao */
router.get('/update/:id', function(req, res) {
	var id = req.params.id;
	models.Category.findById(id)
		.then(function(category) {
			if (!category) return res.json({
				message: 'not exits'
			});
			return res.json(category);
		}, function(err) {
			return res.send(err);
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
			return res.json({
				message: "Create Successful!"
			});
		});
});

/* Cap nhat lai data cua bar ghi voi id nhan duoc*/
router.put('/update/:id', function(req, res) {
	var id = req.params.id;
	models.Category.findById(id)
		.then(function(category) {
			if (!category) return res.json({
				message: 'Category does not exits'
			});
			category.cat_name = req.body.cat_name;
			category.cat_status = req.body.cat_status;
			category.cat_url = req.body.cat_name;

			category.save()
				.then(function(category) {
					return res.json({
						message: 'update Successful!'
					});
				}, function(err) {
					return res.send(err);
				});
		});
});

/* Thuc hien xoa ban ghi voi id nhan duoc*/
router.delete('/destroy/:id', function(req, res) {
	var id = req.params.id;
	models.Category.findById(id)
		.then(function(category) {
			if (!category) return res.json({
				message: 'not found'
			});
		category.destroy().then(function() {
			return res.json({
				message: 'delete Successful!'
			});
		}, function(err) {
			return res.send(err);
		});
		});
});
module.exports = router;