$.fn.PaymentMethod = function(opts){

  var container = $(this);
  var _checkbox = $(this).find('.js-checkbox');
 
  
  events();

  function events(){
    checkbox()
  }

  function checkbox(){
    _checkbox.each(function(){
      $(this).on('click touch', function(){
        resetAllInput();
        
        $(this).addClass('active');
        $(this).attr('data-checked', 'checked');
        $(this).prev().val('checked');
      })
    })


      
      

  }
  function resetAllInput(){
    _checkbox.each(function(){
      $(this).attr('data-checked','').removeClass('active');
      $(this).prev().val('');

    })
  }

}
  