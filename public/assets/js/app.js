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
  slider();
  historyEllipsis();
  $(document).Popups();

  $('[data-js-register]').Register();
  $('[data-js-order-detail]').OrderDetail();
  $('[data-js-prepay]').PrePay();
  $('[data-js-payment-method]').PaymentMethod();

  function slider() {
    $('.js-categories-slider').slick({
      dots: false,
      infinite: false,
      slidesToShow: 4,
      arrows: false
    });
  }

  $('[data-js-collapse]').Collapse({
    text: true
  });
  $('[data-js-carousel').Carousel();

  // lightbox on store
  lightbox.option({
    'resizeDuration': 200,
    'wrapAround': true
  });

  // datepicker on order detail
  $('.js-datepicker').dateRangePicker({
    language: 'cn'
  });

  function historyEllipsis() {
    var defHeight = 52 * 3; //3 lines of search history
    var slideHeight = $('.js-history-list').height();
    var toggleHeight;
    var label;
    // init history height
    if (defHeight < slideHeight) {
      label = '更多';
      $('.js-history-view-more').html(label);
      $('.js-history-view-more').removeClass('hide');
      toggleHeight = slideHeight;
    }
    // toggle height
    $('.js-history-view-more').on('click', function () {
      $('.js-history-box').animate({
        'height': toggleHeight + 'px'
      });

      toggleHeight = toggleHeight == defHeight ? slideHeight : defHeight;
      label = label == '更多' ? '收起' : '更多';
      $('.js-history-view-more').html(label);
    });
  }
});
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
    verifyEmailPopup();
    resetPswPopup();
  }

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
  }
  function registerPopup() {
    $(document).on('click touch', '.js-popup-cover, .js-close-register', function (e) {
      e.stopPropagation();
      closePopup($('.js-popup-register'));
    });
  }

  function verifyEmailPopup() {
    $(document).on('click touch', '.js-register-btn', function (e) {
      e.stopPropagation();
      // $('.js-popup-code').show();
      showPopup($('.js-popup-verify-email'));
    });
    $(document).on('click touch', '.js-popup-cover, .js-close-verify-email', function (e) {
      e.stopPropagation();
      closePopup($('.js-popup-verify-email'));
    });
  }

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

  events();

  function events() {
    checkbox();
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
};
'use strict';

$.fn.Register = function (opts) {

  var container = $(this);
  var _checkbox = $(this).find('.js-checkbox');

  events();

  function events() {
    checkbox();
  }

  function checkbox() {
    _checkbox.on('click touch', function () {
      $(this).toggleClass('checked');
    });
  }
};