// 上传文件

$.fn.UploadFile = function(opts){

  var container = $(this);
  var uploadBtn = container.find('.js-upload-file-btn');
  var displayFile = container.find('.js-display-file');
  events();

  function events(){
    uploadFile();
  }

  function uploadFile(){
    updateMedia();
    
    // 商品类型页面上传单张图片
    uploadBtn.find('input').on('change', function(){
      var _this = $(this);
      // clearDisplay();
      var file = this.files[0];
      var _this = $(this);
      var reader = new FileReader();
      // console.log(file);
      reader.readAsDataURL(file); 
     
      reader.onload = function(){
        displayFile.html(file.name);
      }
    })



  }




  function clearDisplay(){
    displayFile.html('');
  }



  function updateMedia(){
    if(isIOSDevice){
      uploadBtn.find('input').removeAttr("capture");
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
  