$.fn.Publish = function(opts){

  var container = $(this);
  var checkbox = container.find('.js-checkbox');
  var projectExperience = container.find('.js-project-experience');

 
  
  events();

  function events(){
    initCheckbox();
    if(projectExperience.length > 0){
      addProjectExperience();
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
    $(document).on('click', '.js-project-experience .js-add', function(){
      $('.js-project-experience .js-add').removeClass('js-add').hide();
      projectExperience.append(html);
    })
  }


}
  