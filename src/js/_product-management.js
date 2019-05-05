$.fn.ProductManagement = function(opts){

  var container = $(this);
  var moreBtn = $(this).find('.js-more');
  var morePopup = $('.js-product-management-more-popup');
  var popupCover = $('.js-cover');

 
  
  events();

  function events(){

    moreBtn.each(function(){
      $(this).on('click touch', function(){
        var status = $(this).attr('data-status');
        openPopup(status);
      });
    });

    popupCover.on('click touch', function(){
      closePopup();
    });

    morePopup.find('.js-cancel').on('click touch', function(){
      closePopup();
    });
  }

  function openPopup(status){
    morePopup.find('a.item').each(function(){
      if($(this).attr('data-display').indexOf(status)>=0){
        $(this).show();
      }
      else{
        $(this).hide();
      }
    })
    morePopup.show();
    popupCover.show();
    // stopBodyScrolling(true);
  }

  function closePopup(){
    morePopup.hide();
    popupCover.hide();
    // stopBodyScrolling(false);
  }

  function stopBodyScrolling(bool){
    if (bool === true){
      $('html, body').css('overflow', 'hidden');
      document.body.addEventListener('touchmove', freezeVp, false);
    }
    else{
      $('html, body').css('overflow', 'initial');
      document.body.removeEventListener('touchmove', freezeVp, false);
    }
  }

  var freezeVp = function(e) {
    e.preventDefault();
  };



}
  