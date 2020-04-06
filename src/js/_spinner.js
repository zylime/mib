$.fn.Spinner = function(opts){

  var container = $(this);
  var upBtn = container.find('.js-spinner-up');
  var downBtn = container.find('.js-spinner-down');
  var inputBox = container.find('.js-spinner-input');
  const max = 999;
  const min = 0;



 
  
  events();

  function events(){
    var spinnerNum = 0
    upBtn.on('click touch', function(){
      if(spinnerNum<max){
        spinnerNum++
      }
      updateNum(spinnerNum);
    }) 

    downBtn.on('click touch', function(){
      if(spinnerNum>min){
        spinnerNum--
      }
      updateNum(spinnerNum);
    })
  
  }
  function updateNum(num){
    inputBox.val(num);
  }



}