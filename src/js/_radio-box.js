$.fn.RadioBox = function(opts){

  var container = $(this);
  var checkbox = container.find('.js-checkbox');



 
  
  events();

  function events(){
    initCheckbox();    
  }

  function initCheckbox(){
    checkbox.on('click touch', function(){
      var _value;
      $(this).parents('[data-js-radio-box]').find('.js-checkbox').each(function(){
        $(this).removeClass('active');
        $(this).find('input').val('');
      })
      $(this).toggleClass('active');
      // _value = $(this).hasClass('active') ? 'selected' : '';

      $(this).find('input').val('selected');
     
     
    })
  }
 

}
  