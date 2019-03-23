$.fn.GetLanguage = function(opts){

  var container = $(this);
  
  events();

  function events(){

    if(location.search.indexOf('lang')>0){
      var queryString = getQueryString('lang');
      container.find('input').val(queryString);
    }
    
   
    
  }
  function getQueryString(key){
    var reg = new RegExp("(^|&)"+key+"=([^&]*)(&|$)");
    var result = window.location.search.substr(1).match(reg);
    return result?decodeURIComponent(result[2]):null;
  }
}
  