'use strict';

$.fn.AddFriends2 = function (opts) {

  var container = $(this);
  var submitBtn = $(this).find('.js-submit');
  var checkbox = $(this).find('.js-checkbox');
  var form = $(this).find('.js-form');
  var popup = $('.js-popup-add-friends');

  events();

  function events() {
    initCheckbox();

    submitBtn.on('click touch', function () {
      // submitDate();
      if (!$(this).hasClass('disabled')) {
        openFriendRequestPopup();
      }
    });

    $(document).on('click touch', '.js-popup-cover, .js-close-add-friends', function (e) {
      e.stopPropagation();
      closePopup(popup);
    });
  }

  function initCheckbox() {
    checkbox.on('click touch', function () {
      if ($(this).attr('data-name') === 'all') {
        if ($(this).hasClass('active')) {
          resetAll();
        } else {
          selectAll();
        }
      } else {
        var _value;
        $(this).toggleClass('active');
        _value = $(this).hasClass('active') ? 'selected' : '';

        $(this).find('input').val(_value);
      }

      updateSubmitBtn();
    });
  }
  function resetAll() {
    checkbox.each(function () {
      $(this).removeClass('active');
      $(this).find('input').val('');
    });
  }

  function selectAll() {
    checkbox.each(function () {
      $(this).addClass('active');
      $(this).find('input').val('selected');
    });
  }

  function updateSubmitBtn() {
    if (checkbox.hasClass('active')) {
      submitBtn.removeClass('disabled');
    } else {
      submitBtn.addClass('disabled');
    }
  }

  function openFriendRequestPopup() {
    showPopup(popup);
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

  function submitDate() {}
};
'use strict';

// 上传图片
/*
(data-js-add-media)
  .l-flex.c-product-info--form--media.js-media
    .item
      input.input-file.js-input-file(type="file", name="", accept="image/*" capture="camera")
      .item--content.js-add-media
        .ic--add-3
        span 照片/视频
*/
$.fn.AddMedia = function (opts) {

  var container = $(this);
  var mediaHtml = container.find('.js-media').html();
  var mediaOneHtml = container.find('.js-media-one').html();
  var maxMedia = 6;
  events();

  function events() {
    addMedia();
  }

  function addMedia() {

    updateMedia();
    container.find('.js-media input[type="file"]').on('change', function () {
      var file = this.files[0];
      var _this = this;
      var reader = new FileReader();
      var replaceImg = $(this).parent().hasClass('uploaded');
      reader.readAsDataURL(file);
      reader.onload = function () {
        if (!replaceImg) {
          if (container.find('.js-media input[type="file"]').length < maxMedia) {
            container.find('.js-media').append(mediaHtml);
            addMedia();
          }
        }
        $(_this).parent().addClass('uploaded');
        $(_this).parent().find('.media-img').remove();
        $(_this).parent().append('<img class="media-img" src="' + this.result + '" alt="" />');
      };
    });
    // 商品类型页面上传单张图片
    container.find('.js-media-one input[type="file"]').on('change', function () {
      clearDisplay();
      var file = this.files[0];
      var _this = this;
      var reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = function () {
        container.find('.js-media-display').append('<div class="ic--mutiply remove-btn"></div><img class="media-img" src="' + this.result + '" alt="" />');
        container.find('.js-media-display').removeClass('hide');
      };
    });

    container.on('click', '.remove-btn', function () {
      clearDisplay();
    });
  }

  function clearDisplay() {
    container.find('.js-media-display').addClass('hide').html('');
  }

  function updateMedia() {
    if (isIOSDevice) {
      container.find('.js-media input[type="file"]').removeAttr("capture");
      container.find('.js-media-one input[type="file"]').removeAttr("capture");
    }
  }

  function isIOSDevice() {
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
    var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    if (isAndroid) {
      return false;
    }
    if (isIOS) {
      return true;
    }
  }
};
'use strict';

$.fn.AddProduct = function (opts) {

  var container = $(this);
  var form = container.find('form');
  var submitBtn = container.find('.js-submit');
  var addNewProductBtn = container.find('.js-add-new-product');
  var promtContainer = container.find('.js-promt-container');
  var categoryContainer = container.find('.js-category-container');
  var promtHtml = container.find('.js-promt-container').html();
  var categoryHtml = container.find('.js-category-container').html();
  var productHtml = container.find('.js-product-container').html();

  events();

  function events() {
    initAll();

    addNewProductBtn.on('click touch', function () {
      if ($('.c-guide__add-product').length < 10) {
        $(productHtml).appendTo(container.find('.js-product-container'));
        initAll();
      } else {
        addNewProductBtn.hide();
      }
    });

    $(document).on('click touch', '.js-collapse-btn', function () {
      $(this).parent('.collapse').toggleClass('active');
    });

    // +-额外优惠
    $(document).on('click touch', '.js-add-promt', function () {
      addPromt();
    });
    $(document).on('click touch', '.js-remove-promt', function () {
      $(this).parents('.js-promt-item').remove();
    });

    // +-商品类别
    $(document).on('click touch', '.js-add-category', function () {
      addCategory();
    });
    $(document).on('click touch', '.js-remove-category', function () {
      $(this).parents('.js-category-item').remove();
      updateCategoryIndex();
    });

    // 删除语言
    $(document).on('click touch', '.js-remove-lang', function () {
      $(this).parents('.js-lang-item').remove();
    });
  }
  function initAll() {
    radioToggle();
    invoiceTypeToggle();
    checkboxToggle();
    removeItem();
    submitBtn.on('click touch', function () {
      $('input[name="period"][value="yes"]').each(function () {
        // 周期预估 输入数量 true
        if ($(this).prop('checked')) {
          $(this).parents('.js-radio-group').find('input[name="period_number"]').prop('required', true);
        } else {
          $(this).parents('.js-radio-group').find('input[name="period_number"]').prop('required', false);
        }
      });

      formValidation();
    });
  }
  function formValidation() {
    form.validate({
      rules: {
        productName: 'required',
        price: 'required'
      },
      messages: {
        productName: '',
        price: ''
      },
      submitHandler: function submitHandler(e) {
        // 临时代码，
        window.location.href = './67.html';
      }
    });
  }
  function radioToggle() {
    container.find('.js-radio-group .js-radio-btn').on('click touch', function () {
      var radio_group = $(this).parents('.js-radio-group');
      radio_group.find('.js-radio-btn').removeClass('active');
      radio_group.find('.js-radio-btn input').prop('checked', false);
      $(this).addClass('active');
      $(this).find('input').prop('checked', true);
    });
  }

  function invoiceTypeToggle() {
    $('.js-invoice-radio-group .js-invoice-radio-btn').on('click touch', function () {
      if (!$(this).hasClass('active')) {
        $(this).parents('.js-invoice-radio-group').find('.js-invoice-radio-btn').toggleClass('active');
      }
    });
  }

  function checkboxToggle() {
    container.find('.js-checkbox').on('click touch', function () {
      $(this).toggleClass('active');
    });
  }

  function removeItem() {
    container.find('.js-remove-btn').on('click touch', function () {
      $(this).parents('.c-guide__add-product__list').remove();
      addNewProductBtn.show();
    });
  }

  function addPromt() {
    $(promtContainer).find('.js-remove-promt').removeClass('hide');
    $(promtContainer).find('.js-add-promt').addClass('hide');
    $(promtHtml).appendTo(promtContainer);
  }

  function addCategory() {
    $(categoryContainer).find('.js-remove-category').removeClass('hide');
    $(categoryContainer).find('.js-add-category').addClass('hide');
    $(categoryHtml).appendTo(categoryContainer);

    updateCategoryIndex();
  }
  function updateCategoryIndex() {
    $('.js-category-item').each(function (i) {
      $(this).attr('data-category-index', i + 1);
      $(this).find('.js-category-index').html(i + 1);
    });
  }
};
'use strict';

$.fn.Business = function (opts) {

  var container = $(this);
  var submitBtn = container.find('.js-submit');
  var form = container.find('form');

  events();

  function events() {
    formValidation();
  }
  function formValidation() {
    submitBtn.on('click touch', function () {
      form.validate({
        rules: {
          locationCountry: 'required',
          locationCity: 'required',
          launchLocation: 'required',
          authorization: 'required'
        },
        messages: {
          locationCountry: '不能为空',
          locationCity: '不能为空',
          launchLocation: '不能为空',
          authorization: '不能为空'

        },
        submitHandler: function submitHandler(e) {
          // 临时代码，
          e.preventDefault();
        }
      });
    });
  }
};
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

$.fn.Chat = function (opts) {

  var container = $(this);
  var insertBtn = container.find('.js-insert-btn');
  var inputPopup = container.find('.js-input-popup');

  events();

  function events() {
    toggleInputPopup();
  }

  function toggleInputPopup() {
    insertBtn.on('click touch', function () {
      var popup = $(this).attr('data-open');
      if ($(this).hasClass('active')) {
        inputPopup.removeClass('active');
        insertBtn.removeClass('active');
      } else {
        insertBtn.removeClass('active');
        $(this).addClass('active');
        inputPopup.removeClass('active');
        $('.js-input-popup[data-popup="' + popup + '"]').addClass('active');
      }
    });
  }
};
'use strict';

$.fn.Checkbox = function (opts) {

  var container = $(this);
  var checkbox = container.find('.js-checkbox');

  events();

  function events() {
    initCheckbox();
  }

  function initCheckbox() {
    checkbox.on('click touch', function () {
      var _value;
      $(this).toggleClass('active');
      _value = $(this).hasClass('active') ? 'selected' : '';
      $(this).find('input').val(_value);
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

$.fn.CompanyInfo = function (opts) {

  var container = $(this);
  var checkbox = container.find('.js-checkbox');

  var projectExperience = container.find('.js-project-experience');

  events();

  function events() {
    if (checkbox.length > 0) {
      initCheckbox();
    }

    if (projectExperience.length > 0) {
      addProjectExperience();
      removeProjectExperience();
    }
  }

  function initCheckbox() {
    checkbox.each(function () {
      $(this).on('click touch', function () {
        resetAllInput();

        $(this).addClass('active');
        $(this).attr('data-checked', 'checked');
        $(this).next().val('checked');
      });
    });
  }

  function resetAllInput() {
    checkbox.each(function () {
      $(this).removeClass('active');
      $(this).attr('data-checked', '');
      $(this).next().val('');
    });
  }

  function addProjectExperience() {
    var html = projectExperience.html();
    $(document).on('click touch', '.js-add', function () {
      if (container.find('.js-add').length < 10) {
        projectExperience.append(html);
      }
    });
  }

  function removeProjectExperience() {
    $(document).on('click touch', '.js-remove-btn', function () {
      $(this).parents('.c-list--item').remove();
      // container.find('.js-remove-btn').on('click touch', function(){
    });
  }
};
'use strict';

$.fn.datePickerRange = function (opts) {

    var container = $(this);
    var datePicker = container.find('.js-ui-datepicker-range');

    events();

    function events() {

        rangePicker();
    }

    function rangePicker() {
        var selectedRange;
        var defaultVal = $(datePicker).val();
        datePicker.datepicker({
            dateFormat: 'yy/mm/dd',
            numberOfMonths: 1,
            onSelect: function onSelect(selectedDate) {
                if (!$(this).data().datepicker.first) {
                    $(this).data().datepicker.inline = true;
                    $(this).data().datepicker.first = selectedDate;
                } else {
                    if (selectedDate > $(this).data().datepicker.first) {
                        $(this).val($(this).data().datepicker.first + " - " + selectedDate);
                    } else {
                        $(this).val(selectedDate + " - " + $(this).data().datepicker.first);
                    }
                    $(this).data().datepicker.inline = false;
                    selectedRange = $(this).val();
                }
            },
            onClose: function onClose() {
                $('.js-date-display').html(selectedRange);
                // $(this).val(defaultVal);
                $('.display-date').addClass('active');
                delete $(this).data().datepicker.first;
                $(this).data().datepicker.inline = false;
            }
        });
    }
};
'use strict';

$.fn.datePicker = function (opts) {

  var container = $(this);

  events();

  function events() {
    YYMMPicker();
  }
  function YYMMPicker() {
    var today = new Date();
    var yearRange = today.getFullYear();
    yearRange = "1950:" + yearRange;
    $('.js-ui-datepicker-yymm').datepicker({
      changeMonth: true,
      changeYear: true,
      dateFormat: 'yy-mm',
      yearRange: yearRange,
      showButtonPanel: true,
      currentText: "当月",
      onChangeMonthYear: function onChangeMonthYear(year, month, inst) {
        $(this).val($.datepicker.formatDate('M yy', new Date(year, month - 1, 1)));
      },
      onClose: function onClose(dateText, inst) {
        var month = $(".ui-datepicker-month :selected").val();
        var year = $(".ui-datepicker-year :selected").val();
        $(this).val($.datepicker.formatDate('M yy', new Date(year, month, 1)));
      }
    }).focus(function () {
      $(".ui-datepicker-calendar").hide();
    });
  }
};
'use strict';

$.fn.DeleteFriends = function (opts) {

  var container = $(this);
  var submitBtn = $(this).find('.js-submit');
  var checkbox = $(this).find('.js-checkbox');
  var deleteGroup = $(this).find('.js-delete-group');

  events();

  function events() {
    initCheckbox();

    submitBtn.on('click touch', function () {
      submitDate();
    });
  }

  function initCheckbox() {
    checkbox.on('click touch', function () {
      var _value;
      $(this).toggleClass('active');
      _value = $(this).hasClass('active') ? 'selected' : '';

      $(this).find('input').val(_value);
      updateSubmitBtn();
      updateDeleteGroup();
    });
  }
  function updateSubmitBtn() {
    var num = 0;
    checkbox.each(function () {
      if ($(this).hasClass('active')) {
        num += 1;
      }
    });

    submitBtn.html('完成 (' + num + ')');
  }

  function updateDeleteGroup() {
    var html = '';
    checkbox.each(function () {
      if ($(this).hasClass('active')) {
        var img = $(this).attr('data-img');
        var name = $(this).attr('data-name');
        html += '<li class="txt--c"><img class="l-w--100p has-corner--50p" src="' + img + '" alt="' + name + '"/></li>';
        // html += '<li class="txt--c"><img class="l-w--100p has-corner--50p" src="' + img + '" alt="' + name + '"/><span>' + name + '</span></li>'
        container.find('.js-delete-group ul').html(html);
      }
    });
    if (container.find('.js-checkbox.active').length > 0) {
      deleteGroup.show();
    } else {
      container.find('.js-delete-group ul').html('');
      deleteGroup.hide();
    }
  }

  function submitDate() {}
};
'use strict';

$(document).ready(function () {

  $(document).Popups();

  $('[data-js-sign-in]').SignIn();
  $('[data-js-sign-in-by-mobile]').SignInByMobile();
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
  // $('[data-js-scan').Scan();
  $('[data-js-add-friends-2]').AddFriends2();

  $('[data-js-switch-control]').SwitchControl();

  $('[data-js-select-friends]').SelectFriends();
  $('[data-js-delete-friends]').DeleteFriends();
  $('[data-js-group-members]').GroupMembers();

  $('[data-js-group-owner]').GroupOwner();

  $('[data-js-setting-user]').SettingUser();

  $('[data-js-product-management]').ProductManagement();

  $('[data-js-publish]').Publish();
  $('[data-js-company-info]').CompanyInfo();

  $('[data-js-product-info]').ProductInfo();

  $('[data-js-chat]').Chat();
  $('[data-js-select-and-count]').SelectAndCount();
  $('[data-js-location]').SelectLocation();
  $('[data-js-get-location]').GetLocation();
  $('[data-js-select-country]').SelectCountry();
  $('[data-js-get-country]').GetCountry();

  $('[data-js-selected]').Selected();
  $('[data-js-add-product]').AddProduct();

  $('[data-js-more-menu]').MoreMenu();
  $('[data-js-favorite]').Favorite();
  $('[data-js-business]').Business();

  $('[data-js-add-media]').AddMedia();
  $('[data-js-upload-file]').UploadFile();
  $('[data-js-checkbox]').Checkbox();
  $('[data-js-radio-box]').RadioBox();

  $('[data-js-get-language]').GetLanguage();
  $('[data-js-select-language]').SelectLanguage();
  $('[data-js-select-language-single]').SelectLanguageSingle();

  $('[data-js-tab-panel]').TabPanel();

  $('[data-js-collapse]').Collapse({
    text: true
  });

  $('[data-js-progress-bar]').ProgressBar();
  $('[data-js-search]').Search();

  $('[data-js-datepicker]').datePicker();
  $('[data-js-datepickerRange]').datePickerRange();

  $('[data-js-spinner]').Spinner();

  // 返回上一页
  $('.js-go-back').on('click touch', function (e) {
    e.preventDefault();
    window.history.go(-1);
  });

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

$.fn.Favorite = function (opts) {

  var container = $(this);
  var favBtn = container.find('.js-fav');

  events();

  function events() {
    toggleFavorite();
  }

  function toggleFavorite() {
    favBtn.on('click', function () {
      $(this).toggleClass('active');
      $(this).find('.ic--fav').toggleClass('active');
    });
  }
};
'use strict';

$.fn.forgetPsw = function (opts) {

  var container = $(this);
  var codeBtn = $(this).find('.js-code');
  var submitBtn = $(this).find('.js-submit');
  var form = $(this).find('.js-forget-psw-form');
  var error = $(this).find('.js-error');
  var popup = $('.js-popup-reset-psw');

  events();

  function events() {
    getCode();
    submit();
    checkInput();
  }
  function checkInput() {
    var inputStatus = false;
    container.find('input').on('keydown', function () {
      var _length = container.find('input').length;
      // console.log(_length);
      for (var i = 0; i < _length; i++) {

        if ($(container.find('input')[i]).val() == '') {

          inputStatus = false;
          break;
        } else {
          inputStatus = true;
        }
      }

      if (inputStatus) {
        updateSubmitBtn();
      }
    });
  }
  function updateSubmitBtn() {

    submitBtn.removeAttr('disabled');
  }
  function getCode() {
    codeBtn.on('click touch', function (e) {
      // e.preventDefult();
      if (!$(this).hasClass('disabled')) {
        if (form.find('input[name="uid"]').val() !== "") {
          var _data = form.serializeJson();
          // console.log(_data);
          var _url = 'http://mib.zengpan.org:8000/forget-psw?';
          var q = form.serializeJson();
          var response = { "status": 203, "message": "有效用户名" };
          q['uid'] = form.find('input[name="uid"]').val();
          q['_response'] = response;
          q['btn'] = "getCAPTCHA"; //按钮
          q = JSON.stringify(q);
          _url = _url + q;
          // console.log(q);

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
                if (_status == 203) {
                  error.hide();
                  getCodeCountDown();
                } else {
                  var _errorHtml;
                  if (_status == 200) {
                    _errorHtml = $('input[name="forget-psw-200"]').val();
                  } else if (_status == 202) {
                    _errorHtml = $('input[name="forget-psw-202"]').val();
                  }

                  error.html(_errorHtml);
                  error.show();
                }
              }
            }
          };
        } else {
          error.html($('input[name="forget-psw-201"]').val());
          error.show();
        }
      }
    });
  }
  function getCodeCountDown() {

    var _time = 60;
    codeBtn.attr('disabled', 'disabled');
    codeBtn.addClass('disabled');

    var countTime = setInterval(function () {
      _time = _time - 1;

      codeBtn.html('重新发送 (' + _time + ')');
      if (_time == 0) {
        clearInterval(countTime);
        codeBtn.html('发送验证码');
        codeBtn.removeAttr('disabled');
        codeBtn.removeClass('disabled');
      }
    }, 1000);
  }

  function submit() {
    submitBtn.on('click touch', function () {
      form.validate({
        rules: {
          uid: 'required',
          secureCode: 'required',
          newPsw: {
            required: true,
            minlength: 6,
            maxlength: 18
          },
          repeatPsw: {
            equalTo: "#newPsw"
          }
        },
        messages: {
          uid: $('input[name="forget-psw-201"]').val(),
          secureCode: $('input[name="forget-psw-210"]').val(),
          newPsw: {
            required: $('input[name="forget-psw-220"]').val(),
            minlength: $('input[name="forget-psw-222"]').val()
          },
          repeatPsw: {
            equalTo: $('input[name="forget-psw-221"]').val()
          }
        },
        submitHandler: function submitHandler() {
          submitData();
        }
      });
    });
  }

  function submitData() {

    var _data = form.serializeJson();
    var _url = 'http://mib.zengpan.org:8000/forget-psw?';
    var q = form.serializeJson();
    console.log(q);
    var response = { "status": 100, "message": "修改成功" };
    q['_response'] = response;
    q = JSON.stringify(q);
    _url = _url + q;
    console.log(q);

    var r = new XMLHttpRequest();
    r.open("GET", encodeURI(_url), true);
    r.onerror = r.onabort = r.ontimeout = function (e) {
      console.log(e);
    };
    r.send();
    r.onreadystatechange = function () {
      console.log('run onreadystatechange');
      if (r.readyState == r.DONE) {
        if (r.status == 200) {
          var _status = $.parseJSON(r.response).status;
          var _msg = $.parseJSON(r.response).message;
          if (_status == 100) {
            error.hide();
            showPopup(popup);
          } else {
            var _errorHtml;
            if (_status == 211) {
              _errorHtml = $('input[name="forget-psw-211"]').val();
            } else if (_status == 200) {
              _errorHtml = $('input[name="forget-psw-200"]').val();
            }

            error.html(_errorHtml);
            error.show();
          }
        }
      }
    };
  }

  function showPopup(ele) {
    var ele = ele;
    ele.show();
    $('.js-popup-cover').show();
  }
};
'use strict';

$.fn.GetCountry = function (opts) {

  var container = $(this);

  events();

  function events() {
    if (location.search.indexOf('country') > 0) {
      var queryString = getQueryString('country');
      container.find('input').val(queryString);
    }
  }

  function getQueryString(key) {
    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
    var result = window.location.search.substr(1).match(reg);
    return result ? decodeURIComponent(result[2]) : null;
  }
};
'use strict';

$.fn.GetLanguage = function (opts) {

  var container = $(this);

  events();

  function events() {

    if (location.search.indexOf('lang') > 0) {
      var queryString = getQueryString('lang');
      container.find('input').val(queryString);
    }
  }
  function getQueryString(key) {
    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
    var result = window.location.search.substr(1).match(reg);
    return result ? decodeURIComponent(result[2]) : null;
  }
};
'use strict';

$.fn.GetLocation = function (opts) {

  var container = $(this);

  events();

  function events() {
    if (location.search.indexOf('loc') > 0) {
      var queryString = getQueryString('loc');
      container.find('input').val(queryString);
    }
  }

  function getQueryString(key) {
    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
    var result = window.location.search.substr(1).match(reg);
    return result ? decodeURIComponent(result[2]) : null;
  }
};
'use strict';

$.fn.GroupMembers = function (opts) {

  var container = $(this);
  var title = $(this).find('.js-title');
  var list = $(this).find('.js-list');

  events();

  function events() {
    updateTitle();
  }

  function updateTitle() {
    var number = list.find('li').length - 1;
    title.html(title.html() + '(' + number + ')');
    // console.log(number);
  }
};
'use strict';

$.fn.GroupOwner = function (opts) {

  var container = $(this);
  var submitBtn = $(this).find('.js-submit');
  var checkbox = $(this).find('.js-checkbox');

  events();

  function events() {
    initCheckbox();

    submitBtn.on('click touch', function () {
      submitDate();
    });
  }

  function initCheckbox() {
    checkbox.on('click touch', function () {
      var _value;
      checkbox.each(function () {
        $(this).removeClass('active');
        $(this).find('input').val('');
      });
      $(this).toggleClass('active');
      // _value = $(this).hasClass('active') ? 'selected' : '';

      $(this).find('input').val('selected');
    });
  }

  function submitDate() {}
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
              var _errorHtml;
              if (_status == 200) {
                _errorHtml = $('input[name="mobile-signin-200"]').val();
              } else if (_status == 201) {
                _errorHtml = $('input[name="mobile-signin-201"]').val();
              } else if (_status == 210) {
                _errorHtml = $('input[name="mobile-signin-210"]').val();
              }
              mobileError.html(_errorHtml);
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

$.fn.MoreMenu = function (opts) {

  var container = $(this);
  var trigger = $(this).find('.js-open-menu');
  var menu = $(this).find('.js-menu-dropdown');

  events();

  function events() {
    trigger.on('click touch', function (e) {
      e.stopPropagation();
      e.preventDefault();
      container.toggleClass('active');
      menu.slideToggle();
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
    // $(document).on('click touch', '.js-open-popup-code', function(e){
    //   e.stopPropagation()

    //   showPopup($('.js-popup-code'));
    // });
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

$.fn.ProductInfo = function (opts) {

  var container = $(this);
  var submitBtn = container.find('.js-submit');
  var form = container.find('form');

  var mediaHtml = container.find('.js-media').html();
  var maxMedia = 6;
  events();

  function events() {
    addMedia();
    formValidation();
    removeMedia();
  }

  function addMedia() {

    updateMedia();
    container.find('.js-media input[type="file"]').on('change', function () {
      var file = this.files[0];
      var _this = this;
      var reader = new FileReader();
      var replaceImg = $(this).parent().hasClass('uploaded');
      reader.readAsDataURL(file);
      reader.onload = function () {
        if (!replaceImg) {
          if (container.find('.js-media input[type="file"]').length < maxMedia) {
            container.find('.js-media').append(mediaHtml);
            addMedia();
          }
        }
        $(_this).parent().addClass('uploaded');
        $(_this).parent().find('.media-img').remove();
        $(_this).parent().append('<img class="media-img" src="' + this.result + '" alt="" />');
      };
    });
  }

  function formValidation() {
    submitBtn.on('click touch', function () {
      form.validate({
        rules: {
          productTitle: 'required',
          productDescription: 'required',
          productProgress: 'required',
          productSize: 'required',
          productLanguage: 'required'
        },
        messages: {
          productTitle: '不能为空',
          productDescription: '不能为空',
          productProgress: '不能为空',
          productSize: '不能为空',
          productLanguage: '不能为空'

        },
        submitHandler: function submitHandler(e) {
          // 临时代码，


        }
      });
    });
  }

  function updateMedia() {
    if (isIOSDevice) {
      container.find('.js-media input[type="file"]').removeAttr("capture");
    }
  }

  function removeMedia() {
    container.on('click touch', '.js-remove-media', function () {
      $(this).parent('.item.uploaded').remove();
    });
  }

  function isIOSDevice() {
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
    var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    if (isAndroid) {
      return false;
    }
    if (isIOS) {
      return true;
    }
  }
};
'use strict';

$.fn.ProductManagement = function (opts) {

  var container = $(this);
  var moreBtn = $(this).find('.js-more');
  var morePopup = $('.js-product-management-more-popup');
  var popupCover = $('.js-cover');

  events();

  function events() {

    moreBtn.each(function () {
      $(this).on('click touch', function () {
        var status = $(this).attr('data-status');
        openPopup(status);
      });
    });

    popupCover.on('click touch', function () {
      closePopup();
    });

    morePopup.find('.js-cancel').on('click touch', function () {
      closePopup();
    });
  }

  function openPopup(status) {
    morePopup.find('a.item').each(function () {
      if ($(this).attr('data-display').indexOf(status) >= 0) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
    morePopup.show();
    popupCover.show();
    // stopBodyScrolling(true);
  }

  function closePopup() {
    morePopup.hide();
    popupCover.hide();
    // stopBodyScrolling(false);
  }

  function stopBodyScrolling(bool) {
    if (bool === true) {
      $('html, body').css('overflow', 'hidden');
      document.body.addEventListener('touchmove', freezeVp, false);
    } else {
      $('html, body').css('overflow', 'initial');
      document.body.removeEventListener('touchmove', freezeVp, false);
    }
  }

  var freezeVp = function freezeVp(e) {
    e.preventDefault();
  };
};
'use strict';

$.fn.ProgressBar = function (opts) {

  var container = $(this);
  var progressBar = $(this).find('.js-progress-bar');
  var progressNumber = $(this).find('.js-progress-number');

  events();

  function events() {
    container.each(function () {
      var num = $(this).find('.js-progress-number').attr('data-number');
      console.log(num);
      $(this).find('.js-progress-bar').css({
        width: num + '%'
      });
    });
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

$.fn.Publish = function (opts) {

  var container = $(this);
  var checkbox = container.find('.js-checkbox');
  var multiCheckbox = container.find('.js-checkbox-multiple');
  var projectExperience = container.find('.js-project-experience');
  var type = container.find('.js-type');
  var selectedTypeLabel = container.find('.js-selected-type');
  var selectedTypeInput = container.find('input[name="type"]');
  var submitBtn = container.find('.js-submit');
  var form = container.find('form');

  events();

  function events() {
    if (checkbox.length > 0) {
      initCheckbox();
    }

    if (multiCheckbox.length > 0) {
      initMultiCheckbox();
    }

    initPublish();
    if (projectExperience.length > 0) {
      addProjectExperience();
      removeProjectExperience();
    }

    if (type.length > 0) {
      selectType();
    }
  }
  function initPublish() {
    var url = location.href;
    var dataArray = [];
    var option1 = false;
    var option2 = false;
    // type selected
    if (url.indexOf('?') >= 0 && url.indexOf('t2') >= 0) {
      var data = location.search.replace('?', '').split('&');
      for (var i = 0; i < data.length; i++) {
        dataArray.push(data[i].split('='));
      }
      selectedTypeLabel.html(decodeURIComponent(dataArray[1][1]));
      selectedTypeInput.val(dataArray[0][1]);
      selectedTypeLabel.removeClass('hide');
      if (dataArray.length >= 4) {
        option1 = dataArray[3][1];
      }
      if (dataArray.length == 5) {
        option2 = dataArray[4][1];
      }

      showContent(dataArray[2][1], option1, option2);
    }
  }
  function showContent(show, option1, option2) {

    var show = show;
    if (show == '1') {
      $('.js-show-game').removeClass('hide');
    } else {
      $('.js-show-other').removeClass('hide');
      if (option1) {
        console.log(option1);
        $('[data-show="' + option1 + '"]').removeClass('hide');
        // switch(option1){
        //   case 'input':
        //     $('.js-option1-input').removeClass('hide');
        //     break;
        //   case 'select':
        //     $('.js-option1-select').removeClass('hide');
        //     break;
        // };
      }
      if (option2) {
        switch (option2) {
          case 'input':
            $('.js-option2-input').removeClass('hide');
            break;
          case 'select':
            $('.js-option2-select').removeClass('hide');
            break;
        }
      }
    }
    $('.js-next').removeClass('hide');
    formVerification();
  }
  function formVerification() {
    if (!$('.js-show-game').hasClass('hide')) {
      submitBtn.unbind('click touch').on('click touch', function () {
        form.validate({
          rules: {
            gameType: 'required',
            gameName: 'required',
            companyName: 'required'
          },
          messages: {
            gameType: '不能为空',
            gameName: '不能为空',
            companyName: '不能为空'
          },
          submitHandler: function submitHandler(e) {
            // 临时代码，
            window.location.href = '/product-info.html';
          }
        });
      });
    } else {
      submitBtn.unbind('click touch').on('click touch', function () {
        form.validate({
          rules: {
            typeOptions: 'required',
            keywordsOptions: 'required'
          },
          messages: {
            typeOptions: '不能为空',
            keywordsOptions: '不能为空'
          },
          submitHandler: function submitHandler(e) {
            // 临时代码，
            window.location.href = '/add-product-detail.html'; //window.location.href='./business.html';
          }
        });
      });
    }
  }
  function selectType() {
    type.find('.js-type-heading').on('click touch', function () {
      var data = $(this).attr('data-category');
      var value = $(this).html();
      var show = $(this).attr('data-show');
      if ($('[data-type-category="' + data + '"]').length > 0) {
        $('[data-type-category="' + data + '"]').stop().slideToggle();
      } else {
        type.removeClass('selected');
        container.find('.js-type-option').removeClass('selected');
        $(this).parent().addClass('selected');
        setVariable(data, value, show);
      }
    });
    type.find('.js-type-option').on('click touch', function (e) {
      var data = $(this).attr('data-type-option');
      var option1 = $(this).attr('data-type-option');
      var option2 = $(this).attr('data-option2');
      var value = $(this).find('span').html();
      var show = $(this).attr('data-show');

      type.removeClass('selected');
      container.find('.js-type-option').removeClass('selected');
      $(this).addClass('selected');
      $(this).parents('.js-type').addClass('selected');
      // console.log(option1);
      setVariable(data, value, show, option1, option2);
    });
  }
  function setVariable(data, value, show, option1, option2) {
    var t2 = data;
    var val = value;
    var url = $('input[name="url"]').val();

    if (option1 && option2) {
      var option1 = option1;
      var option2 = option2;
      url = url + '?t2=' + t2 + '&val=' + val + '&show=' + show + '&option1=' + option1 + '&option2=' + option2;
    } else {
      url = url + '?t2=' + t2 + '&val=' + val + '&show=' + show;
    }

    window.location.href = url;
  }

  function initCheckbox() {
    checkbox.each(function () {
      $(this).on('click touch', function () {
        resetAllInput();

        $(this).addClass('active');
        $(this).attr('data-checked', 'checked');
        $(this).next().val('checked');
      });
    });
  }

  function initMultiCheckbox() {
    multiCheckbox.each(function () {
      $(this).on('click touch', function () {
        var toggleVal = $(this).attr('data-checked') == 'checked' ? '' : 'checked';
        var inputVal = toggleVal == 'checked' ? true : false;

        $(this).toggleClass('active');
        $(this).attr('data-checked', toggleVal);
        $(this).find('input').prop('checked', inputVal);
      });
    });
  }

  function resetAllInput() {
    checkbox.each(function () {
      $(this).removeClass('active');
      $(this).attr('data-checked', '');
      $(this).next().val('');
    });
  }

  function addProjectExperience() {
    var html = projectExperience.html();
    container.find('.js-add').on('click touch', function () {
      if (container.find('.js-add').length < 10) {
        projectExperience.append(html);
      }
    });
  }

  function removeProjectExperience() {
    container.find('.js-remove-btn').on('click touch', function () {
      $(this).parents('.c-list--item').remove();
    });
  }
};
'use strict';

$.fn.RadioBox = function (opts) {

  var container = $(this);
  var checkbox = container.find('.js-checkbox');

  events();

  function events() {
    initCheckbox();
  }

  function initCheckbox() {
    checkbox.on('click touch', function () {
      var _value;
      checkbox.each(function () {
        $(this).removeClass('active');
        $(this).find('input').val('');
      });
      $(this).toggleClass('active');
      // _value = $(this).hasClass('active') ? 'selected' : '';

      $(this).find('input').val('selected');
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
          pwd: {
            required: true,
            minlength: 6

          }
        },
        messages: {
          user: $('input[name="register-230"]').val(),
          email_mobile: $('input[name="register-210"]').val(),
          pwd: {
            required: $('input[name="register-220"]').val(),
            minlength: $('input[name="register-221"]').val()

          }
        },
        submitHandler: function submitHandler(e) {

          var uid = form.find('input[name="email_mobile"]').val();
          registerBtn.attr('disabled');
          $('.js-loading').show();
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
    var response = { "status": 213, "message": "手机号不可用" };
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
        $('.js-loading').hide();
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
            var _errorHtml;
            if (_status == 210) {
              _errorHtml = $('input[name="register-210"]').val();
            } else if (_status == 211) {
              _errorHtml = $('input[name="register-211"]').val();
            } else if (_status == 212) {
              _errorHtml = $('input[name="register-212"]').val();
            } else if (_status == 213) {
              _errorHtml = $('input[name="register-213"]').val();
            } else if (_status == 214) {
              _errorHtml = $('input[name="register-214"]').val();
            } else if (_status == 215) {
              _errorHtml = $('input[name="register-215"]').val();
            } else if (_status == 220) {
              _errorHtml = $('input[name="register-220"]').val();
            } else if (_status == 221) {
              _errorHtml = $('input[name="register-221"]').val();
            } else if (_status == 222) {
              _errorHtml = $('input[name="register-222"]').val();
            } else if (_status == 223) {
              _errorHtml = $('input[name="register-223"]').val();
            } else if (_status == 230) {
              _errorHtml = $('input[name="register-230"]').val();
            } else if (_status == 231) {
              _errorHtml = $('input[name="register-231"]').val();
            } else if (_status == 232) {
              _errorHtml = $('input[name="register-232"]').val();
            } else if (_status == 233) {
              _errorHtml = $('input[name="register-233"]').val();
            }
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
      var response = { "status": 100, "message": "验证成功" };
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
              var _errorHtml;
              if (_status == 200) {
                _errorHtml = $('input[name="register-email-200"]').val();
              }

              emailError.html(_errorHtml);
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
      var response = { "status": 100, "message": "验证成功" };
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
            // console.log(r);
            var _status = $.parseJSON(r.response).status;
            var _msg = $.parseJSON(r.response).message;
            if (_status == 100) {
              mobileError.hide();
              registerSuccess();
            } else {
              var _errorHtml;
              if (_status == 200) {
                _errorHtml = $('input[name="register-mobile-200"]').val();
              }
              mobileError.html(_errorHtml);
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
    setTimeout(function () {
      window.location.href = './index.html';
    }, 5000);
  }
};
// $.fn.resetPsw = function(opts){

//   var container = $(this);

//   var submitBtn = $(this).find('.js-submit');
//   var form = $(this).find('.js-reset-psw-form');
//   var psw1 = $(this).find('.js-input-psw1');
//   var psw2 = $(this).find('.js-input-psw2');
//   var error = $(this).find('.js-error');
//   var popup = $('.js-popup-reset-psw');

//   events();

//   function events(){

//     validateForm();
//   }

//   function validateForm(){
//     submitBtn.on('click', function(e){
//       // e.preventDefault();
//       form.validate({
//         rules: {
//           newPsw: {
//             required: true,
//             minlength: 6,
//             maxlength: 18
//           },
//           repeatPsw: {
//             equalTo: "#newPsw"
//           }
//         },
//         messages: {
//           newPsw: {
//             required: $('input[name="reset-psw-200"]').val(),
//             minlength: $('input[name="reset-psw-221"]').val(),
//             maxlength: $('input[name="reset-psw-222"]').val()
//           },
//           repeatPsw: {
//             equalTo: $('input[name="reset-psw-210"]').val()
//           }
//         },
//         submitHandler: function(e){
//           // submitData();
//           showPopup(popup);
//         }
//       })

//     })
//   }

//   function submitData(){
//     var _data = form.serializeJson();
//     var _url = 'http://mib.zengpan.org:8000/reset-psw?';
//     var q = form.serializeJson();
//     var response = { "status" : 100, "message" : "修改成功" } ;
//     q['_response'] = response;
//     q = JSON.stringify(q);
//     _url = _url + q;   

//     var r = new XMLHttpRequest();
//     r.open("GET", encodeURI(_url), true);
//     r.onerror = r.onabort = r.ontimeout = function(e) { console.log(e); }
//     r.send();
//     r.onreadystatechange = function() {
//       if (r.readyState == r.DONE) {
//         if (r.status == 200) {
//           var _status = $.parseJSON(r.response).status;
//           var _msg = $.parseJSON(r.response).message;
//           if(_status == 300){
//             error.hide();
//             showPopup(popup);
//           }
//           else{
//             var _errorHtml;
//             if(_status == 300){
//               _errorHtml = $('input[name="reset-psw-300"]').val();
//             }
//             else if(_status == 223){
//               _errorHtml = $('input[name="reset-psw-223"]').val();
//             }
//             error.html(_errorHtml);
//             error.show();
//           }

//         }
//       }
//     }
//   }

//   function showPopup(ele){
//     var ele = ele;
//     ele.show();
//     $('.js-popup-cover').show();
//   }

// }
//   
"use strict";
"use strict";

$.fn.Scan = function (opts) {

  var container = $(this);

  events();

  function events() {
    initScan();
  }
  function initScan() {
    var canvas = null,
        context = null,
        video = null;
    window.addEventListener("DOMContentLoaded", function () {
      try {
        canvas = document.getElementById("canvas");
        context = canvas.getContext("2d");
        video = document.getElementById("video");

        var videoObj = { "video": true, audio: false },
            flag = true,
            MediaErr = function MediaErr(error) {
          flag = false;
          if (error.PERMISSION_DENIED) {
            alert('用户拒绝了浏览器请求媒体的权限', '提示');
          } else if (error.NOT_SUPPORTED_ERROR) {
            alert('对不起，您的浏览器不支持拍照功能，请使用其他浏览器', '提示');
          } else if (error.MANDATORY_UNSATISFIED_ERROR) {
            alert('指定的媒体类型未接收到媒体流', '提示');
          } else {
            alert('系统未能获取到摄像头，请确保摄像头已正确安装。或尝试刷新页面，重试', '提示');
          }
        };
        //获取媒体的兼容代码，目前只支持（Firefox,Chrome,Opera）
        if (navigator.getUserMedia) {
          //qq浏览器不支持
          if (navigator.userAgent.indexOf('MQQBrowser') > -1) {
            alert('对不起，您的浏览器不支持拍照功能，请使用其他浏览器', '提示');
            return false;
          }
          navigator.getUserMedia(videoObj, function (stream) {
            video.src = stream;
            video.play();
          }, MediaErr);
        } else if (navigator.webkitGetUserMedia) {
          navigator.webkitGetUserMedia(videoObj, function (stream) {
            video.src = window.webkitURL.createObjectURL(stream);
            video.play();
          }, MediaErr);
        } else if (navigator.mozGetUserMedia) {
          navigator.mozGetUserMedia(videoObj, function (stream) {
            video.src = window.URL.createObjectURL(stream);
            video.play();
          }, MediaErr);
        } else if (navigator.msGetUserMedia) {
          navigator.msGetUserMedia(videoObj, function (stream) {
            $(document).scrollTop($(window).height());
            video.src = window.URL.createObjectURL(stream);
            video.play();
          }, MediaErr);
        } else {
          alert('对不起，您的浏览器不支持拍照功能，请使用其他浏览器');
          return false;
        }
        if (flag) {
          alert('为了获得更准确的测试结果，请尽量将二维码置于框中，然后进行拍摄、扫描。 请确保浏览器有权限使用摄像功能');
        }
        //这个是拍照按钮的事件，          
        // $("#snap").click(function () {startPat();}).show();
      } catch (e) {
        printHtml("浏览器不支持HTML5 CANVAS");
      }
    }, false);
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
'use strict';

$.fn.SelectAndCount = function (opts) {

  var container = $(this);
  var completeBtn = container.find('.js-complete');
  var selections = container.find('.js-selection');

  var btnLabel = completeBtn.html();

  events();

  function events() {
    initSelections();
  }
  function initSelections() {
    selections.on('click touch', function () {
      $(this).toggleClass('active');
      updateCompleteBtn();
    });
  }

  function updateCompleteBtn() {
    var num = container.find('.js-selection.active').length;
    if (num !== 0) {
      completeBtn.html(btnLabel + '(' + num + ')');
    } else {
      completeBtn.html(btnLabel);
    }
  }
};
'use strict';

$.fn.SelectCountry = function (opts) {

  var container = $(this);
  var completeBtn = container.find('.js-complete');
  var selections = container.find('.js-selection');
  var selected = container.find('.js-selected');

  var btnLabel = completeBtn.html();

  events();

  function events() {
    var queryString;
    selections.on('click touch', function () {
      var countryString;

      container.find('.js-selection.active').each(function () {
        if (countryString === undefined) {
          countryString = $(this).find('[data-country]').attr('data-country');
        } else {
          countryString += ', ' + $(this).find('[data-country]').attr('data-country');
        }
      });
      // console.log(encodeURIComponent(langString));
      queryString = 'country=' + countryString;
    });
    completeBtn.on('click touch', function () {
      // 这里返回之前页面并且需要有参数
      window.location.href = "./setting-user.html?" + queryString;
    });
  }
  function getLocation() {}
};
'use strict';

$.fn.SelectFriends = function (opts) {

  var container = $(this);
  var submitBtn = $(this).find('.js-submit');
  var checkbox = $(this).find('.js-checkbox');
  var selectGroup = $(this).find('.js-select-group');

  events();

  function events() {
    initCheckbox();

    submitBtn.on('click touch', function () {
      submitDate();
    });
  }

  function initCheckbox() {
    checkbox.on('click touch', function () {
      var _value;
      $(this).toggleClass('active');
      _value = $(this).hasClass('active') ? 'selected' : '';

      $(this).find('input').val(_value);
      updateSubmitBtn();
      updateSelectGroup();
    });
  }
  function updateSubmitBtn() {
    var num = 0;
    checkbox.each(function () {
      if ($(this).hasClass('active')) {
        num += 1;
      }
    });

    submitBtn.html('完成 (' + num + ')');
  }

  function updateSelectGroup() {
    var html = '';
    checkbox.each(function () {
      if ($(this).hasClass('active')) {
        var img = $(this).attr('data-img');
        var name = $(this).attr('data-name');
        html += '<li class="txt--c"><img class="l-w--100p has-corner--50p" src="' + img + '" alt="' + name + '"/></li>';
        // html += '<li class="txt--c"><img class="l-w--100p has-corner--50p" src="' + img + '" alt="' + name + '"/><span>' + name + '</span></li>'
        container.find('.js-select-group ul').html(html);
      }
    });
    if (container.find('.js-checkbox.active').length > 0) {
      selectGroup.show();
    } else {
      container.find('.js-select-group ul').html('');
      selectGroup.hide();
    }
  }

  function submitDate() {}
};
'use strict';

$.fn.SelectLanguageSingle = function (opts) {

  var container = $(this);
  var completeBtn = container.find('.js-complete');
  var selections = container.find('.js-selection');
  var selected = container.find('.js-selected');

  var btnLabel = completeBtn.html();

  events();

  function events() {
    var queryString;

    selections.on('click touch', function () {
      var lang = $(this).find('c-select-country-language--item--name').html();
      selections.removeClass('active');
      $(this).toggleClass('active');
      selected.find('c-select-country-language--item--name').html(lang);
      selected.removeClass('hide');

      var locString = $(this).find('[data-language]').attr('data-language');

      queryString = 'lang=' + locString;
      // console.log(queryString);
    });

    completeBtn.on('click touch', function () {
      // 这里返回之前页面并且需要有参数
      // window.location.href="./51.html?" + queryString;
      window.location.href = './51.html';
    });

    // 默认选中国
    selections.find('[data-location="简体中文"]').click();
  }
};
'use strict';

$.fn.SelectLanguage = function (opts) {

  var container = $(this);
  var completeBtn = $(this).find('.js-complete');

  var selections = container.find('.js-selection');

  events();

  function events() {
    var queryString;
    selections.on('click touch', function () {
      var langString;

      container.find('.js-selection.active').each(function () {
        if (langString === undefined) {
          langString = $(this).find('[data-language]').attr('data-language');
        } else {
          langString += ', ' + $(this).find('[data-language]').attr('data-language');
        }
      });
      // console.log(encodeURIComponent(langString));
      queryString = 'lang=' + langString;
    });
    completeBtn.on('click touch', function () {
      // 这里返回之前页面并且需要有参数
      window.location.href = "./setting-user.html?" + queryString;
    });
  }
};
'use strict';

$.fn.SelectLocation = function (opts) {

  var container = $(this);
  var completeBtn = container.find('.js-complete');
  var selections = container.find('.js-selection');
  var selected = container.find('.js-selected');

  var btnLabel = completeBtn.html();

  events();

  function events() {
    var queryString;

    selections.on('click touch', function () {
      var countryName = $(this).find('.c-location--item--name').html();
      selections.removeClass('active');
      $(this).toggleClass('active');
      selected.find('.c-location--item--name').html(countryName);
      selected.removeClass('hide');

      var locString = $(this).find('[data-location]').attr('data-location');

      queryString = 'loc=' + locString;
      console.log(queryString);
    });

    completeBtn.on('click touch', function () {
      // 这里返回之前页面并且需要有参数
      window.location.href = "./setting-user.html?" + queryString;
    });

    // 默认选中国
    selections.find('[data-location="中国"]').click();
  }
  function getLocation() {}
};
'use strict';

$.fn.Selected = function (opts) {

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
      slidesToShow: 5,
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

$.fn.SettingUser = function (opts) {

  var container = $(this);
  var fileInput = container.find('.js-input-file');
  var DOBInput = container.find('.js-birthday');
  var astroInput = container.find('.js-astro');

  events();

  function events() {
    updateUserPic();

    // 星座
    updateAstro();
  }

  function updateUserPic() {
    if (isIOSDevice) {
      fileInput.removeAttr("capture");
    }
  }

  function isIOSDevice() {
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
    var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    if (isAndroid) {
      return false;
    }
    if (isIOS) {
      return true;
    }
  }

  function updateAstro() {
    var today = new Date();
    var year = today.getFullYear();
    year = "1950:" + year;

    // console.log(currentYear);
    DOBInput.datepicker({
      changeMonth: true,
      changeYear: true,
      yearRange: year
    });

    DOBInput.on('change', function () {
      var DOB = new Date($(this).val());
      var month = DOB.getMonth() + 1;
      var date = DOB.getDate();
      astroInput.html(getAstro(month, date));
    });
  }

  function getAstro(month, date) {
    var AstroName = "摩羯座水瓶座双鱼座白羊座金牛座双子座巨蟹座狮子座处女座天秤座天蝎座射手座魔羯座";
    var dateArr = [20, 19, 21, 21, 21, 22, 23, 23, 23, 23, 22, 22];
    return AstroName.substr(month * 3 - (date < dateArr[month] ? 3 : 0), 3);
  }
};
'use strict';

$.fn.SignInByMobile = function (opts) {

  var signInSubmitBtn = $(this).find('.js-open-popup-code');

  var form = $(this).find('.js-form');
  var error = form.find('.js-error');
  // var 


  events();

  function events() {
    signInSubmitBtn.on('click touch', function () {
      form.validate({
        rules: {
          uid: 'required'
        },
        messages: {
          uid: $('input[name="mobile-signin-201"]').val()
        },
        submitHandler: function submitHandler(e) {
          showPopup($('.js-popup-code'));
        }
      });
    });
  }

  function showPopup(ele) {
    var ele = ele;
    ele.show();
    $('.js-popup-cover').show();
  }
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
          user: $('input[name="signin-200"]').val(),
          pwd: $('input[name="signin-202"]').val()
        },
        submitHandler: function submitHandler() {
          submitForm();
        }
      });
    });
  }

  function submitForm() {
    var _data = form.serializeJson();
    var _url = 'http://mib.zengpan.org:8000/signin?';
    var q = form.serializeJson();
    var response = { "status": 100, "message": "登陆成功" };
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
            var _errorHtml;
            if (_status == 200) {
              _errorHtml = $('input[name="signin-200"]').val();
            } else if (_status == 201) {
              _errorHtml = $('input[name="signin-201"]').val();
            } else if (_status == 202) {
              _errorHtml = $('input[name="signin-202"]').val();
            }
            error.html(_errorHtml);
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

$.fn.Spinner = function (opts) {

  var container = $(this);
  var upBtn = container.find('.js-spinner-up');
  var downBtn = container.find('.js-spinner-down');
  var inputBox = container.find('.js-spinner-input');
  var max = 999;
  var min = 0;

  events();

  function events() {
    var spinnerNum = 0;
    upBtn.on('click touch', function () {
      if (spinnerNum < max) {
        spinnerNum++;
      }
      updateNum(spinnerNum);
    });

    downBtn.on('click touch', function () {
      if (spinnerNum > min) {
        spinnerNum--;
      }
      updateNum(spinnerNum);
    });
  }
  function updateNum(num) {
    inputBox.val(num);
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

$.fn.SwitchControl = function (opts) {

  var container = $(this);
  var checkbox = $(this).find('.js-checkbox');

  events();

  function events() {
    checkbox.on('click touch', function (e) {
      // e.preventDefault();
      // e.stopPropagation();

      $(this).toggleClass('checked');
    });
  }
};
'use strict';

$.fn.TabPanel = function (opts) {

  var container = $(this);
  var tabMenu = $(this).find('.js-tab-menu');
  var tabPanel = $(this).find('.js-tab-panel');

  events();

  function events() {
    tabMenu.on('click touch', function (e) {
      e.stopPropagation();
      var index = $(this).attr('data-tab-index');
      tabMenu.removeClass('active');
      tabPanel.removeClass('active');
      $(this).addClass('active');
      container.find('.js-tab-panel[data-panel-index=' + index + ']').addClass('active');
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
'use strict';

// 上传文件

$.fn.UploadFile = function (opts) {

  var container = $(this);
  var uploadBtn = container.find('.js-upload-file-btn');
  var displayFile = container.find('.js-display-file');
  events();

  function events() {
    uploadFile();
  }

  function uploadFile() {
    updateMedia();

    // 商品类型页面上传单张图片
    uploadBtn.find('input').on('change', function () {
      var _this = $(this);
      // clearDisplay();
      var file = this.files[0];
      var _this = $(this);
      var reader = new FileReader();
      // console.log(file);
      reader.readAsDataURL(file);

      reader.onload = function () {
        displayFile.html(file.name);
      };
    });
  }

  function clearDisplay() {
    displayFile.html('');
  }

  function updateMedia() {
    if (isIOSDevice) {
      uploadBtn.find('input').removeAttr("capture");
    }
  }

  function isIOSDevice() {
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
    var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    if (isAndroid) {
      return false;
    }
    if (isIOS) {
      return true;
    }
  }
};