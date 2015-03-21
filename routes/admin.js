var express = require('express');
var router = express.Router();

router.get('/admin', function(req, res){
    res.render('admin', {title: "admin"});  
})

router.post('/admin', function(req, res){
    console.log("1232");
    res.send();
})

module.exports = router;