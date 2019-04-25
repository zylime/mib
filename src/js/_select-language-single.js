$.fn.SelectLanguageSingle = function(opts){

  var container = $(this);
  var completeBtn = container.find('.js-complete');
  var selections = container.find('.js-selection');
  var selected = container.find('.js-selected');

  const btnLabel = completeBtn.html();

 
  
  events();

  function events(){
    var queryString;

    selections.on('click touch', function(){
      var lang = $(this).find('c-select-country-language--item--name').html();
      selections.removeClass('active');
      $(this).toggleClass('active');
      selected.find('c-select-country-language--item--name').html(lang);
      selected.removeClass('hide');

      var locString = $(this).find('[data-language]').attr('data-language');
      
      queryString = 'lang=' + locString;
      // console.log(queryString);

    })

    completeBtn.on('click touch', function(){
      // 这里返回之前页面并且需要有参数
      // window.location.href="./51.html?" + queryString;
      window.location.href='./51.html';
    });

    // 默认选中国
    selections.find('[data-location="简体中文"]').click();
    
    
  }


  
}
  