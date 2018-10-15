$.fn.PrePay = function(opts){

  var container = $(this);
  var _checkbox = $(this).find('.js-checkbox');
 
  
  events();

  function events(){
    checkbox()
  }

  function checkbox(){
    _checkbox.on('click touch', function(){
      // console.log($(this).attr('data-checked') == '');
      var checkStatus = $(this).attr('data-checked') == '' ? 'checked' : '';
      $(this).toggleClass('active');
      $(this).attr('data-checked', checkStatus);
      $(this).prev().val(checkStatus);
    })
  }

}
  