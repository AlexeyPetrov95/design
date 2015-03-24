var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
    fs.readdir('./public/images/main/header', function(err, files){
        for (var i in files){
            files[i] = '/images/main/header/' + files[i];
        }
        res.render('index', { title: 'welcome' , dataImg: files});
    })
});

module.exports = router;
