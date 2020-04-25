$.fn.SelectLanguage = function(opts){

  var container = $(this);
  var completeBtn = $(this).find('.js-complete');

  var selections = container.find('.js-selection');
  
  
  events();

  function events(){
    var queryString;
    selections.on('click touch', function(){
      var langString;
      
      container.find('.js-selection.active').each(function(){
        if(langString === undefined){
          langString = $(this).find('[data-language]').attr('data-language');
        }
        else{
          langString += ', ' + $(this).find('[data-language]').attr('data-language')
        }
      })
      // console.log(encodeURIComponent(langString));
      queryString = 'lang=' + langString;

    })
    completeBtn.on('click touch', function(){
      // 这里返回之前页面并且需要有参数
      // window.location.href="./setting-user.html?" + queryString;
      window.history.go(-1);
    })
    
  }




}
  