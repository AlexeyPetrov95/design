var express = require('express');
var router = express.Router();
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

router.get('/about_management', function(req, res){   
        knex('info').where('type', 'about').exec(function(err, data){
            res.render('about_management', {title: 'Edit about', about_info: data[0]});               
        });
});

router.put('/saveAboutInfo', function(req, res){
    knex('info').where('type','about').update('description', req.body.data).exec(function(err,data){
       if (err)  {
            console.log(err);
            res.send(500);
       } else {
            console.log(req.body.data);           
            res.send(req.body.data);
       }
    });
});
module.exports = router;