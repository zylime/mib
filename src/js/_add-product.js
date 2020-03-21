$.fn.AddProduct = function(opts){

  var container = $(this);
  var form = container.find('form');
  var submitBtn = container.find('.js-submit');
  var addNewProductBtn = container.find('.js-add-new-product');
  var promtContainer = container.find('.js-promt-container');
  var categoryContainer = container.find('.js-category-container');
  var promtHtml = container.find('.js-promt-container').html();
  var categoryHtml = container.find('.js-category-container').html();
  var productHtml = container.find('.js-product-container').html();

  
  events();

  function events(){
    initAll();
    
    addNewProductBtn.on('click touch', function(){
      if($('.c-guide__add-product').length<10){
        $(productHtml).appendTo(container.find('.js-product-container'));
        initAll();
      }
      else{
        addNewProductBtn.hide();
      }
      
    })

    $(document).on('click touch', '.js-collapse-btn', function(){
      $(this).parent('.collapse').toggleClass('active');
    })
    // +-额外优惠
    $(document).on('click touch','.js-add-promt', function(){
      addPromt();
    })
    $(document).on('click touch','.js-remove-promt', function(){
      $(this).parents('.js-promt-item').remove();
    })

    // +-商品类别
    $(document).on('click touch','.js-add-category', function(){
      addCategory();
    })
    $(document).on('click touch','.js-remove-category', function(){
      $(this).parents('.js-category-item').remove();
    })
    
    
  }
  function initAll(){
    radioToggle();
    invoiceTypeToggle();
    checkboxToggle();
    removeItem();
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

  function invoiceTypeToggle(){
    $('.js-invoice-radio-group .js-invoice-radio-btn').on('click touch', function(){
      if(!$(this).hasClass('active')){
        $(this).parents('.js-invoice-radio-group').find('.js-invoice-radio-btn').toggleClass('active');
      }
    })
  }

  function checkboxToggle(){
    container.find('.js-checkbox').on('click touch', function(){
      $(this).toggleClass('active');
 

    })
  }

  function removeItem(){
    container.find('.js-remove-btn').on('click touch', function(){
      $(this).parents('.c-guide__add-product__list').remove();
      addNewProductBtn.show();
    })
  }

  function addPromt(){
    $(promtContainer).find('.js-remove-promt').removeClass('hide');
    $(promtContainer).find('.js-add-promt').addClass('hide');
    $(promtHtml).appendTo(promtContainer);
  }

  function addCategory(){
    $(categoryContainer).find('.js-remove-category').removeClass('hide');
    $(categoryContainer).find('.js-add-category').addClass('hide');
    $(categoryHtml).appendTo(categoryContainer);
  }

 

}
  