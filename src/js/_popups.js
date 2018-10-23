$.fn.Popups = function(opts){

  var container = $(this);

 
  
  events();

  function events(){
    txtMsgPopup();
    registerPopup();
    verifyEmailPopup();
    resetPswPopup();
  }

  function txtMsgPopup(){
    $(document).on('click touch', '.js-open-popup-code', function(e){
      e.stopPropagation()
      // $('.js-popup-code').show();
      showPopup($('.js-popup-code'));
    });
    $(document).on('click touch', '.js-popup-cover, .js-close-popup-code', function(e){
      e.stopPropagation();
      closePopup($('.js-popup-code'));
    });

    enterCode();

  }

  function enterCode(){
    $('.js-popup-code').find('input').each(function(index){
      var i = index;
      $(this).on('keydown', function(){
        if($(this).val().length == 1 && $($('.js-popup-code').find('input')[i+1]).length > 0){
          $($('.js-popup-code').find('input')[i+1]).focus();
        }
      });
      $(this).on('input', function(){
        updateButton();
      })
    })
  }

  function updateButton(){
    var _length = $('.js-popup-code').find('input').length;
    for(let i = 0; i < _length; i++){
      if($($('.js-popup-code').find('input')[i]).val().length == 0){
        break;
      }
      else{
        if(i == _length - 1){
          $('.js-popup-code').find('.js-btn').removeClass('disabled');
        }
      }
    }

  }

  function registerPopup(){
    $(document).on('click touch', '.js-popup-cover, .js-close-register', function(e){
      e.stopPropagation();
      closePopup($('.js-popup-register'));
    });
  }

  function verifyEmailPopup(){
    $(document).on('click touch', '.js-register-btn', function(e){
      e.stopPropagation()
      // $('.js-popup-code').show();
      showPopup($('.js-popup-verify-email'));
    });
    $(document).on('click touch', '.js-popup-cover, .js-close-verify-email', function(e){
      e.stopPropagation();
      closePopup($('.js-popup-verify-email'));
    });
  }

  function resetPswPopup(){
    $(document).on('click touch', '.js-popup-cover', function(e){
      e.stopPropagation();
      closePopup($('.js-popup-reset-psw'));
      // console.log('clicked');
      // $('.js-popup-reset-psw-btn').click();
    })
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

}
  