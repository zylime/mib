$.fn.Register = function(opts){

  var container = $(this);
  var _checkbox = $(this).find('.js-checkbox');
  var form = $(this).find('.js-register-form');
  var registerBtn = $(this).find('.js-register-btn');
  var error = $(this).find('.js-error');

  var verifyEmailPopupContainer = $('.js-popup-verify-email');
  var verifyBtn = verifyEmailPopupContainer.find('.js-verify-btn');
  var resendBtn = verifyEmailPopupContainer.find('.js-resend-btn');
  var emailForm = verifyEmailPopupContainer;
  var emailError = verifyEmailPopupContainer.find('.js-error');

  var verifyMobilePopupContainer = $('.js-popup-code');
  var mobileForm = verifyMobilePopupContainer.find('.js-popup-code-form');
  var mobileVerifyBtn = verifyMobilePopupContainer.find('.js-popup-code-submit');
  var mobileError = verifyMobilePopupContainer.find('.js-error');


  var successPopup = $('.js-popup-register');
  events();

  function events(){
    checkbox();
    checkInputs();
    registerValidation();

  }

  function checkbox(){
    _checkbox.on('click touch', function(){
      var _status = $(this).hasClass('checked') ? 'false' : 'true';
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
    registerBtn.removeAttr('disabled');
  }
  function registerValidation(){
    registerBtn.on('click touch', function(e){
      form.validate({
        rules: {
          name: 'required',
          email_mobile: 'required',
          pwd: {
            required: true,
            minlength: 6,
 
          }
        },
        messages: {
          user: $('input[name="register-230"]').val(),
          email_mobile: $('input[name="register-210"]').val(),
          pwd: {
            required: $('input[name="register-220"]').val(),
            minlength: $('input[name="register-221"]').val(),
           
          }
        },
        submitHandler: function(e){

          var uid = form.find('input[name="email_mobile"]').val();
          registerBtn.attr('disabled');
          $('.js-loading').show();
          submitRegisterForm(uid);

        }
      });
                
      
    });
  }
  function submitRegisterForm(uid){
    var uid = uid;
    var _data = form.serializeJson();
    var _url = 'http://mib.zengpan.org:8000/register?';
    var q = form.serializeJson();
    var response = { "status" : 213, "message" : "手机号不可用" } ;
    q['_response'] = response;
    q = JSON.stringify(q);
    _url = _url + q;  

    
    var r = new XMLHttpRequest();
    r.open("GET", encodeURI(_url), true);
    r.onerror = r.onabort = r.ontimeout = function(e) { console.log(e); }
    r.send();
    r.onreadystatechange = function() {
      if (r.readyState == r.DONE) {
        $('.js-loading').hide();
        if (r.status == 200) {
          var _status = $.parseJSON(r.response).status;
          var _msg = $.parseJSON(r.response).message;
          if(_status == 100){
            error.hide();
            // email
            if(uid.indexOf('@') > 0){
              verifyEmailPopup(uid);
            }
            // mobile
            else{
              verifyMobilePopup(uid);
            }
          }
          else{
            var _errorHtml;
            if(_status == 210){
              _errorHtml = $('input[name="register-210"]').val();
            }
            else if(_status == 211){
              _errorHtml = $('input[name="register-211"]').val();
            }
            else if(_status == 212){
              _errorHtml = $('input[name="register-212"]').val();
            }
            else if(_status == 213){
              _errorHtml = $('input[name="register-213"]').val();
            }
            else if(_status == 214){
              _errorHtml = $('input[name="register-214"]').val();
            }
            else if(_status == 215){
              _errorHtml = $('input[name="register-215"]').val();
            }
            else if(_status == 220){
              _errorHtml = $('input[name="register-220"]').val();
            }
            else if(_status == 221){
              _errorHtml = $('input[name="register-221"]').val();
            }
            else if(_status == 222){
              _errorHtml = $('input[name="register-222"]').val();
            }
            else if(_status == 223){
              _errorHtml = $('input[name="register-223"]').val();
            }
            else if(_status == 230){
              _errorHtml = $('input[name="register-230"]').val();
            }
            else if(_status == 231){
              _errorHtml = $('input[name="register-231"]').val();
            }
            else if(_status == 232){
              _errorHtml = $('input[name="register-232"]').val();
            }
            else if(_status == 233){
              _errorHtml = $('input[name="register-233"]').val();
            }
            error.html(_msg);
            error.show();
          }
          
        }
      }
    }

    // $.ajax({
    //   type: 'POST',
    //   dataType: 'JSON',
    //   url: _url,
    //   data: _data,
    //   success: function(response){
    //     if(response == 100){
    //       error.hide();
    //       // email
    //       if(uid.indexOf('@') > 0){
    //         verifyEmailPopup(uid);
    //       }
    //       // mobile
    //       else{
    //         verifyMobilePopup(uid);
    //       }
    //     }
    //     else{
    //       error.html(response.message);
    //       error.show();
    //     }
    //   },
    //   error: function(error){
    //     console.log(error);
    //   }
    // })
  }

  function verifyEmailPopup(email){
    var email = email;
    verifyEmailPopupContainer.find('.js-display-email').html(email);
    verifyEmailPopupContainer.find('input[name="userEmail"]').val(email);

    showPopup(verifyEmailPopupContainer);
    checkEmailVerification();

    $(document).on('click touch', '.js-popup-cover, .js-close-verify-email', function(e){
      e.stopPropagation();
      closePopup(verifyEmailPopupContainer);
    });
  }



  
  // email verification
  function checkEmailVerification(){
    countDown();

    resendBtn.on('click touch', function(e){
      e.preventDefault();
      countDown();
    })

    verifyBtn.on('click touch', function(e){
      e.preventDefault();
      
      var _data = emailForm.serializeJson();
      var q = emailForm.serializeJson();
      var _url = 'http://mib.zengpan.org:8000/register?';
      var response = { "status" : 100, "message" : "验证成功" } ;
      q['_response'] = response;
      q = JSON.stringify(q);
      _url = _url + q;   

      var r = new XMLHttpRequest();
      r.open("GET", encodeURI(_url), true);
      r.onerror = r.onabort = r.ontimeout = function(e) { console.log(e); }
      r.send();
      r.onreadystatechange = function() {
        if (r.readyState == r.DONE) {
          if (r.status == 200) {
            var _status = $.parseJSON(r.response).status;
            var _msg = $.parseJSON(r.response).message;
            if(_status == 100){
              emailError.hide();
              registerSuccess();
            }
            else{
              var _errorHtml;
              if(_status == 200){
                _errorHtml = $('input[name="register-email-200"]').val();
              }

              emailError.html(_errorHtml);
              emailError.show();
            }
            
          }
        }
      }

      // email
      // $.ajax({
      //   type: 'POST',
      //   dataType: 'JSON',
      //   url: _url,
      //   data: _data,
      //   success: function(response){
      //     if(response == 100){
      //       emailError.hide();
      //       registerSuccess();
      //     }
      //     else{
      //       emailError.html(response.message);
      //       emailError.show();
      //     }
      //   },
      //   error: function(error){
      //     console.log(error);
      //   }
      // })
    })
  }

  function verifyMobilePopup(number){
    var number = number;
    verifyMobilePopupContainer.find('input[name="phone"]').val(number);
    showPopup(verifyMobilePopupContainer);
    checkMobileVerification();
  }

  function checkMobileVerification(){
    mobileVerifyBtn.on('click touch', function(){
      var _code = '';
       

      verifyMobilePopupContainer.find('input.js-code').each(function(){
        _code += $(this).val().toString();
      });
      verifyMobilePopupContainer.find('input[name="code"]').val(_code);


      var _data = mobileForm.serializeJson();
      var _url = 'http://mib.zengpan.org:8000/register?';
      var q = mobileForm.serializeJson();
      var response = { "status" : 100, "message" : "验证成功" } ;
      q['_response'] = response;
      q = JSON.stringify(q);
      _url = _url + q;   

      var r = new XMLHttpRequest();
      r.open("GET", encodeURI(_url), true);
      r.onerror = r.onabort = r.ontimeout = function(e) { console.log(e); }
      r.send();
      r.onreadystatechange = function() {
        if (r.readyState == r.DONE) {
          if (r.status == 200) {
            // console.log(r);
            var _status = $.parseJSON(r.response).status;
            var _msg = $.parseJSON(r.response).message;
            if(_status == 100){
              mobileError.hide();
              registerSuccess();
            }
            else{
              var _errorHtml;
              if(_status == 200){
                _errorHtml = $('input[name="register-mobile-200"]').val();
              }
              mobileError.html(_errorHtml);
              mobileError.show();
            }
            
          }
        }
      }


      // email
      // $.ajax({
      //   type: 'POST',
      //   dataType: 'JSON',
      //   url: _url,
      //   data: _data,
      //   success: function(response){
      //     if(response == 100){
      //       mobileError.hide();
      //       registerSuccess();
      //     }
      //     else{
      //       mobileError.html(response.message);
      //       mobileError.show();
      //     }
      //   },
      //   error: function(error){
      //     console.log(error);
      //   }
      // })
    }) 
  }

  function countDown(){
    var _time = 60;

    resendBtn.attr('disabled','disabled');
    var countTime = setInterval(function(){
      _time = _time - 1;

      resendBtn.html('重新发送 (' + _time +')');
      if(_time == 0){
        clearInterval(countTime);
        resendBtn.html('发送验证码');
        resendBtn.removeAttr('disabled');
      }
    }, 1000)
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

  function registerSuccess(){
    closePopup(verifyEmailPopupContainer);
    closePopup(verifyMobilePopupContainer);
    showPopup(successPopup);
    successPopup.find('a').on('click touch', function(){
      window.location.href='./index.html';
    });
    setTimeout(function(){
      window.location.href='./index.html';
    }, 5000)

  }

}
  