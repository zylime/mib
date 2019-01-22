/*
(data-js-add-media)
  .l-flex.c-product-info--form--media.js-media
    .item
      input.input-file.js-input-file(type="file", name="", accept="image/*" capture="camera")
      .item--content.js-add-media
        .ic--add-3
        span 照片/视频
*/
$.fn.AddMedia = function(opts){

  var container = $(this);
  var mediaHtml = container.find('.js-media').html();
  var maxMedia = 6;
  events();

  function events(){
    addMedia();
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
  