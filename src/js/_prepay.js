$.fn.PrePay = function(opts){

  var container = $(this);
  var _checkbox = $(this).find('.js-checkbox');
  var _priceItems = $(this).find('.js-price');
  var _totalPrice = $(this).find('.js-total');
  var _currencySymbol = '¥';
  
  events();

  function events(){
    checkbox();
    calcPrice();
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

  function calcPrice(){
    var _price = 0;
    _priceItems.each(function(){
      var _itemPrice = parseInt($(this).attr('data-price'));

      _price += _itemPrice;
      // console.log('itemprice: ' + _itemPrice + '; total: '+_price);

    });
    _price = Number(_price).toFixed(2);
    _totalPrice.attr('data-price', _price).html(_currencySymbol + _price);

  }

}
  