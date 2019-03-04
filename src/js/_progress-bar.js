$.fn.ProgressBar = function(opts){

  var container = $(this);
  var progressBar = $(this).find('.js-progress-bar');
  var progressNumber = $(this).find('.js-progress-number');


  events();

  function events(){
    container.each(function(){
      var num = $(this).find('.js-progress-number').attr('data-number');
      console.log(num);
      $(this).find('.js-progress-bar').css({
        width: num + '%'
      })
    })
    
  }

}
  