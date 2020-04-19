$.fn.Invoice = function(opts){

  var container = $(this);
  var resetInputBtn = container.find('.js-clear');
  var invoiceTypeBtn = container.find('.js-invoice-type .type');
  var typeInput = container.find('.js-invoice-type .type-input');
  var deleteComBtn = container.find('.js-delete');
  var invoiceBtn = container.find('.js-invoice-btn');

 
  
  events();

  function events(){
    
    resetInputBtn.on('click touch', function(){
      $(this).prev().val('');
    })

    invoiceTypeBtn.on('click touch', function(){
      var n;
      invoiceTypeBtn.toggleClass('active');
      typeInput.removeClass('active');
      n = container.find('.js-invoice-type .type.active').data('tab');
      container.find('.js-invoice-type .type-input[data-tab-panel='+n+']').addClass('active');

    })

    deleteComBtn.on('click touch', function(){
      $(this).parent().remove();
    });

    invoiceBtn.on('click touch', function(){
      $(this).toggleClass('active');
    })



 
  
  }





}