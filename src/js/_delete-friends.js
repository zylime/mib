$.fn.DeleteFriends = function(opts){

  var container = $(this);
  var submitBtn = $(this).find('.js-submit');
  var checkbox = $(this).find('.js-checkbox');
  var deleteGroup = $(this).find('.js-delete-group');


 
  
  events();

  function events(){
    initCheckbox();

    submitBtn.on('click touch', function(){
      submitDate();
    })
    
  }

  function initCheckbox(){
    checkbox.on('click touch', function(){
      var _value;
      $(this).toggleClass('active');
      _value = $(this).hasClass('active') ? 'selected' : '';

      $(this).find('input').val(_value);
      updateSubmitBtn();
      updateDeleteGroup();
    })
  }
  function updateSubmitBtn(){
    var num = 0;
    checkbox.each(function(){
      if($(this).hasClass('active')){
        num +=1;
      }
    })

    submitBtn.html('完成 ('+ num +')');
  }

  function updateDeleteGroup(){
    var html = '';
    checkbox.each(function(){
      if($(this).hasClass('active')){
        var img = $(this).attr('data-img');
        var name = $(this).attr('data-name');
        html += '<li class="txt--c"><img class="l-w--100p has-corner--50p" src="' + img + '" alt="' + name + '"/><span>' + name + '</span></li>'
        container.find('.js-delete-group ul').html(html);
      }
    });
    if(container.find('.js-checkbox.active').length > 0){
      deleteGroup.show();
    }
    else{
      container.find('.js-delete-group ul').html('');
      deleteGroup.hide();
    }
    
    
  }

  function submitDate(){

  }

}
  