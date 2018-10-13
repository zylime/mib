$.fn.Carousel = function(opts){

  var container = $(this);

 
  
  events();

  function events(){
    // var _this = this;
    container.slick({
      infinite: true,
      arrows: false,
      dots: false
    });
   }

}
  