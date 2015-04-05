var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/admin', function(req, res){
       res.render('admin/admin', {title: '123'});   
});

router.get('/user_management', function(req, res){
        knex.select().from('user').exec(function(err, data){
            console.log(data);
            res.render('admin/user_management', {title: 'User management', data: data});               
        });
});

router.get('/about_management', function(req, res){   
        knex('info').where('type', 'about').exec(function(err, data){
            res.render('admin/about_management', {title: 'Edit about', about_info: data[0]});               
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

router.get('/view/custom', function(req, res){
    fs.readdir('./public/images/main', function(err, dir){
        if(err){
            console.log(err);
            res.send(500);
        } else {
            for (var i in dir){
                if (dir[i].match(/^[.]/)){     
                    dir.splice(i,1);    
                }
            }
            res.render('admin/view_admin', {title: 'Вид сайта', data: dir});
        }
    })
});

router.get('/view/custom/header', function(req, res){
    fs.readdir('./public/images/main/header', function(err, header){
        if (err){
            console.log(err);
            res.send(500); 
        } else {
            for (var i in header){
                if (header[i].match(/^[.]/)){      
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


router.post('/view/custom/header/delete', function(req, res){
        var data = fs.readdirSync('./public/images/main/header');    
        for (var i in data){
            if (data[i].match(/^[.]/)){     
                data.splice(i,1);    
            }
        }
        var header = data[0];
        console.log(header);
        fs.unlinkSync('./public/images/main/header/'+data);
        res.send(200);
        
});
module.exports = router;