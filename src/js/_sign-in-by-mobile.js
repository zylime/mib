$.fn.SignInByMobile = function(opts){

  var signInSubmitBtn = $(this).find('.js-open-popup-code');
  
  var form = $(this).find('.js-form');
  var error = form.find('.js-error');
  // var 

 
  
  events();

  function events(){
    signInSubmitBtn.on('click touch', function(){
      form.validate({
        rules: {
          uid: 'required'
        },
        messages:{
          uid: $('input[name="mobile-signin-201"]').val()
        },
        submitHandler: function(e){
          showPopup($('.js-popup-code'));
        }
      })
    })

  }

  function showPopup(ele){
    var ele = ele;
    ele.show();
    $('.js-popup-cover').show();
  }



}
  