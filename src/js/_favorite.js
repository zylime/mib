$.fn.Favorite = function(opts){

  var container = $(this);
  var favBtn = container.find('.js-fav');

 

 
  
  events();

  function events(){
    toggleFavorite();
    
  }

  function toggleFavorite(){
    favBtn.on('click', function(){
      $(this).toggleClass('active');
      $(this).find('.ic--fav').toggleClass('active');
    })
  }
 

  
}
  