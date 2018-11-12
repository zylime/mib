'use strict';

$.fn.Calender = function (opts) {

  var _calendarContainer = $(this).find('.js-calendar-container');
  var onSelect = true;

  events();

  function events() {
    initCalendar();
  }

  function initCalendar() {
    for (var i = 0; i < 12; i++) {
      var _date = new Date();
      var _selector = '.js-calendar-' + (i + 1);
      // console.log(_selector);
      _date.setDate(1);
      _date.setMonth(_date.getMonth() - 6 + i);
      // console.log(_date);
      _calendarContainer.append('<div class="c-calendar--block js-calendar js-calendar-' + (i + 1) + '" data-time="' + _date + '"></div>');

      $(_selector).calendar({
        date: _date,
        daysMin: ['日', '一', '二', '三', '四', '五', '六']
      });
    }
    _calendarContainer.append('<input type="hidden" name="selectDate" class="js-calendar-select-date">');
    // selectDate();
  }

  function selectDate() {
    $('.js-calendar .day').on('click touch', function () {
      if (!onSelect) {
        $(this).addClass('active');
      }
    });
    $('.js-calendar-select-date').val('a');
  }
};
"use strict";

$.fn.Carousel = function (opts) {

  var container = $(this);

  events();

  function events() {
    // var _this = this;
    container.slick({
      infinite: true,
      arrows: false,
      dots: false
    });
  }
};
'use strict';

$.fn.Collapse = function (opts) {
  var defaults = {
    text: false
  };
  var settings = $.extend(defaults, opts);
  var container = $(this).find('.js-collapse-container'),
      content = $(this).find('.js-collapse-content'),
      btn = $(this).find('.js-collapse-btn');
  var label1, label2;

  if (settings.text) {
    label1 = '阅读更多', label2 = '收起';
  }
  var defHeight = container.height();

  events();

  function events() {
    var _this = this;
    var contentHeight = content.height();
    var toggleHeight;
    if (defHeight < contentHeight) {
      btn.attr('data-expanded', false).removeClass('hide');
      if (settings.text) {
        btn.find('span').html(label1);
      }
      toggleHeight = contentHeight;
    }

    // toggle height
    btn.on('click', function () {
      var _status = $(this).attr('data-expanded') == "true" ? "false" : "true";

      container.animate({
        'height': toggleHeight + 'px'
      });
      btn.attr('data-expanded', _status);
      toggleHeight = toggleHeight == defHeight ? contentHeight : defHeight;
      if (settings.text) {
        var _label = $(this).find('span').html() == label1 ? label2 : label1;
        btn.find('span').html(_label);
      }
    });
  }
};
'use strict';

$(document).ready(function () {

  $(document).Popups();

  $('[data-js-sign-in]').SignIn();
  $('[data-js-sign-in-by-mobile]').MobileVerification();
  $('[data-js-register]').Register();
  $('[data-js-order-detail]').OrderDetail();
  $('[data-js-prepay]').PrePay();
  $('[data-js-payment-method]').PaymentMethod();
  $('[data-js-home]').Home();
  $('[data-js-project-list]').ProjectList();
  $('[data-js-carousel]').Carousel();
  $('[data-js-store-comments]').StoreComments();
  $('[data-js-password]').TogglePsw();
  $('[data-js-calendar]').Calender();

  $('[data-js-forget-psw]').forgetPsw();
  $('[data-js-reset-psw]').resetPsw();

  $('[data-js-collapse]').Collapse({
    text: true
  });

  $('[data-js-search]').Search();

  // lightbox on store
  lightbox.option({
    'resizeDuration': 200,
    'wrapAround': true
  });
});

// $(window).onload(function(){
//   $('[data-js-sign-in]').SignIn();
// })
'use strict';

$.fn.forgetPsw = function (opts) {

  var container = $(this);
  var codeBtn = $(this).find('.js-code');
  var submitBtn = $(this).find('.js-submit');
  var form = $(this).find('.js-forget-psw-form');

  events();

  function events() {
    getCode();
    submit();
  }

  function getCode() {
    codeBtn.on('click touch', function () {
      if (!$(this).hasClass('disabled')) {
        var _time = 60;
        var _this = this;
        $(this).addClass('disabled');

        var countTime = setInterval(function () {
          _time = _time - 1;

          $(_this).html('重新发送 (' + _time + ')');
          if (_time == 0) {
            clearInterval(countTime);
            $(_this).html('发送验证码');
            $(_this).removeClass('disabled');
          }
        }, 1000);
      }
    });
  }

  function submit() {
    submitBtn.on('click touch', function () {
      var _data = form.serialize();
      var _url = '';

      /*form submit*/
      $.ajax({
        type: 'POST',
        dataType: 'text',
        url: _url,
        data: _data,
        success: function success(msg) {}
      });
    });
  }
};
'use strict';

$.fn.Home = function (opts) {

  var sliderContainer = $(this).find('.js-categories-slider');

  events();

  function events() {
    slider();
  }

  function slider() {
    sliderContainer.slick({
      dots: false,
      infinite: false,
      slidesToShow: 4,
      arrows: false
    });
  }
};
'use strict';

$.fn.MobileVerification = function () {
  var number = $(this).find('.js-mobile-number');
  var verifyMobilePopupContainer = $('.js-popup-code');
  var mobileForm = verifyMobilePopupContainer.find('.js-popup-code-form');
  var mobileVerifyBtn = verifyMobilePopupContainer.find('.js-popup-code-submit');
  var mobileError = verifyMobilePopupContainer.find('.js-error');
  events();
  function events() {
    checkMobileVerification();
  }
  function checkMobileVerification() {
    mobileVerifyBtn.on('click touch', function () {
      var _code = '';

      verifyMobilePopupContainer.find('input[name="phone"]').val(number.val());
      verifyMobilePopupContainer.find('input.js-code').each(function () {
        _code += $(this).val().toString();
      });
      verifyMobilePopupContainer.find('input[name="code"]').val(_code);

      var _data = mobileForm.serializeJson();
      var _url = 'http://mib.zengpan.org:8000/register?';
      var q = mobileForm.serializeJson();
      var response = { "status": 100, "message": "success" };
      q['_response'] = response;
      q = JSON.stringify(q);
      _url = _url + q;

      var r = new XMLHttpRequest();
      r.open("GET", encodeURI(_url), true);
      r.onerror = r.onabort = r.ontimeout = function (e) {
        console.log(e);
      };
      r.send();
      r.onreadystatechange = function () {
        if (r.readyState == r.DONE) {
          if (r.status == 200) {
            var _status = $.parseJSON(r.response).status;
            var _msg = $.parseJSON(r.response).message;
            if (_status == 100) {
              mobileError.hide();
              window.location.href = './index.html';
            } else {
              mobileError.html(_msg);
              mobileError.show();
            }
          }
        }
      };

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
    });
  }
};
'use strict';

$.fn.OrderDetail = function (opts) {

  var _checkbox = $(this).find('.js-order-detail-checkbox');
  var _userInfo = $(this).find('.js-user-info p');
  var _inputUserName = $(this).find('.js-user-info input[name="userName"]');
  var _inputUserId = $(this).find('.js-user-info input[name="userId"]');
  var _updateUserBtn = $(this).find('.js-user-info .js-btn');

  events();

  function events() {
    toggleCheckbox();
    updateUserInfo();
    datePicker();
  }

  function toggleCheckbox() {
    _checkbox.on('click touch', function () {
      var _value = $(this).attr('data-value') == '' ? 'checked' : '';
      // console.log($(this).attr('data-value') == '');
      $(this).toggleClass('active');
      $(this).attr('data-value', _value);
      $(this).next().val(_value);
    });
  }

  function updateUserInfo() {
    var label = _updateUserBtn.html() == '更改' ? '完成' : '更改';
    syncUserInfo();

    _updateUserBtn.on('click touch', function () {
      _inputUserName.toggle();
      _inputUserId.toggle();
      _userInfo.toggle();
      syncUserInfo();
    });
  }

  function syncUserInfo() {
    var _html = _inputUserName.val() + ' ' + _inputUserId.val();
    _userInfo.html(_html);
  }

  function datePicker() {
    // console.log($('.js-datepicker').length);
    if ($('.js-datepicker').length > 0) {
      $('.js-datepicker').dateRangePicker({
        language: 'cn'
      });
    }
  }
};
'use strict';

$.fn.PaymentMethod = function (opts) {

  var container = $(this);
  var _checkbox = $(this).find('.js-checkbox');

  events();

  function events() {
    checkbox();
  }

  function checkbox() {
    _checkbox.each(function () {
      $(this).on('click touch', function () {
        resetAllInput();

        $(this).addClass('active');
        $(this).attr('data-checked', 'checked');
        $(this).prev().val('checked');
      });
    });
  }
  function resetAllInput() {
    _checkbox.each(function () {
      $(this).attr('data-checked', '').removeClass('active');
      $(this).prev().val('');
    });
  }
};
'use strict';

$.fn.Popups = function (opts) {

  var container = $(this);

  events();

  function events() {
    txtMsgPopup();
    registerPopup();
    // verifyEmailPopup(); //moved to register.js
    resetPswPopup();
  }

  // 手机短信验证
  function txtMsgPopup() {
    $(document).on('click touch', '.js-open-popup-code', function (e) {
      e.stopPropagation();
      // $('.js-popup-code').show();
      showPopup($('.js-popup-code'));
    });
    $(document).on('click touch', '.js-popup-cover, .js-close-popup-code', function (e) {
      e.stopPropagation();
      closePopup($('.js-popup-code'));
    });
    sendVerificationCode();
    inputCode();
  }
  function sendVerificationCode() {
    $('.js-popup-code-verification-btn').on('click touch', function () {

      var _time = 60;
      var _this = this;
      $(this).attr('disabled', 'disabled');

      var countTime = setInterval(function () {
        _time = _time - 1;

        $(_this).html('重新发送 (' + _time + ')');
        if (_time == 0) {
          clearInterval(countTime);
          $(_this).html('发送验证码');
          $(_this).removeAttr('disabled');
        }
      }, 1000);
    });
  }
  function inputCode() {
    $('.js-popup-code').find('input.js-code').each(function (index) {
      var i = index;
      $(this).on('keydown', function () {
        if ($(this).val().length == 1 && $($('.js-popup-code').find('input.js-code')[i + 1]).length > 0) {
          $($('.js-popup-code').find('input')[i + 1]).focus();
        }
      });
      $(this).on('input.js-code', function () {
        updateButton();
      });
    });
  }

  function updateButton() {
    var _length = $('.js-popup-code').find('input.js-code').length;
    for (var i = 0; i < _length; i++) {
      if ($($('.js-popup-code').find('input.js-code')[i]).val().length == 0) {
        break;
      } else {
        if (i == _length - 1) {
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

  function registerPopup() {
    $(document).on('click touch', '.js-popup-cover, .js-close-register', function (e) {
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

  function resetPswPopup() {
    $(document).on('click touch', '.js-popup-cover', function (e) {
      e.stopPropagation();
      closePopup($('.js-popup-reset-psw'));
      // console.log('clicked');
      // $('.js-popup-reset-psw-btn').click();
    });
  }

  function showPopup(ele) {
    var ele = ele;
    ele.show();
    $('.js-popup-cover').show();
  }

  function closePopup(ele) {
    var ele = ele;
    ele.hide();
    $('.js-popup-cover').hide();
  }
};
'use strict';

$.fn.PrePay = function (opts) {

  var container = $(this);
  var _checkbox = $(this).find('.js-checkbox');
  var _priceItems = $(this).find('.js-price');
  var _totalPrice = $(this).find('.js-total');
  var _currencySymbol = '¥';

  events();

  function events() {
    checkbox();
    calcPrice();
  }

  function checkbox() {
    _checkbox.on('click touch', function () {
      // console.log($(this).attr('data-checked') == '');
      var checkStatus = $(this).attr('data-checked') == '' ? 'checked' : '';
      $(this).toggleClass('active');
      $(this).attr('data-checked', checkStatus);
      $(this).prev().val(checkStatus);
    });
  }

  function calcPrice() {
    var _price = 0;
    _priceItems.each(function () {
      var _itemPrice = parseInt($(this).attr('data-price'));

      _price += _itemPrice;
      // console.log('itemprice: ' + _itemPrice + '; total: '+_price);
    });
    _price = Number(_price).toFixed(2);
    _totalPrice.attr('data-price', _price).html(_currencySymbol + _price);
  }
};
'use strict';

$.fn.ProjectList = function (opts) {

  var sliderContainer = $(this).find('.js-categories-slider');
  var favoriteIcons = $(this).find('.js-favorite');

  events();

  function events() {
    slider();
    // getData();
    toggleFavorite();
  }

  function slider() {
    sliderContainer.slick({
      dots: false,
      infinite: false,
      slidesToShow: 3,
      arrows: false
    });
  }
  // function getData(){
  //   var 
  // }
  function toggleFavorite() {
    favoriteIcons.each(function () {
      $(this).on('click touch', function (e) {
        e.preventDefault();
        e.stopPropagation();
        $(this).toggleClass('active');
      });
    });
  }
};
'use strict';

$.fn.Register = function (opts) {

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

  function events() {
    checkbox();
    checkInputs();
    registerValidation();
  }

  function checkbox() {
    _checkbox.on('click touch', function () {
      var _status = $(this).hasClass('checked') ? 'false' : 'true';
      $(this).toggleClass('checked');
      $(this).find('input').val(_status);
    });
  }
  function checkInputs() {
    var inputStatus = false;
    form.find('input').on('keydown', function () {
      var _length = form.find('input').length;
      // console.log(_length);
      for (var i = 0; i < _length; i++) {

        if ($(form.find('input')[i]).val() == '') {

          inputStatus = false;
          break;
        } else {
          inputStatus = true;
        }
      }

      if (inputStatus) {
        updateButton();
      }
    });
  }
  function updateButton() {
    registerBtn.removeAttr('disabled');
  }
  function registerValidation() {
    registerBtn.on('click touch', function (e) {
      form.validate({
        rules: {
          name: 'required',
          email_mobile: 'required',
          pwd: 'required'
        },
        messages: {
          user: '请输入昵称',
          email_mobile: '请输入邮箱或手机号',
          pwd: '请输入密码'
        },
        submitHandler: function submitHandler(e) {

          var uid = form.find('input[name="email_mobile"]').val();
          submitRegisterForm(uid);
        }
      });
    });
  }
  function submitRegisterForm(uid) {
    var uid = uid;
    var _data = form.serializeJson();
    var _url = 'http://mib.zengpan.org:8000/register?';
    var q = form.serializeJson();
    var response = { "status": 100, "message": "succeed" };
    q['_response'] = response;
    q = JSON.stringify(q);
    _url = _url + q;

    var r = new XMLHttpRequest();
    r.open("GET", encodeURI(_url), true);
    r.onerror = r.onabort = r.ontimeout = function (e) {
      console.log(e);
    };
    r.send();
    r.onreadystatechange = function () {
      if (r.readyState == r.DONE) {
        if (r.status == 200) {
          var _status = $.parseJSON(r.response).status;
          var _msg = $.parseJSON(r.response).message;
          if (_status == 100) {
            error.hide();
            // email
            if (uid.indexOf('@') > 0) {
              verifyEmailPopup(uid);
            }
            // mobile
            else {
                verifyMobilePopup(uid);
              }
          } else {
            // console.log(_msg);
            error.html(_msg);
            error.show();
          }
        }
      }
    };

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

  function verifyEmailPopup(email) {
    var email = email;
    verifyEmailPopupContainer.find('.js-display-email').html(email);
    verifyEmailPopupContainer.find('input[name="userEmail"]').val(email);

    showPopup(verifyEmailPopupContainer);
    checkEmailVerification();

    $(document).on('click touch', '.js-popup-cover, .js-close-verify-email', function (e) {
      e.stopPropagation();
      closePopup(verifyEmailPopupContainer);
    });
  }

  // email verification
  function checkEmailVerification() {
    countDown();

    resendBtn.on('click touch', function (e) {
      e.preventDefault();
      countDown();
    });

    verifyBtn.on('click touch', function (e) {
      e.preventDefault();

      var _data = emailForm.serializeJson();
      var q = emailForm.serializeJson();
      var _url = 'http://mib.zengpan.org:8000/register?';
      var response = { "status": 100, "message": "success" };
      q['_response'] = response;
      q = JSON.stringify(q);
      _url = _url + q;

      var r = new XMLHttpRequest();
      r.open("GET", encodeURI(_url), true);
      r.onerror = r.onabort = r.ontimeout = function (e) {
        console.log(e);
      };
      r.send();
      r.onreadystatechange = function () {
        if (r.readyState == r.DONE) {
          if (r.status == 200) {
            var _status = $.parseJSON(r.response).status;
            var _msg = $.parseJSON(r.response).message;
            if (_status == 100) {
              emailError.hide();
              registerSuccess();
            } else {
              emailError.html(_msg);
              emailError.show();
            }
          }
        }
      };

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
    });
  }

  function verifyMobilePopup(number) {
    var number = number;
    verifyMobilePopupContainer.find('input[name="phone"]').val(number);
    showPopup(verifyMobilePopupContainer);
    checkMobileVerification();
  }

  function checkMobileVerification() {
    mobileVerifyBtn.on('click touch', function () {
      var _code = '';

      verifyMobilePopupContainer.find('input.js-code').each(function () {
        _code += $(this).val().toString();
      });
      verifyMobilePopupContainer.find('input[name="code"]').val(_code);

      var _data = mobileForm.serializeJson();
      var _url = 'http://mib.zengpan.org:8000/register?';
      var q = mobileForm.serializeJson();
      var response = { "status": 100, "message": "success" };
      q['_response'] = response;
      q = JSON.stringify(q);
      _url = _url + q;

      var r = new XMLHttpRequest();
      r.open("GET", encodeURI(_url), true);
      r.onerror = r.onabort = r.ontimeout = function (e) {
        console.log(e);
      };
      r.send();
      r.onreadystatechange = function () {
        if (r.readyState == r.DONE) {
          if (r.status == 200) {
            console.log(r);
            var _status = $.parseJSON(r.response).status;
            var _msg = $.parseJSON(r.response).message;
            if (_status == 100) {
              mobileError.hide();
              registerSuccess();
            } else {
              mobileError.html(_msg);
              mobileError.show();
            }
          }
        }
      };

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
    });
  }

  function countDown() {
    var _time = 60;

    resendBtn.attr('disabled', 'disabled');
    var countTime = setInterval(function () {
      _time = _time - 1;

      resendBtn.html('重新发送 (' + _time + ')');
      if (_time == 0) {
        clearInterval(countTime);
        resendBtn.html('发送验证码');
        resendBtn.removeAttr('disabled');
      }
    }, 1000);
  }

  function showPopup(ele) {
    var ele = ele;
    ele.show();
    $('.js-popup-cover').show();
  }

  function closePopup(ele) {
    var ele = ele;
    ele.hide();
    $('.js-popup-cover').hide();
  }

  function registerSuccess() {
    closePopup(verifyEmailPopupContainer);
    closePopup(verifyMobilePopupContainer);
    showPopup(successPopup);
    successPopup.find('a').on('click touch', function () {
      window.location.href = './index.html';
    });
  }
};
'use strict';

$.fn.resetPsw = function (opts) {

  var container = $(this);

  var submitBtn = $(this).find('.js-submit');
  var form = $(this).find('.js-reset-psw-form');
  var psw1 = $(this).find('.js-input-psw1');
  var psw2 = $(this).find('.js-input-psw2');
  var warning = $(this).find('.js-warning');

  events();

  function events() {

    submit();
  }

  function submit() {
    submitBtn.on('click', function (e) {
      e.preventDefault();
      var _psw1 = psw1.val();
      var _psw2 = psw2.val();
      // console.log(_psw1);
      // console.log(_psw2);
      if (_psw1 == '' || _psw2 == '') {
        warning.html('请输入密码');
        warning.show();
      } else {
        if (_psw1 !== _psw2) {
          warning.html('密码不匹配');
          warning.show();
        } else {
          warning.hide();
          var _data = form.serialize();
          var _url = '';
          console.log(_data);
          /*form submit*/
          $.ajax({
            type: 'POST',
            dataType: 'text',
            url: _url,
            data: _data,
            success: function success(msg) {}
          });
        }
      }
    });
  }
};
'use strict';

$.fn.Search = function (opts) {

  var clearBtn = $(this).find('.js-clear-btn');
  var resultContainer = $(this).find('.js-result-container');
  var viewMoreBtn = $(this).find('.js-history-view-more');

  events();

  function events() {
    clearResult();
    historyEllipsis();
  }

  function clearResult() {
    clearBtn.on('click touch', function (e) {
      resultContainer.html('');
      viewMoreBtn.addClass('hide');
      resetViewMore();
    });
  }

  function historyEllipsis() {
    var defHeight = 52 * 3; //3 lines of search history
    var slideHeight = $('.js-history-list').height();
    var toggleHeight;
    var label;
    var status;
    // init history height
    if (defHeight < slideHeight) {
      label = '更多';
      $('.js-history-view-more').html(label);
      $('.js-history-view-more').removeClass('hide');
      toggleHeight = slideHeight;
    }
    // toggle height
    $('.js-history-view-more').on('click', function () {
      status = $(this).attr('data-expanded') == 'true' ? 'false' : 'true';
      $('.js-history-box').animate({
        'height': toggleHeight + 'px'
      });
      $(this).attr('data-expanded', status);
      toggleHeight = toggleHeight == defHeight ? slideHeight : defHeight;
      label = label == '更多' ? '收起' : '更多';
      $('.js-history-view-more').html(label);
    });
  }

  function resetViewMore() {
    $('.js-history-view-more').attr('data-expanded', 'false').html('更多');
  }
};
"use strict";

$.fn.serializeJson = function () {
        var serializeObj = {};
        var array = this.serializeArray();
        // var str=this.serialize(); 
        $(array).each(function () {
                // 遍历数组的每个元素 
                if (serializeObj[this.name]) {
                        // 判断对象中是否已经存在 name，如果存在name 
                        if ($.isArray(serializeObj[this.name])) {
                                serializeObj[this.name].push(this.value); // 追加一个值 hobby : ['音乐','体育'] 
                        } else {
                                // 将元素变为 数组 ，hobby : ['音乐','体育'] 
                                serializeObj[this.name] = [serializeObj[this.name], this.value];
                        }
                } else {
                        serializeObj[this.name] = this.value; // 如果元素name不存在，添加一个属性 name:value 
                }
        });
        return serializeObj;
};
'use strict';

$.fn.SignIn = function (opts) {

  var container = $(this);
  var form = $(this).find('.js-sign-in-form');
  var dropdownContainer = $(this).find('.js-dropdown-body');
  var removeBtn = $(this).find('.js-dropdown-body .js-remove');
  var dropdownBtn = $(this).find('.js-dropdown-btn');
  var signInSubmitBtn = $(this).find('.js-sign-in-submit');
  var error = form.find('.js-error');
  // var 


  events();

  function events() {
    toggleDropdown();
    dropdown();
    selectFromList();
    formValidation();
  }
  function toggleDropdown() {
    dropdownBtn.on('click touch', function () {
      if (!dropdownContainer.find('li').length == 0) {
        dropdownContainer.slideToggle();
      }
    });
    $(document).on('click touch', function (e) {
      e.stopPropagation();
      if ($(e.target).parents('.c-sign-in--form').length <= 0) {
        dropdownContainer.slideUp();
      }
    });
  }
  function dropdown() {
    removeBtn.each(function () {
      $(this).on('click touch', function (e) {
        $(this).parents('li').remove();
        checkList();
      });
    });
  }
  function checkList() {
    if (dropdownContainer.find('li').length == 0) {
      dropdownContainer.slideToggle();
    }
  }
  function selectFromList() {
    dropdownContainer.find('span').on('click touch', function () {
      var _val = $(this).html();
      dropdownContainer.siblings('input').val(_val);
    });
  }

  function formValidation() {
    signInSubmitBtn.on('click touch', function (e) {
      form.validate({
        rules: {
          user: 'required',
          pwd: 'required'
        },
        messages: {
          user: '请输入用户名',
          pwd: '请输入密码'
        },
        submitHandler: function submitHandler() {
          submitForm();
        }
      });
    });
  }

  function submitForm() {
    var _data = form.serializeJson();
    var _url = 'http://mib.zengpan.org:8000/register?';
    var q = form.serializeJson();
    var response = { "status": 100, "message": "success" };
    q['_response'] = response;
    q = JSON.stringify(q);
    _url = _url + q;

    var r = new XMLHttpRequest();
    r.open("GET", encodeURI(_url), true);
    r.onerror = r.onabort = r.ontimeout = function (e) {
      console.log(e);
    };
    r.send();
    r.onreadystatechange = function () {
      if (r.readyState == r.DONE) {
        if (r.status == 200) {
          var _status = $.parseJSON(r.response).status;
          var _msg = $.parseJSON(r.response).message;
          if (_status == 100) {
            error.hide();
            window.location.href = './index.html';
          } else {
            error.html(_msg);
            error.show();
          }
        }
      }
    };

    // $.ajax({
    //   type: 'POST',
    //   dataType: 'JSON',
    //   url: _url,
    //   data: _data,
    //   success: function(response){
    //     if(response == 100){
    //       error.hide();
    //       window.location.href='./index.html';

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
};
'use strict';

$.fn.StoreComments = function (opts) {

  var commentsBody = $(this).find('.js-comments-body');

  events();

  function events() {
    // removed, no longer in use
    // initComments();
  }

  function initComments() {
    commentsBody.each(function () {

      var containerHeight = $(this).children('p').height();
      var bodyHeight = $(this).height();
      var needViewMore = containerHeight > bodyHeight;
      if (needViewMore) {
        $(this).append('<div class="btn-expand js-view-more" data-expanded="false"><span>阅读更多</span></div>');
        viewMore();
      }
    });
  }

  function viewMore() {
    commentsBody.each(function () {
      var container = $(this);

      var containerHeight = $(this).height();
      var bodyHeight = $(this).find('p').height();
      $(this).find('.js-view-more').unbind('click touch').on('click touch', function () {
        if ($(this).attr('data-expanded') == 'false') {
          container.css('max-height', bodyHeight);
          $(this).attr('data-expanded', 'true');
        } else {
          container.css('max-height', containerHeight);
          $(this).attr('data-expanded', 'false');
        }
      });
    });
  }
};
'use strict';

$.fn.TogglePsw = function (opts) {

  var _input = $(this).find('.js-psw-input');
  var _eye = $(this).find('.js-psw-eye');

  events();

  function events() {
    _eye.on('click touch', function () {
      var _type = _input.attr('type') == 'password' ? 'text' : 'password';

      _eye.toggleClass('close');
      _input.attr('type', _type);
    });
  }
};