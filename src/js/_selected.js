
$.fn.Selected = function(opts){

  var sliderContainer = $(this).find('.js-categories-slider');
  var favoriteIcons = $(this).find('.js-favorite');


 
  
  events();

  function events(){
    slider();
    // getData();
    toggleFavorite();
   }

  function slider(){
    sliderContainer.slick({
      dots: false,
      infinite: false,
      slidesToShow: 5,
      arrows: false
    })
  }
  // function getData(){
  //   var 
  // }
  function toggleFavorite(){
    favoriteIcons.each(function(){
      $(this).on('click touch', function(e){
        e.preventDefault();
        e.stopPropagation();
        $(this).toggleClass('active');
      })
    })
  }

}
  