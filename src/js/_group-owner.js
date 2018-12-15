$.fn.GroupOwner = function(opts){

  var container = $(this);
  var submitBtn = $(this).find('.js-submit');
  var checkbox = $(this).find('.js-checkbox');



 
  
  events();

  function events(){
    initCheckbox();

    submitBtn.on('click touch', function(){
      submitDate();
    })
    
  }

  function initCheckbox(){
    checkbox.on('click touch', function(){
      var _value;
      checkbox.each(function(){
        $(this).removeClass('active');
        $(this).find('input').val('');
      })
      $(this).toggleClass('active');
      // _value = $(this).hasClass('active') ? 'selected' : '';

      $(this).find('input').val('selected');
     
     
    })
  }
 

  function submitDate(){

  }

}
  