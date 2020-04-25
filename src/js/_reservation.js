$.fn.Reservation = function(opts){

  var container = $(this);


 
  
  events();

  function events(){
    $('.js-checkbox').on('click touch', function(){
      setTimeout(function(){
        var level = $('.js-checkbox.active.level .style-top').html();
        var lang = $('.js-checkbox.active.language-list').html();
        $('.js-level').html(level);
        $('.js-lang').html(lang);
      })
      
    })
    
    
  }


  
}
  