$(document).ready(function() {
    $("#header").click(function() {
        $.ajax({
            url:'/view/custom/header',
            success: function(data){
                animation(data);
            }
        })
    
    });
});


function animation(data){
    $('.sq').remove();
    $("#add").show();
    if (data.length != 0){
        $('#add').hide();
        $('#centerMainSection').append('<div class="sq" id="photoSq"> </div>');
        $("#photoSq").css({
            'background': 'url('+data+')',
            'background-size': 'cover',
            'border':'trasparent'
        });

        $('#photoSq')
            .append('<div id="black"> <div id="close"></div></div>');
        

       $('#black').hide();

        $('#photoSq').hover(function(){
            $('#black').show();
            $('#close').click(function(){
                $.ajax({
                    url:'/view/custom/header/delete',
                    type: 'POST',
                    success: function(){
                        $('.sq').remove();
                        $('#add').show();
                    }
                })
            })
         }, function(){
             $('#black').hide();
         }
        )
    } 
    
}