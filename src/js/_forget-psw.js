$.fn.forgetPsw = function(opts){

  var container = $(this);
  var codeBtn = $(this).find('.js-code');
  var submitBtn = $(this).find('.js-submit');
  var form = $(this).find('.js-forget-psw-form');
  var error = $(this).find('.js-error');
  var popup = $('.js-popup-reset-psw');

 
  
  events();

  function events(){
    getCode();
    submit();
    checkInput();
  }
  function checkInput(){
    var inputStatus = false;
    container.find('input').on('keydown', function(){
      var _length = container.find('input').length;
      // console.log(_length);
      for (var i = 0; i < _length; i++){

        if ($(container.find('input')[i]).val() == ''){

           inputStatus = false;
           break;
        }
        else{
          inputStatus = true;
        }
      }

      if(inputStatus){
        updateSubmitBtn();
      }
    })
  }
  function updateSubmitBtn(){

    submitBtn.removeAttr('disabled');
  
  }
  function getCode(){
    codeBtn.on('click touch', function(e){
      // e.preventDefult();
      if(!$(this).hasClass('disabled')){
        if(form.find('input[name="uid"]').val() !== ""){
          var _data = form.serializeJson();
          // console.log(_data);
          var _url = 'http://mib.zengpan.org:8000/forget-psw?';
          var q = form.serializeJson();
          var response = { "status" : 203, "message" : "有效用户名" } ;
          q['uid'] = form.find('input[name="uid"]').val();
          q['_response'] = response;
          q['btn'] = "getCAPTCHA"; //按钮
          q = JSON.stringify(q);
          _url = _url + q;
          // console.log(q);

          var r = new XMLHttpRequest();
          r.open("GET", encodeURI(_url), true);
          r.onerror = r.onabort = r.ontimeout = function(e) { console.log(e); }
          r.send();
          r.onreadystatechange = function() {
            if (r.readyState == r.DONE) {
              if (r.status == 200) {
                var _status = $.parseJSON(r.response).status;
                var _msg = $.parseJSON(r.response).message;
                if(_status == 203){
                  error.hide();
                  getCodeCountDown();
                }
                else{
                  var _errorHtml;
                  if(_status == 200){
                    _errorHtml = $('input[name="forget-psw-200"]').val();
                  }
                  else if(_status == 202){
                    _errorHtml = $('input[name="forget-psw-202"]').val();
                  }
                  
                  error.html(_errorHtml);
                  error.show();
                }
                
              }
            }
          }
        }
        else{
          error.html($('input[name="forget-psw-201"]').val());
          error.show();
        }
      }


    })
  }
  function getCodeCountDown(){

    var _time = 60;
    codeBtn.attr('disabled','disabled');
    codeBtn.addClass('disabled');

    var countTime = setInterval(function(){
      _time = _time - 1;

      codeBtn.html('重新发送 (' + _time +')');
      if(_time == 0){
        clearInterval(countTime);
        codeBtn.html('发送验证码');
        codeBtn.removeAttr('disabled');
        codeBtn.removeClass('disabled');
      }
    }, 1000)

  }

  function submit(){
    submitBtn.on('click touch', function(){
      form.validate({
        rules: {
          uid: 'required',
          secureCode: 'required',
          newPsw: {
            required: true,
            minlength: 6,
            maxlength: 18
          },
          repeatPsw: {
            equalTo: "#newPsw"
          }
        },
        messages: {
          uid: $('input[name="forget-psw-201"]').val(),
          secureCode: $('input[name="forget-psw-210"]').val(),
          newPsw: {
            required: $('input[name="forget-psw-220"]').val(),
            minlength: $('input[name="forget-psw-222"]').val(),
            maxlength: $('input[name="forget-psw-223"]').val()
          },
          repeatPsw: {
            equalTo: $('input[name="forget-psw-221"]').val()
          }
        },
        submitHandler: function(){
          submitData();
          
        }
      })

      
    })
  }

  function submitData(){

    var _data = form.serializeJson();
    var _url = 'http://mib.zengpan.org:8000/forget-psw?';
    var q = form.serializeJson();
    console.log(q);
    var response = { "status" : 100, "message" : "修改成功" } ;
    q['_response'] = response;
    q = JSON.stringify(q);
    _url = _url + q;   
    console.log(q);

    var r = new XMLHttpRequest();
    r.open("GET", encodeURI(_url), true);
    r.onerror = r.onabort = r.ontimeout = function(e) { console.log(e); }
    r.send();
    r.onreadystatechange = function() {
      console.log('run onreadystatechange' );
      if (r.readyState == r.DONE) {
        if (r.status == 200) {
          var _status = $.parseJSON(r.response).status;
          var _msg = $.parseJSON(r.response).message;
          if(_status == 100){
            error.hide();
            showPopup(popup);
          }
          else{
            var _errorHtml;
            if(_status == 211){
              _errorHtml = $('input[name="forget-psw-211"]').val();
            }
            else if(_status == 200){
              _errorHtml = $('input[name="forget-psw-200"]').val();
            }
            else if(_status == 224){
              _errorHtml = $('input[name="forget-psw-224"]').val();
            }
            error.html(_errorHtml);
            error.show();
          }
          
        }
      }
    }
  }

  function showPopup(ele){
    var ele = ele;
    ele.show();
    $('.js-popup-cover').show();
  }

}
  