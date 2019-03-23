$.fn.SettingUser = function(opts){

  var container = $(this);
  var fileInput = container.find('.js-input-file');
  var DOBInput = container.find('.js-birthday');
  var astroInput = container.find('.js-astro');
 
  
  events();

  function events(){
    updateUserPic();

    // 星座
    updateAstro();
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

  function updateAstro(){
    var today = new Date();
    var year = today.getFullYear();
    year = "1950:" + year;

    // console.log(currentYear);
    DOBInput.datepicker({
      changeMonth: true,
      changeYear: true,
      yearRange: year
    });

    DOBInput.on('change', function(){
      var DOB = new Date($(this).val());
      var month = DOB.getMonth() + 1;
      var date = DOB.getDate();
      astroInput.html(getAstro(month, date));
  
    })
  }

  function getAstro(month, date){
    var AstroName = "摩羯座水瓶座双鱼座白羊座金牛座双子座巨蟹座狮子座处女座天秤座天蝎座射手座魔羯座";
    var dateArr = [20,19,21,21,21,22,23,23,23,23,22,22];
    return AstroName.substr(month*3 - (date < dateArr[month] ? 3:0), 3);
  }

}
  