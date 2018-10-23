$.fn.TogglePsw = function(opts){

  var _input = $(this).find('.js-psw-input');
  var _eye = $(this).find('.js-psw-eye');

 
  
  events();

  function events(){
    _eye.on('click touch', function(){
      var _type = _input.attr('type') == 'password' ? 'text' : 'password';
      
      _eye.toggleClass('close');
      _input.attr('type', _type);

    })
   }

}
  