$.fn.Publish = function(opts){

  var container = $(this);
  var checkbox = container.find('.js-checkbox');
  var projectExperience = container.find('.js-project-experience');
  var type = container.find('.js-type');
  var selectedTypeLabel = container.find('.js-selected-type');
  var selectedTypeInput = container.find('input[name="type"]');

 
  
  events();

  function events(){
    initCheckbox();

    initPublish();
    if(projectExperience.length > 0){
      addProjectExperience();
    }

    if(type.length > 0){
      selectType();
    }
    
  }
  function initPublish(){
    var url = location.href;
    var dataArray = [];
    // type selected
    if(url.indexOf('?') >=0 && url.indexOf('t2')){
      var data = location.search.replace('?', '').split('&');
      for(var i = 0; i <data.length; i++){
        dataArray.push(data[i].split('='));
      }
      selectedTypeLabel.html(decodeURIComponent(dataArray[1][1]));
      selectedTypeInput.val(dataArray[0][1]);
      selectedTypeLabel.removeClass('hide');
      showContent(dataArray[2][1]);


    }


  }
  function showContent(data){
    // console.log(data);
    var show = data;
    if(show == '1'){
      $('.js-show-game').removeClass('hide');
    }
    else{
      $('.js-show-other').removeClass('hide');
    }
    $('.js-next').removeClass('hide');

  }
  function selectType(){
    type.find('.js-type-heading').on('click touch', function(){
      var data = $(this).attr('data-category');
      if($('[data-type-category="' + data + '"]').length > 0){
        $('[data-type-category="' + data + '"]').stop().slideToggle();
      }
      /* remove */
      // else{
      //   type.removeClass('selected');
      //   container.find('.js-type-option').removeClass('selected');
      //   $(this).parent().addClass('selected');
      //   setVariable(data);
      // }
      
    });
    type.find('.js-type-option').on('click touch', function(e){
      var data = $(this).attr('data-type-option');
      var value = $(this).find('span').html();
      var show = $(this).attr('data-show');

      type.removeClass('selected');
      container.find('.js-type-option').removeClass('selected');
      $(this).addClass('selected');
      $(this).parents('.js-type').addClass('selected');
      setVariable(data, value, show);
    })

  }
  function setVariable(data, value, show){
    // container.find('input[name="type"]').val(data);
    var t2 = data;
    var val = value;
    var url = $('input[name="url"]').val();
    
    url = url + '?t2=' + t2 + '&val=' + val + '&show=' + show;
    window.location.href = url;

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
  