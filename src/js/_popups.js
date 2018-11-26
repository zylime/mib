$.fn.Popups = function(opts){

  var container = $(this);

 
  
  events();

  function events(){
    txtMsgPopup();
    registerPopup();
    // verifyEmailPopup(); //moved to register.js
    resetPswPopup();
  }

  // 手机短信验证
  function txtMsgPopup(){
    // $(document).on('click touch', '.js-open-popup-code', function(e){
    //   e.stopPropagation()

    //   showPopup($('.js-popup-code'));
    // });
    $(document).on('click touch', '.js-popup-cover, .js-close-popup-code', function(e){
      e.stopPropagation();
      closePopup($('.js-popup-code'));
    });
    sendVerificationCode();
    inputCode();


  }
  function sendVerificationCode(){
    $('.js-popup-code-verification-btn').on('click touch', function(){
     
        var _time = 60;
        var _this = this;
        $(this).attr('disabled','disabled');

        var countTime = setInterval(function(){
          _time = _time - 1;

          $(_this).html('重新发送 (' + _time +')');
          if(_time == 0){
            clearInterval(countTime);
            $(_this).html('发送验证码');
            $(_this).removeAttr('disabled');
          }
        }, 1000)
      
      
    })
  }
  function inputCode(){
    $('.js-popup-code').find('input.js-code').each(function(index){
      var i = index;
      $(this).on('keydown', function(){
        if($(this).val().length == 1 && $($('.js-popup-code').find('input.js-code')[i+1]).length > 0){
          $($('.js-popup-code').find('input')[i+1]).focus();
        }
      });
      $(this).on('input.js-code', function(){
        updateButton();
      })
    })
  }

  function updateButton(){
    var _length = $('.js-popup-code').find('input.js-code').length;
    for(let i = 0; i < _length; i++){
      if($($('.js-popup-code').find('input.js-code')[i]).val().length == 0){
        break;
      }
      else{
        if(i == _length - 1){
          $('.js-popup-code').find('.js-btn').removeClass('disabled');
          // submitCode();
        }
      }
    }

  }

  // function submitCode(){
  //   $('.js-popup-code-submit').on('click touch', function(){
  //     if(!$(this).hasClass('disabled')){
  //       var _code = '';
  //       var _url = '';
  //       $('.js-popup-code-inputs input').each(function(){
  //         _code += $(this).val();
  //       });
  //       // console.log(_code);
  //       /* form submit */
  //       $.ajax({
  //         type: 'POST',
  //         dataType: 'text',
  //         url: _url,
  //         data: _code,
  //         success: function(msg){

  //         }
  //       })
  //     }
  //   })
  // }

  function registerPopup(){
    $(document).on('click touch', '.js-popup-cover, .js-close-register', function(e){
      e.stopPropagation();
      closePopup($('.js-popup-register'));
    });
  }
  // moved to register.js
  // function verifyEmailPopup(){
  //   $(document).on('click touch', '.js-register-btn', function(e){
  //     e.stopPropagation()
  //     // $('.js-popup-code').show();
  //     if(!$(this).hasClass('disabled')){
  //       showPopup($('.js-popup-verify-email'));
  //     }
      
  //   });
  //   $(document).on('click touch', '.js-popup-cover, .js-close-verify-email', function(e){
  //     e.stopPropagation();
  //     closePopup($('.js-popup-verify-email'));
  //   });
  // }

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
  