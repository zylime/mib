$(document).ready(function(){
  slider();
  historyEllipsis();
  $(document).Popups();

  $('[data-js-register]').Register();
  $('[data-js-order-detail]').OrderDetail();
  $('[data-js-prepay]').PrePay();




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
  
  // lightbox on store
  lightbox.option({
    'resizeDuration': 200,
    'wrapAround': true
  })

  // datepicker on order detail
  $('.js-datepicker').dateRangePicker({
    language:'cn'
  });




  function historyEllipsis(){
    var defHeight = 52 * 3; //3 lines of search history
    var slideHeight = $('.js-history-list').height();
    var toggleHeight;
    var label;
    // init history height
    if(defHeight < slideHeight){
      label = '更多';
      $('.js-history-view-more').html(label);
      $('.js-history-view-more').removeClass('hide');
      toggleHeight = slideHeight;
      
    }
    // toggle height
    $('.js-history-view-more').on('click', function(){
      $('.js-history-box').animate({
        'height': toggleHeight + 'px'
      });
      
      toggleHeight = toggleHeight == defHeight? slideHeight : defHeight;
      label = label == '更多' ? '收起' : '更多';
      $('.js-history-view-more').html(label);
    })
  }

  

});