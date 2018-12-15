$.fn.GroupMembers = function(opts){

  var container = $(this);
  var title = $(this).find('.js-title');
  var list = $(this).find('.js-list');



 
  
  events();

  function events(){
    updateTitle();
    
  }

  function updateTitle(){
    var number = list.find('li').length - 1;
    title.html(title.html() + '(' + number + ')');
    // console.log(number);
  }
 

 

}
  