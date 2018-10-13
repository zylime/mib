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
  