$.fn.SignIn = function(opts){

  var container = $(this);
  var form = $(this).find('.js-sign-in-form');
  var dropdownContainer = $(this).find('.js-dropdown-body')
  var removeBtn = $(this).find('.js-dropdown-body .js-remove');
  var dropdownBtn = $(this).find('.js-dropdown-btn');
  var signInSubmitBtn = $(this).find('.js-sign-in-submit');
  // var 

 
  
  events();

  function events(){
    toggleDropdown();
    dropdown();
    selectFromList();
    formSubmit();

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

  function formSubmit(){
    signInSubmitBtn.on('click touch', function(e){
      e.preventDefault();
      var _data = form.serialize();
      var _url = './json/signin.json';
      
      /*form submit*/
      $.ajax({
        type: 'GET',
        dataType: 'json',
        url: _url,
        data: _data,
        success: function(response){
          if(response.code == 100){
            console.log(response.message);
            window.location.href='./index.html';
          }
          else{
            console.log(response.message);
          }
          

        },
        error: function(error){
          console.log(error);
        }
      })
    })
  }

}
  