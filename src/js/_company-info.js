$.fn.CompanyInfo = function(opts){

  var container = $(this);
  var checkbox = container.find('.js-checkbox');

  var projectExperience = container.find('.js-project-experience');
 


  
  events();

  function events(){
    if(checkbox.length > 0){
      initCheckbox();
    }

 

    if(projectExperience.length > 0){
      addProjectExperience();
      removeProjectExperience();
    }


    
  }
  

  


  function initCheckbox(){
    checkbox.each(function(){
      $(this).on('click touch', function(){
        resetAllInput();
        
        $(this).addClass('active');
        $(this).attr('data-checked', 'checked');
        $(this).next().val('checked');
      })
    })
  }

  function resetAllInput(){
    checkbox.each(function(){
      $(this).removeClass('active');
      $(this).attr('data-checked', '');
      $(this).next().val('');
    })
  }




  function addProjectExperience(){
    var html = projectExperience.html();
    $(document).on('click touch', '.js-add', function(){
      if(container.find('.js-add').length<10){
        projectExperience.append(html);
      }
    })
  
  }

  function removeProjectExperience(){
    $(document).on('click touch', '.js-remove-btn', function(){
      $(this).parents('.c-list--item').remove();
    // container.find('.js-remove-btn').on('click touch', function(){
      
    })
  }


}
  