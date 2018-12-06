$.fn.MoreMenu = function(opts){

  var container = $(this);
  var trigger = $(this).find('.js-open-menu');
  var menu = $(this).find('.js-menu-dropdown');


 
  
  events();

  function events(){
    trigger.on('click touch', function(e){
      e.stopPropagation();
      e.preventDefault();
      container.toggleClass('active');
      menu.slideToggle();
    })
   }

}
  