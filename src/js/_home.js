$.fn.Home = function(opts){

  var sliderContainer = $(this).find('.js-categories-slider');


 
  
  events();

  function events(){
    slider();
   }

  function slider(){
    sliderContainer.slick({
      dots: false,
      infinite: false,
      slidesToShow: 4,
      arrows: false
    })
  }

}
  