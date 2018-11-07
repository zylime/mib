$.fn.Register = function(opts){

  var container = $(this);
  var _checkbox = $(this).find('.js-checkbox');
  var form = $(this).find('.js-register-form');
  var registerBtn = $(this).find('.js-register-btn');

  var verifyEmailPopupContainer = $('.js-popup-verify-email');
  var verifyBtn = verifyEmailPopupContainer.find('.js-verify-btn');
  var resendBtn = verifyEmailPopupContainer.find('.js-resend-btn');

  var verifyMobilePopupContainer = $('.js-popup-code');

  var successPopup = $('.js-popup-register');
  events();

  function events(){
    checkbox();
    checkInputs();

    register();

  }

  function checkbox(){
    _checkbox.on('click touch', function(){
      var _status = $(this).hasClass('checked') ? 'true' : 'false';
      $(this).toggleClass('checked');
      $(this).find('input').val(_status);
    })
  }
  function checkInputs(){
    var inputStatus = false;
    form.find('input').on('keydown', function(){
      var _length = form.find('input').length;
      // console.log(_length);
      for (var i = 0; i < _length; i++){

        if ($(form.find('input')[i]).val() == ''){

           inputStatus = false;
           break;
        }
        else{
          inputStatus = true;
        }
      }

      if(inputStatus){
        updateButton();
      }
    })
    
  }
  function updateButton(){
    registerBtn.removeClass('disabled');
  }

  function register(){
    registerBtn.on('click touch', function(e){
      e.stopPropagation()
      // $('.js-popup-code').show();
      if(!$(this).hasClass('disabled')){
        // temporary use
        verifyEmailPopup();
        // verifyMobilePopup();
        // temporary use end

        var _data = form.serialize(); 
        var _url = '';
        /*form submit*/
        $.ajax({
          type: 'POST',
          dataType: 'text',
          url: _url,
          data: _data,
          success: function(msg){
            verifyEmailPopup();
            // verifyMobilePopup();
          }
        })
        
      }
      
    });
  }
  function verifyEmailPopup(){
    showPopup(verifyEmailPopupContainer);
    $(document).on('click touch', '.js-popup-cover, .js-close-verify-email', function(e){
      e.stopPropagation();
      closePopup(verifyEmailPopupContainer);
    });
  }

  function verifyMobilePopup(){
    showPopup(verifyMobilePopupContainer);
  }

  function showPopup(ele){
    var ele = ele;
    ele.show();
    $('.js-popup-cover').show();
    checkVerification();
  }

  function closePopup(ele){
    var ele = ele;
    ele.hide();
    $('.js-popup-cover').hide();
  }
  function checkVerification(){
    countDown();
    resendBtn.on('click touch', function(e){
      e.preventDefault();
      if(!$(this).hasClass('disabled')){
        countDown();
      }
    })

    verifyBtn.on('click touch', function(e){
      e.preventDefault();

      // temporary use
      registerSuccess();
      // temporary use end

      var _url = '';
      var _data = verifyEmailPopupContainer.serialize();
      
      _data = _data + '&' + _checkbox.find('input').attr('name') + '=' + _checkbox.find('input').val();
      $.ajax({
        type: 'POST',
        dataType: 'text',
        url: _url,
        data: _data,
        success: function(msg){
          registerSuccess();
        }
      })
      
    })

  
  }
  function countDown(){
    var _time = 60;
    resendBtn.addClass('disabled');
    var countTime = setInterval(function(){
      _time = _time - 1;

      resendBtn.html('重新发送 (' + _time +')');
      if(_time == 0){
        clearInterval(countTime);
        resendBtn.html('发送验证码');
        resendBtn.removeClass('disabled');
      }
    }, 1000)
  }
  function registerSuccess(){
    closePopup(verifyEmailPopupContainer);
    showPopup(successPopup);
  }

}
  