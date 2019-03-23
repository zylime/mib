$.fn.Checkbox = function(opts){

  var container = $(this);
  var checkbox = container.find('.js-checkbox');



 
  
  events();

  function events(){
    initCheckbox();    
  }

  function initCheckbox(){
    checkbox.on('click touch', function(){
      var _value;
      $(this).toggleClass('active');
      _value = $(this).hasClass('active') ? 'selected' : '';
      $(this).find('input').val(_value);
     
    })
  }
 

}
  