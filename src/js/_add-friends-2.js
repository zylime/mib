$.fn.AddFriends2 = function(opts){

  var container = $(this);
  var submitBtn = $(this).find('.js-submit');
  var checkbox = $(this).find('.js-checkbox');
  var form = $(this).find('.js-form');
  var popup = $('.js-popup-add-friends');
  


 
  
  events();

  function events(){
    initCheckbox();

    submitBtn.on('click touch', function(){
      // submitDate();
      if(!$(this).hasClass('disabled')){
        openFriendRequestPopup();
      }
      
    });

    $(document).on('click touch', '.js-popup-cover, .js-close-add-friends', function(e){
      e.stopPropagation();
      closePopup(popup);
    });
    
  }

  function initCheckbox(){
    checkbox.on('click touch', function(){
      if($(this).attr('data-name') === 'all'){
        if($(this).hasClass('active')){
          resetAll();
        }
        else{
          selectAll();
        }
      }
      else{
        var _value;
        $(this).toggleClass('active');
        _value = $(this).hasClass('active') ? 'selected' : '';

        $(this).find('input').val(_value);
      }
      
      updateSubmitBtn();
    })
  }
  function resetAll(){
    checkbox.each(function(){
      $(this).removeClass('active');
      $(this).find('input').val('');
    });
  }

  function selectAll(){
    checkbox.each(function(){
      $(this).addClass('active');
      $(this).find('input').val('selected');
    });
  }

  function updateSubmitBtn(){
    if(checkbox.hasClass('active')){
      submitBtn.removeClass('disabled');
    }
    else{
      submitBtn.addClass('disabled');
    }
  }

  function openFriendRequestPopup(){
    showPopup(popup);
  }


  function showPopup(ele){
    var ele = ele;
    ele.show();
    $('.js-popup-cover').show();
  }

  function closePopup(ele){
    var ele = ele;
    ele.hide();
    $('.js-popup-cover').hide();
  }

  function submitDate(){

  }

}
  