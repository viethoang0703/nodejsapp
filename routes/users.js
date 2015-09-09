var express = require('express');
var router = express.Router();
var models = require('../models');
/* GET users listing. */
/**/
router.get('/', function(req, res) {
	models.User.findAll()
		.then(function(users) {
			if (users) {
				res.render('users/index', {
					title: 'Quản lý thành viên',
					users: users,
				});
				return false;
			}
			res.render('404');
		});
});

router.get('/update/:id', function(req, res) {
	var id = req.params.id;
	models.User.findById(id)
		.then(function(user) {
			if (user) {
				res.render('users/update', {
					title: 'Quản lý thành viên',
					user: user,
				});
				return false;
			}
			res.render('404');
		});
});

router.post('/update/:id', function(req, res) {
	var id = req.params.id;
	models.User.findById(id)
		.then(function(user) {
			if (user) {
				user.password = req.body.password;
				user.save();
			}
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