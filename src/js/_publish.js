$.fn.Publish = function(opts){

  var container = $(this);
  var checkbox = container.find('.js-checkbox');
  var multiCheckbox = container.find('.js-checkbox-multiple');
  var projectExperience = container.find('.js-project-experience');
  var type = container.find('.js-type');
  var selectedTypeLabel = container.find('.js-selected-type');
  var selectedTypeInput = container.find('input[name="type"]');
  var submitBtn = container.find('.js-submit');
  var form = container.find('form');
  
  events();

  function events(){
    if(checkbox.length > 0){
      initCheckbox();
    }

    if(multiCheckbox.length > 0){
      initMultiCheckbox();
    }
    

    initPublish();
    if(projectExperience.length > 0){
      addProjectExperience();
      removeProjectExperience();
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
    if(url.indexOf('?') >=0 && url.indexOf('t2') >=0){
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

    var show = show;
    if(show == '1'){
      $('.js-show-game').removeClass('hide');
    }
    else{
      $('.js-show-other').removeClass('hide');
      if(option1){
        console.log(option1);
        $('[data-show="'+option1+'"]').removeClass('hide');
        // switch(option1){
        //   case 'input':
        //     $('.js-option1-input').removeClass('hide');
        //     break;
        //   case 'select':
        //     $('.js-option1-select').removeClass('hide');
        //     break;
        // };
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
    formVerification();

  }
  function formVerification(){
    if(!$('.js-show-game').hasClass('hide')){
      submitBtn.unbind('click touch').on('click touch', function(){
        form.validate({
          rules:{
            gameType:'required',
            gameName: 'required',
            companyName: 'required'
          },
          messages:{
            gameType: '不能为空',
            gameName: '不能为空',
            companyName: '不能为空'
          },
          submitHandler: function(e){
            // 临时代码，
            window.location.href='/product-info.html'

          }
        });
      });
    }
    else{
      submitBtn.unbind('click touch').on('click touch', function(){
        form.validate({
          rules:{
            typeOptions:'required',
            keywordsOptions: 'required'
          },
          messages:{
            typeOptions: '不能为空',
            keywordsOptions: '不能为空',
          },
          submitHandler: function(e){
            // 临时代码，
            window.location.href='/add-product-detail.html'; //window.location.href='./business.html';

          }
        });
      });
    }
    
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
      var option1 = $(this).attr('data-type-option');
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

  function initMultiCheckbox(){
    multiCheckbox.each(function(){
      $(this).on('click touch', function(){
        var toggleVal = $(this).attr('data-checked') == 'checked'? '' : 'checked';
        var inputVal = toggleVal == 'checked'? true : false;
   
        $(this).toggleClass('active');
        $(this).attr('data-checked', toggleVal);
        $(this).find('input').prop('checked', inputVal); 
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
      if(container.find('.js-add').length<10){
        projectExperience.append(html);
      }
      
    })
  }

  function removeProjectExperience(){
    container.find('.js-remove-btn').on('click touch', function(){
      $(this).parents('.c-list--item').remove();
    })
  }


}
  