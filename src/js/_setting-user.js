$.fn.SettingUser = function(opts){

  var container = $(this);
  var fileInput = container.find('.js-input-file');

 
  
  events();

  function events(){
    updateUserPic();
  }

  function updateUserPic(){
    if(isIOSDevice){
      fileInput.removeAttr("capture");
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
  