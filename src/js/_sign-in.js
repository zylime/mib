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
      var _data = form.serializeJson();
      
      var _url = 'http://mib.zengpan.org:8000/register?';
      _data['_response'] = 100;
      _data = JSON.stringify(_data);
      _url = _url + _data;   
  
      /*form submit*/
      $.ajax({
        type: 'POST',
        dataType: 'JSON',
        url: _url,
        data: _data,
        success: function(response){
          if(response == 100){
            console.log(response);
            window.location.href='./index.html';
          }
          else{
            console.log(response);
          }
          

        },
        error: function(error){
          console.log(error);
        }
      })
    })
  }

}
  