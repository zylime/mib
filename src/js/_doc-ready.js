$(document).ready(function(){


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

  // 返回上一页
  $('.js-go-back').on('click touch', function(e){
    e.preventDefault();
    window.history.go(-1);
  })
  
  // lightbox on store
  lightbox.option({
    'resizeDuration': 200,
    'wrapAround': true
  });

  
});

// $(window).onload(function(){
//   $('[data-js-sign-in]').SignIn();
// })