$.fn.AddProduct = function(opts){

  var container = $(this);
  var form = container.find('form');
  var submitBtn = container.find('.js-submit');
  var addNewProductBtn = container.find('.js-add-new-product');

  var productHtml = container.find('.js-product-container').html();

  
  events();

  function events(){
    initAll();
    
    addNewProductBtn.on('click touch', function(){
      $(productHtml).appendTo(container.find('.js-product-container'));
      initAll();
    })
    
  }
  function initAll(){
    radioToggle();
    checkboxToggle();
    submitBtn.on('click touch', function(){
      $('input[name="period"][value="yes"]').each(function(){
        // 周期预估 输入数量 true
        if($(this).prop('checked')){
          $(this).parents('.js-radio-group').find('input[name="period_number"]').prop('required',true);
        }
        else{
          $(this).parents('.js-radio-group').find('input[name="period_number"]').prop('required',false);
        }
      })
      
    
      formValidation();
    });
  }
  function formValidation(){
    form.validate({
      rules:{
        productName:'required',
        price: 'required'
      },
      messages:{
        productName: '',
        price: ''
      },
      submitHandler: function(e){
        // 临时代码，
        window.location.href='./67.html';
        

      }
    });
  }
  function radioToggle(){
     container.find('.js-radio-group .js-radio-btn').on('click touch', function(){
       var radio_group = $(this).parents('.js-radio-group');
       radio_group.find('.js-radio-btn').removeClass('active');
       radio_group.find('.js-radio-btn input').prop('checked', false);
       $(this).addClass('active');
       $(this).find('input').prop('checked', true);
     })
  }

  function checkboxToggle(){
    container.find('.js-checkbox').on('click touch', function(){
      $(this).toggleClass('active');
 

    })
  }


 

}
  