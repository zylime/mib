$.fn.OrderDetail = function(opts){


  var _checkbox = $(this).find('.js-order-detail-checkbox');
  var _userInfo= $(this).find('.js-user-info p');
  var _inputUserName = $(this).find('.js-user-info input[name="userName"]');
  var _inputUserId = $(this).find('.js-user-info input[name="userId"]');
  var _updateUserBtn = $(this).find('.js-user-info .js-btn');

 
  
  events();

  function events(){
    toggleCheckbox();
    updateUserInfo();
    datePicker();
  }

  function toggleCheckbox(){
    _checkbox.on('click touch', function(){
      var _value = $(this).attr('data-value') == '' ? 'checked' : '';
      // console.log($(this).attr('data-value') == '');
      $(this).toggleClass('active');
      $(this).attr('data-value', _value);
      $(this).next().val(_value);

    })
  }

  function updateUserInfo(){
    var label = _updateUserBtn.html() == '更改' ? '完成' : '更改';
    syncUserInfo();
    
    _updateUserBtn.on('click touch', function(){
      _inputUserName.toggle();
      _inputUserId.toggle();
      _userInfo.toggle();
      syncUserInfo();
    });

  }

  function syncUserInfo(){
    var _html = _inputUserName.val() + ' ' + _inputUserId.val();
    _userInfo.html(_html);
  }

  function datePicker(){
    // console.log($('.js-datepicker').length);
    if($('.js-datepicker').length > 0){
      $('.js-datepicker').dateRangePicker({
        language:'cn'
      });
    }
    

  }
  

 

}
  