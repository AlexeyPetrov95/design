$(document).ready(function(){
     $.ajax({
        url: "/getPhotoHeader",
        success : function(data){
           var i = 0;
            var back = document.getElementById("top");
            back.style.content = 'url("'+data[i]+'")';
            
            var hide = function(){
                back.style.opacity = '0';
            }

            var show = function(){
                i = ++i % data.length;
                back.style.content = 'url("'+data[i]+'")';
                back.style.opacity = '0.5';        
            }
            setInterval(function(){      
                setTimeout(hide, 0);
                setTimeout(show, 700);  
            }, 6000);
        }
    });

    $(".navigation").on("click","a", function (event) {
        event.preventDefault();
        var id  = $(this).attr('href'), top = $(id).offset().top;
        $('body,html').animate({scrollTop: top}, 1500);
    });
})