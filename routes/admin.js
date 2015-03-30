var express = require('express');
var router = express.Router();
var data = require('../system/system.json');

router.get('/login', function(req, res){
    if (req.session.authorized){
        res.redirect('/admin')   
    }else {
        res.render('login', {title: 'login'});     
    }
});

router.post('/login', function(req, res){
    for (var i in data){
        if (data[i].login == req.body.login && data[i].password == req.body.password){
            req.session.authorized = true;
            break;
        }
    }
    if (req.session.authorized){
        res.redirect('/admin'); 
    } else {
        res.redirect('/login');   
    }
});

router.get('/admin', function(req, res){
    if (req.session.authorized){
        res.render('admin', {title: '123'});   
    }else {
        res.redirect('/login');   
    }
});

router.get('/user_management', function(req, res){
    if (req.session.authorized){
        knex.select().from('user').exec(function(err, data){
            console.log(data);
            res.render('user_management', {title: 'User management', data: data});               
        });
    }else {
        res.redirect('/login');   
    }
});

module.exports = router;