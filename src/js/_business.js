$.fn.Business = function(opts){

  var container = $(this);
  var submitBtn = container.find('.js-submit');
  var form = container.find('form');

 

 
  
  events();

  function events(){
    formValidation();
    
  }
  function formValidation(){
    submitBtn.on('click touch', function(){
      form.validate({
        rules:{
          locationCountry:'required',
          locationCity: 'required',
          launchLocation: 'required',
          authorization: 'required'
        },
        messages:{
          locationCountry: '不能为空',
          locationCity: '不能为空',
          launchLocation: '不能为空',
          authorization: '不能为空'

        },
        submitHandler: function(e){
          // 临时代码，
          e.preventDefault();

        }
      });
    })
  }

 

  
}
  