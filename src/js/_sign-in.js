$.fn.SignIn = function(opts){

  var container = $(this);
  var dropdownContainer = $(this).find('.js-dropdown-body')
  var removeBtn = $(this).find('.js-dropdown-body .js-remove');
  var dropdownBtn = $(this).find('.js-dropdown-btn');
  // var 

 
  
  events();

  function events(){
    toggleDropdown();
    dropdown();
    selectFromList();

  }
  function toggleDropdown(){
    dropdownBtn.on('click touch', function(){
      if(!dropdownContainer.find('li').length == 0){
        dropdownContainer.slideToggle();
      }
    });
    $(document).on('click touch', function(e){
      e.stopPropagation();
      if($(e.target).parents('.c-sign-in--form').length <= 0 ){
        dropdownContainer.slideUp();
      }
      
    })
  }
  function dropdown(){
    removeBtn.each(function(){
      $(this).on('click touch', function(e){
        $(this).parents('li').remove();
        checkList();
      })
    })
    
  }
  function checkList(){
    if(dropdownContainer.find('li').length == 0){
      dropdownContainer.slideToggle();
    }
  }
  function selectFromList(){
    dropdownContainer.find('span').on('click touch', function(){
      var _val = $(this).html();
      dropdownContainer.siblings('input').val(_val);
    })
  }

}
  