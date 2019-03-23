$.fn.ProductInfo = function(opts){

  var container = $(this);
  var submitBtn = container.find('.js-submit');
  var form = container.find('form');
 

 
  var mediaHtml = container.find('.js-media').html();
  var maxMedia = 6;
  events();

  function events(){
    addMedia();
    formValidation();
  }

  function addMedia(){
    
    updateMedia();
    container.find('.js-media input[type="file"]').on('change', function(){
      var file = this.files[0];
      var _this = this;
      var reader = new FileReader(); 
      var replaceImg = $(this).parent().hasClass('uploaded');
      reader.readAsDataURL(file); 
      reader.onload = function(){
        if(!replaceImg){
          if(container.find('.js-media input[type="file"]').length < maxMedia){
            container.find('.js-media').append(mediaHtml);
            addMedia();
          }
          
        }  
        $(_this).parent().addClass('uploaded');
        $(_this).parent().find('.media-img').remove();
        $(_this).parent().append('<img class="media-img" src="' + this.result + '" alt="" />'); 

      }

    })
  }

  function formValidation(){
    submitBtn.on('click touch', function(){
      form.validate({
        rules:{
          productTitle:'required',
          productDescription: 'required',
          productProgress: 'required',
          productSize: 'required',
          productLanguage: 'required',
        },
        messages:{
          productTitle: '不能为空',
          productDescription: '不能为空',
          productProgress: '不能为空',
          productSize: '不能为空',
          productLanguage: '不能为空'

        },
        submitHandler: function(e){
          // 临时代码，
          

        }
      });
    })
  }



  function updateMedia(){
    if(isIOSDevice){
      container.find('.js-media input[type="file"]').removeAttr("capture");
    }
    
  }

  function isIOSDevice(){
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; 
    var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    if (isAndroid) {
      return false;
    }
    if (isIOS) {
      return true;
    }
  }



}
  