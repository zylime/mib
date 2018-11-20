$.fn.TabPanel = function(opts){

  var container = $(this);
  var tabMenu = $(this).find('.js-tab-menu');
  var tabPanel = $(this).find('.js-tab-panel')

 
  
  events();

  function events(){
    tabMenu.on('click touch', function(e){
      e.stopPropagation();
      var index = $(this).attr('data-tab-index');
      tabMenu.removeClass('active');
      tabPanel.removeClass('active');
      $(this).addClass('active');
      container.find('.js-tab-panel[data-panel-index=' + index +']').addClass('active');

    })
   }

}
  