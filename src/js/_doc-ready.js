$(document).ready(function(){
  slider();

  $(document).Popups();

  $('[data-js-register]').Register();
  $('[data-js-order-detail]').OrderDetail();
  $('[data-js-prepay]').PrePay();
  $('[data-js-payment-method]').PaymentMethod();




  function slider(){
    $('.js-categories-slider').slick({
      dots: false,
      infinite: false,
      slidesToShow: 4,
      arrows: false
    })
  }
  
  $('[data-js-collapse]').Collapse({
    text: true
  });
  $('[data-js-carousel').Carousel();
  $('[data-js-search]').Search();
  
  // lightbox on store
  lightbox.option({
    'resizeDuration': 200,
    'wrapAround': true
  })

  // datepicker on order detail
  // $('.js-datepicker').dateRangePicker({
  //   language:'cn'
  // });




  

  

});