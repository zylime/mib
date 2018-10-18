$.fn.Search = function(opts){

  var clearBtn = $(this).find('.js-clear-btn');
  var resultContainer = $(this).find('.js-result-container');
  var viewMoreBtn = $(this).find('.js-history-view-more');
 
  
  events();

  function events(){
    clearResult();
    historyEllipsis();
   
   }

   function clearResult(){
    clearBtn.on('click touch', function(e){
      resultContainer.html('');
      viewMoreBtn.addClass('hide');
      resetViewMore();
    });

   }

   function historyEllipsis(){
    var defHeight = 52 * 3; //3 lines of search history
    var slideHeight = $('.js-history-list').height();
    var toggleHeight;
    var label;
    var status;
    // init history height
    if(defHeight < slideHeight){
      label = '更多';
      $('.js-history-view-more').html(label);
      $('.js-history-view-more').removeClass('hide');
      toggleHeight = slideHeight;
      
    }
    // toggle height
    $('.js-history-view-more').on('click', function(){
      status = $(this).attr('data-expanded') == 'true' ? 'false' : 'true';
      $('.js-history-box').animate({
        'height': toggleHeight + 'px'
      });
      $(this).attr('data-expanded', status);
      toggleHeight = toggleHeight == defHeight? slideHeight : defHeight;
      label = label == '更多' ? '收起' : '更多';
      $('.js-history-view-more').html(label);
    })
  }

  function resetViewMore(){
    $('.js-history-view-more').attr('data-expanded','false').html('更多');
  }

}
  