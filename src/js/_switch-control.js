$.fn.SwitchControl = function(opts){

  var container = $(this);
  var checkbox = $(this).find('.js-checkbox');
 
  
  events();

  function events(){
    checkbox.on('click touch', function(e){
      // e.preventDefault();
      // e.stopPropagation();

      $(this).toggleClass('checked')
    })
  }



}
  