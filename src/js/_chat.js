$.fn.Chat = function(opts){

  var container = $(this);
  var insertBtn = container.find('.js-insert-btn');
  var inputPopup = container.find('.js-input-popup');
 

 
  
  events();

  function events(){
    toggleInputPopup();
    
  }

  function toggleInputPopup(){
    insertBtn.on('click touch', function(){
      var popup = $(this).attr('data-open');
      if($(this).hasClass('active')){
        inputPopup.removeClass('active');
        insertBtn.removeClass('active');
      }
      else{
        insertBtn.removeClass('active');
        $(this).addClass('active');
        inputPopup.removeClass('active');
        $('.js-input-popup[data-popup="' + popup + '"]').addClass('active');
      }
      
    })
  }

  
}
  