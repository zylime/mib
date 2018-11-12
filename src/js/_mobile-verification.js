$.fn.MobileVerification = function(){
  var number = $(this).find('.js-mobile-number');
  var verifyMobilePopupContainer = $('.js-popup-code');
  var mobileForm = verifyMobilePopupContainer.find('.js-popup-code-form');
  var mobileVerifyBtn = verifyMobilePopupContainer.find('.js-popup-code-submit');
  var mobileError = verifyMobilePopupContainer.find('.js-error');
  events();
  function events(){
    checkMobileVerification();
  }
  function checkMobileVerification(){
    mobileVerifyBtn.on('click touch', function(){
      var _code = '';
       
      verifyMobilePopupContainer.find('input[name="phone"]').val(number.val());
      verifyMobilePopupContainer.find('input.js-code').each(function(){
        _code += $(this).val().toString();
      });
      verifyMobilePopupContainer.find('input[name="code"]').val(_code);


      var _data = mobileForm.serializeJson();
      var _url = 'http://mib.zengpan.org:8000/register?';
      var q = mobileForm.serializeJson();
      var response = { "status" : 100, "message" : "success" } ;
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
              mobileError.hide();
              window.location.href='./index.html';
            }
            else{
              mobileError.html(_msg);
              mobileError.show();
              
            }
            
          }
        }
      }


      // email
      // $.ajax({
      //   type: 'POST',
      //   dataType: 'JSON',
      //   url: _url,
      //   data: _data,
      //   success: function(response){
      //     if(response == 100){
      //       mobileError.hide();
      //       registerSuccess();
      //     }
      //     else{
      //       mobileError.html(response.message);
      //       mobileError.show();
      //     }
      //   },
      //   error: function(error){
      //     console.log(error);
      //   }
      // })
    }) 
  }

}