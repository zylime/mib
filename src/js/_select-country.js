$.fn.SelectCountry = function(opts){

  var container = $(this);
  var completeBtn = container.find('.js-complete');
  var selections = container.find('.js-selection');
  var selected = container.find('.js-selected');

  const btnLabel = completeBtn.html();

 
  
  events();

  function events(){
    var queryString;
    selections.on('click touch', function(){
      var countryString;
      
      container.find('.js-selection.active').each(function(){
        if(countryString === undefined){
          countryString = $(this).find('[data-country]').attr('data-country');
        }
        else{
          countryString += ', ' + $(this).find('[data-country]').attr('data-country')
        }
      })
      // console.log(encodeURIComponent(langString));
      queryString = 'country=' + countryString;

    })
    completeBtn.on('click touch', function(){
      // 这里返回之前页面并且需要有参数
      window.location.href="./setting-user.html?" + queryString;
    })
    
    
  }
  function getLocation(){


  }

  
}
  