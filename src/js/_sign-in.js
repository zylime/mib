$.fn.SignIn = function(opts){

  var container = $(this);
  var form = $(this).find('.js-sign-in-form');
  var dropdownContainer = $(this).find('.js-dropdown-body')
  var removeBtn = $(this).find('.js-dropdown-body .js-remove');
  var dropdownBtn = $(this).find('.js-dropdown-btn');
  var signInSubmitBtn = $(this).find('.js-sign-in-submit');
  var error = form.find('.js-error');
  // var 

 
  
  events();

  function events(){
    toggleDropdown();
    dropdown();
    selectFromList();
    formValidation();

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

  function formValidation(){
    signInSubmitBtn.on('click touch', function(e){
      form.validate({
        rules: {
          user: 'required',
          pwd: 'required'
        },
        messages: {
          user: '请输入用户名',
          pwd: '请输入密码'
        },
        submitHandler: function(){
          submitForm()
        }
      });

    })
  }

  function submitForm(){
    var _data = form.serializeJson();
    var _url = 'http://mib.zengpan.org:8000/signin?';
    var q = form.serializeJson();
    var response = { "status" : 100, "message" : "登陆成功" } ;
    q['_response'] = response;
    q = JSON.stringify(q);
    _url = _url + q;   

    var r = new XMLHttpRequest();
    r.open("GET", encodeURI(_url), true);
    r.onerror = r.onabort = r.ontimeout = function(e) { console.log(e); }
    r.send();
    r.onreadystatechange = function() {
      if (r.readyState == r.DONE) {
        if (r.status == 200) {
          var _status = $.parseJSON(r.response).status;
          var _msg = $.parseJSON(r.response).message;
          if(_status == 100){
            error.hide();
            window.location.href='./index.html';
          }
          else{
            var _errorHtml;
            if(_status == 200){
              _errorHtml = $('input[name="signin-200"]').val();
            }
            else if(_status == 201){
              _errorHtml = $('input[name="signin-201"]').val();
            }
            error.html(_errorHtml);
            error.show();
          }
          
        }
      }
    }

    // $.ajax({
    //   type: 'POST',
    //   dataType: 'JSON',
    //   url: _url,
    //   data: _data,
    //   success: function(response){
    //     if(response == 100){
    //       error.hide();
    //       window.location.href='./index.html';

    //     }
    //     else{
    //       error.html(response.message);
    //       error.show();
    //     }
        

    //   },
    //   error: function(error){
    //     console.log(error);
    //   }
    // })
  }

}
  