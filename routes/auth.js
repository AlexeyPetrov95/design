var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/login', function(req, res){
	if (req.session.authorized){
		res.redirect('/admin');	
	}else {
		res.render('login', {title: 'login'});     	
	}
});

router.post('/login', function(req, res){
	knex.select().from('user').where({user:req.body.login}).andWhere({password:req.body.password})
	.exec(function(err, user){
		if (err) { res.send (400) }
		else if (user.length == 0){
			res.redirect('/login');	
		} else {
			req.session.authorized = true;
			res.redirect('/admin');
		}
	});
});

module.exports = router;