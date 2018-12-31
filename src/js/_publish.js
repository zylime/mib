$.fn.Publish = function(opts){

  var container = $(this);
  var checkbox = container.find('.js-checkbox');
  var projectExperience = container.find('.js-project-experience');
  var type = container.find('.js-type');

 
  
  events();

  function events(){
    initCheckbox();
    if(projectExperience.length > 0){
      addProjectExperience();
    }
    if(type.length > 0){
      selectType();
    }
    
  }

  function selectType(){
    type.find('.js-type-heading').on('click touch', function(){
      var data = $(this).attr('data-category');
      if($('[data-type-category="' + data + '"]').length > 0){
        $('[data-type-category="' + data + '"]').stop().slideToggle();
      }
      else{
        type.removeClass('selected');
        container.find('.js-type-option').removeClass('selected');
        $(this).parent().addClass('selected');
        updateData(data);
      }
      
    });
    type.find('.js-type-option').on('click touch', function(e){
      // e.stopPropagation();
      var data = $(this).attr('data-type-option');
      console.log(data);
      type.removeClass('selected');
      container.find('.js-type-option').removeClass('selected');
      $(this).addClass('selected');
      $(this).parents('.js-type').addClass('selected');
      updateData(data);
    })

  }
  function updateData(data){
    container.find('input[name="type"]').val(data);
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
    container.find('.js-add').on('click touch', function(){
      projectExperience.append(html);
    })
  }


}
  