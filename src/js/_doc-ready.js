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

  $('[data-js-publish]').Publish();

  $('[data-js-product-info]').ProductInfo();

  $('[data-js-chat]').Chat();
  $('[data-js-select-and-count]').SelectAndCount();
  $('[data-js-location]').SelectLocation();

  $('[data-js-selected]').Selected();


  $('[data-js-more-menu]').MoreMenu();
  $('[data-js-favorite]').Favorite();


  $('[data-js-add-media]').AddMedia();
  $('[data-js-checkbox]').Checkbox();
  $('[data-js-radio-box]').RadioBox();

 




  $('[data-js-tab-panel]').TabPanel();
  
  $('[data-js-collapse]').Collapse({
    text: true
  });

  $('[data-js-search]').Search();
  
  // lightbox on store
  lightbox.option({
    'resizeDuration': 200,
    'wrapAround': true
  })
});

// $(window).onload(function(){
//   $('[data-js-sign-in]').SignIn();
// })