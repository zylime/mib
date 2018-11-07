$.fn.forgetPsw = function(opts){

  var container = $(this);
  var codeBtn = $(this).find('.js-code');
  var submitBtn = $(this).find('.js-submit');
  var form = $(this).find('.js-forget-psw-form');

 
  
  events();

  function events(){
    getCode();
    submit();
  }

  function getCode(){
    codeBtn.on('click touch', function(){
      if(!$(this).hasClass('disabled')){
        var _time = 60;
        var _this = this;
        $(this).addClass('disabled');

        var countTime = setInterval(function(){
          _time = _time - 1;

          $(_this).html('重新发送 (' + _time +')');
          if(_time == 0){
            clearInterval(countTime);
            $(_this).html('发送验证码');
            $(_this).removeClass('disabled');
          }
        }, 1000)
      }
      

    })
  }

  function submit(){
    submitBtn.on('click touch', function(){
      var _data = form.serialize();
      var _url = '';

      /*form submit*/
      $.ajax({
        type: 'POST',
        dataType: 'text',
        url: _url,
        data: _data,
        success: function(msg){

        }
      })
    })
  }

}
  