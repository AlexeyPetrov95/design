var express = require('express');
var router = express.Router();
var data = require('../system/system.json');

router.get('/admin', function(req, res){
    res.render('admin', {title: "admin"});  
})

router.post('/admin', function(req, res){
    for (var i in data){
        if (data[i].login == req.body.login && data[i].password == req.body.password){
             req.session.authorized = true;
        }
    }
    
    if (req.session.authorized){
        res.send(200);   
    }else {
        res.redirect('/admin');   
    }
    
})

module.exports = router;