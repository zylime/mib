$.fn.DeleteFriends = function(opts){

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
      $(this).toggleClass('active');
      _value = $(this).hasClass('active') ? 'selected' : '';

      $(this).find('input').val(_value);
      updateSubmitBtn();
    })
  }
  function updateSubmitBtn(){
    var num = 0;
    checkbox.each(function(){
      if($(this).hasClass('active')){
        num +=1;
      }
    })

    submitBtn.html('完成 ('+ num +')');
  }

  function submitDate(){

  }

}
  