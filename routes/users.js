var express = require('express');
var router = express.Router();
var models = require('../models');
/* GET users listing. */
/**/
router.get('/', function(req, res) {
	models.User.findAll()
		.then(function(user) {
				if (!user) return res.json({
					message: 'not exits'
				});
				return res.json(user);
			},
			function(err) {
				return res.send(err);
			});
});

router.get('/update/:id', function(req, res) {
	var id = req.params.id;
	models.User.findById(id)
		.then(function(category) {
			if (!category) return res.json({
				message: 'not exits'
			});
			return res.json(category);
		}, function(err) {
			return res.send(err);
		});
});

router.put('/update/:id', function(req, res) {
	var id = req.params.id;
	models.User.findById(id)
		.then(function(category) {
			if (!category) return res.json({
				message: 'Category does not exits'
			});
			category.cat_name = req.body.cat_name;
			category.cat_status = req.body.cat_status;
			category.cat_url = req.body.cat_name;
			category.save().then(function(category) {
				return res.json({
					message: 'update Successful!'
				});
			}, function(err) {
				return res.send(err);
			});
		});
});

router.get('/update-role', function(req, res, next) {
	res.render('users/update_role', {
		title: 'Users-Update Role'
	});
});

router.delete('/destroy/:id', function(req, res) {
	var id = req.params.id;
	models.User.findById(id)
		.then(function(user) {
			if (!user) return res.json({
				message: 'User not found'
			});
			user.destroy().then(function() {
				return res.json({
					message: 'delete Successful!'
				});
			}, function(err) {
				return res.send(err);
			});
		});
});
module.exports = router;