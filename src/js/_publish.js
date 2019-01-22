$.fn.Publish = function(opts){

  var container = $(this);
  var checkbox = container.find('.js-checkbox');
  var projectExperience = container.find('.js-project-experience');
  var type = container.find('.js-type');
  var selectedTypeLabel = container.find('.js-selected-type');
  var selectedTypeInput = container.find('input[name="type"]');

 
  
  events();

  function events(){
    if(checkbox.length > 0){
      initCheckbox();
    }
    

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
    var option1 = false;
    var option2 = false;
    // type selected
    if(url.indexOf('?') >=0 && url.indexOf('t2')){
      var data = location.search.replace('?', '').split('&');
      for(var i = 0; i <data.length; i++){
        dataArray.push(data[i].split('='));
      }
      selectedTypeLabel.html(decodeURIComponent(dataArray[1][1]));
      selectedTypeInput.val(dataArray[0][1]);
      selectedTypeLabel.removeClass('hide');
      if(dataArray.length >= 4){
        option1 = dataArray[3][1];
        
      }
      if(dataArray.length == 5){
        option2 = dataArray[4][1];
      }
      
      showContent(dataArray[2][1], option1, option2);
    }


  }
  function showContent(show, option1, option2){
    // console.log(data);
    console.log("option1: " + option1);
    console.log(option2);
    var show = show;
    if(show == '1'){
      $('.js-show-game').removeClass('hide');
    }
    else{
      $('.js-show-other').removeClass('hide');
      if(option1){
        switch(option1){
          case 'input':
            $('.js-option1-input').removeClass('hide');
            break;
          case 'select':
            $('.js-option1-select').removeClass('hide');
            break;
        };
      }
      if(option2){
        switch(option2){
          case 'input':
            $('.js-option2-input').removeClass('hide');
            break;
          case 'select':
            $('.js-option2-select').removeClass('hide');
            break;
        }
      }
      
    }
    $('.js-next').removeClass('hide');

  }
  function selectType(){
    type.find('.js-type-heading').on('click touch', function(){
      var data = $(this).attr('data-category');
      var value = $(this).html();
      var show = $(this).attr('data-show');
      if($('[data-type-category="' + data + '"]').length > 0){
        $('[data-type-category="' + data + '"]').stop().slideToggle();
      }
      else{
        type.removeClass('selected');
        container.find('.js-type-option').removeClass('selected');
        $(this).parent().addClass('selected');
        setVariable(data, value, show);
      }
      
    });
    type.find('.js-type-option').on('click touch', function(e){
      var data = $(this).attr('data-type-option');
      var option1 = $(this).attr('data-option1');
      var option2 = $(this).attr('data-option2');
      var value = $(this).find('span').html();
      var show = $(this).attr('data-show');

      type.removeClass('selected');
      container.find('.js-type-option').removeClass('selected');
      $(this).addClass('selected');
      $(this).parents('.js-type').addClass('selected');
      // console.log(option1);
      setVariable(data, value, show, option1, option2);
    })

  }
  function setVariable(data, value, show, option1, option2){
    var t2 = data;
    var val = value;
    var url = $('input[name="url"]').val();

    if(option1 && option2){
      var option1 = option1;
      var option2 = option2;
      url = url + '?t2=' + t2 + '&val=' + val + '&show=' + show + '&option1=' + option1 + '&option2=' + option2;
    }
    else{
      url = url + '?t2=' + t2 + '&val=' + val + '&show=' + show;
    }

    
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
  