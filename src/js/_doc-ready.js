$(document).ready(function(){


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

  $('[data-js-switch-control]').SwitchControl();
  $('[data-js-delete-friends]').DeleteFriends();

 




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