$.fn.SelectLocation = function(opts){

  var container = $(this);
  var completeBtn = container.find('.js-complete');
  var selections = container.find('.js-selection');
  var selected = container.find('.js-selected');

  const btnLabel = completeBtn.html();

 
  
  events();

  function events(){
    initSelections();
    
    
  }
  function getLocation(){


  }
  function initSelections(){
    selections.on('click touch', function(){
      var countryName = $(this).find('.c-location--item--name').html();
      selections.removeClass('active');
      $(this).toggleClass('active');
      selected.find('.c-location--item--name').html(countryName);
      selected.removeClass('hide');

    })
  }
  
}
  