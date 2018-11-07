$.fn.resetPsw = function(opts){

  var container = $(this);

  var submitBtn = $(this).find('.js-submit');
  var form = $(this).find('.js-reset-psw-form');
  var psw1 = $(this).find('.js-input-psw1');
  var psw2 = $(this).find('.js-input-psw2');
  var warning = $(this).find('.js-warning');

  events();

  function events(){

    submit();
  }

  function submit(){
    submitBtn.on('click', function(e){
      e.preventDefault();
      var _psw1 = psw1.val();
      var _psw2 = psw2.val();
      // console.log(_psw1);
      // console.log(_psw2);
      if(_psw1 == '' || _psw2 == ''){
        warning.html('请输入密码');
        warning.show();
      }
      else{
        if(_psw1 !== _psw2){
          warning.html('密码不匹配');
          warning.show();
        }
        else{
          warning.hide();
          var _data = form.serialize();
          var _url = '';
          console.log(_data);
          /*form submit*/
          $.ajax({
            type: 'POST',
            dataType: 'text',
            url: _url,
            data: _data,
            success: function(msg){

            }
          })
        }
      }
    })
  }

}
  