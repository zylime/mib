$.fn.forgetPsw = function(opts){

  var container = $(this);
  var codeBtn = $(this).find('.js-code');
  var submitBtn = $(this).find('.js-submit');
  var form = $(this).find('.js-forget-psw-form');
  var error = $(this).find('.js-error');

 
  
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
    codeBtn.on('click touch', function(){
      form.validate({
        rules: {
          uid: 'required'
        },
        messages: {
          uid: $('input[name="forget-psw-500"]').val()
        },
        submitHandler: function(e){

          var _data = form.serializeJson();
          var _url = 'http://mib.zengpan.org:8000/forget-psw?';
          var q = form.serializeJson();
          var response = { "status" : 100, "message" : "有效用户名" } ;
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
                  getCodeCountDown();
                }
                else{
                  var _errorHtml;
                  if(_status == 200){
                    _errorHtml = $('input[name="forget-psw-200"]').val();
                  }
                  
                  error.html(_errorHtml);
                  error.show();
                }
                
              }
            }
          }
        }
      });

    })
  }
  function getCodeCountDown(){

    var _time = 60;
    codeBtn.attr('disabled','disabled');

    var countTime = setInterval(function(){
      _time = _time - 1;

      codeBtn.html('重新发送 (' + _time +')');
      if(_time == 0){
        clearInterval(countTime);
        codeBtn.html('发送验证码');
        codeBtn.removeAttr('disabled');
      }
    }, 1000)

  }

  function submit(){
    submitBtn.on('click touch', function(){
      form.validate({
        rules: {
          uid: 'required',
          secureCode: 'required'
        },
        messages: {
          uid: $('input[name="forget-psw-500"]').val(),
          secureCode: $('input[name="forget-psw-600"]').val()
        },
        submitHandler: function(e){
          submitData();
        }
      })
      
    })
  }

  function submitData(){
    var _data = form.serializeJson();
    var _url = 'http://mib.zengpan.org:8000/forget-psw?';
    var q = form.serializeJson();
    var response = { "status" : 300, "message" : "验证成功" } ;
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
          if(_status == 300){
            error.hide();
            window.location.href='./reset-psw.html';
          }
          else{
            var _errorHtml;
            if(_status == 400){
              _errorHtml = $('input[name="forget-psw-400"]').val();
            }
            error.html(_errorHtml);
            error.show();
          }
          
        }
      }
    }
  }

}
  