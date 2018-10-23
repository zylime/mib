$.fn.StoreComments = function(opts){


  var commentsBody = $(this).find('.js-comments-body');

 
  
  events();

  function events(){
    initComments();
   }

   function initComments(){
    commentsBody.each(function(){

      var containerHeight = $(this).children('p').height();
      var bodyHeight = $(this).height();
      var needViewMore =  containerHeight > bodyHeight;
      if(needViewMore){
        $(this).append('<div class="btn-expand js-view-more" data-expanded="false"><span>阅读更多</span></div>');
        viewMore();
      }

    });
   }

   function viewMore(){
    commentsBody.each(function(){
      var container = $(this);
      
      var containerHeight = $(this).height();
      var bodyHeight = $(this).find('p').height();
      $(this).find('.js-view-more').unbind('click touch').on('click touch', function(){
        if($(this).attr('data-expanded') == 'false'){
          container.css('max-height',bodyHeight);
          $(this).attr('data-expanded', 'true');
        }
        else{
          container.css('max-height', containerHeight);
          $(this).attr('data-expanded', 'false');
        }
      })
    })
   }
}
  