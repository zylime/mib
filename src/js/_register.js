$.fn.Register = function(opts){

  var container = $(this);
  var _checkbox = $(this).find('.js-checkbox');
 
  
  events();

  function events(){
    checkbox()
  }

  function checkbox(){
    _checkbox.on('click touch', function(){
      $(this).toggleClass('checked');
    })
  }

}
  