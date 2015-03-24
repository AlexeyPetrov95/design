var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/getPhotoHeader', function(req, res){
    fs.readdir('./public/images/main/header', function(err, files){
        for (var i in files){
            files[i] = '/images/main/header/' + files[i];
        }
        res.send(files);
    })
});

module.exports = router;