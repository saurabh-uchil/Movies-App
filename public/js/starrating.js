 $(document).ready(function() {  
          $("#st1").hover(function() {  
              $(".fa-star").css("color", "black");  
              $("#st1").css("color", "yellow");     
          });  
          $("#st2").hover(function() {  
              $(".fa-star").css("color", "black");  
              $("#st1, #st2").css("color", "yellow");  
          });  
          $("#st3").hover(function() {  
              $(".fa-star").css("color", "black")  
              $("#st1, #st2, #st3").css("color", "yellow");  
          });  
          $("#st4").hover(function() {  
              $(".fa-star").css("color", "black");  
              $("#st1, #st2, #st3, #st4").css("color", "yellow");  
          });  
          $("#st5").hover(function() {  
              $(".fa-star").css("color", "black");  
              $("#st1, #st2, #st3, #st4, #st5").css("color", "yellow");  
          });
          $('#stars li').on('click', function(){
            var onStar = parseInt($(this).data('value'), 10); // The star currently selected
            var stars = $(this).parent().children('li.star');
            
            for (i = 0; i < stars.length; i++) {
              $(stars[i]).removeClass('selected');
            }
            
            for (i = 0; i < onStar; i++) {
              $(stars[i]).addClass('selected');
            }
            var ratingValue = parseInt($('#stars li.selected').last().data('value'), 10);
            console.log(ratingValue)
        }); 
});

    
