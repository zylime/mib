$.fn.SelectAndCount = function(opts){

  var container = $(this);
  var completeBtn = container.find('.js-complete');
  var selections = container.find('.js-selection');

  const btnLabel = completeBtn.html();

 
  
  events();

  function events(){
    initSelections();
    
  }
  function initSelections(){
    selections.on('click touch', function(){
      $(this).toggleClass('active');
      updateCompleteBtn();
    })
  }

  function updateCompleteBtn(){
    var num = container.find('.js-selection.active').length;
    if(num !== 0){
      completeBtn.html(btnLabel + '(' + num + ')');
    }
    else{
      completeBtn.html(btnLabel);
    }
    
  }


  
}
  