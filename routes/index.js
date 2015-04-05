var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'welcome'});    
});


router.get('/view/custom/header/user', function(req, res){
    fs.readdir('./public/images/main/header', function(err, header){
        if (err){
            console.log(err);
            res.send(500); 
        } else {
            for (var i in header){
                if (header[i].match(/^[.]/)){      // регулярка
                    header.splice(i,1);    
                }
            }
            if(header.length != 0){
                 var data = '/images/main/header/'+header;   
                 res.send(data);
            } else {
                res.send(header);   
            }
        }
    }) 
});

module.exports = router;
