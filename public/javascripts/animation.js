$(document).ready(function(){
    $.ajax({
        url:'/view/custom/header/user',
        success: function(data){
            $('header').css('background', 'url('+data+')');
        }
    }),
    
	$('.animation').hide();
	$(".bottom").on("click","a", function (event) {
        event.preventDefault();
        var id  = $(this).attr('href'), top = $(id).offset().top - 48;
		$('body,html').animate({scrollTop: top}, 1500);
    });
	
	$(window).scroll(function(){
		if ($(window).scrollTop() > 200){
			$('.navigation').css('background', 'rgba(0,0,0,0.9)');
		} else {
			$('.navigation').css('background', 'rgba(0,0,0,0.7)');
		}
	})
	
	$('.left').hover(function(){
		$(this).find('.projectTitle').hide();
		$(this).find('.animation').slideDown(100);
	}, function(){
		$(this).find('.projectTitle').show();
		$(this).find('.animation').hide();
	});
	
	$('.right').hover(function(){
		$(this).find('.projectTitle').hide();
		$(this).find('.animation').slideDown(100);
		
	}, function(){
		$(this).find('.projectTitle').show();
		$(this).find('.animation').hide();
	});	
});