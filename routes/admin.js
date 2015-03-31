var express = require('express');
var router = express.Router();
var data = require('../system/system.json');
var passport = require('passport');



router.get('/admin', function(req, res){
       res.render('admin', {title: '123'});   
});

router.get('/user_management', function(req, res){
        knex.select().from('user').exec(function(err, data){
            console.log(data);
            res.render('user_management', {title: 'User management', data: data});               
        });
});

module.exports = router;