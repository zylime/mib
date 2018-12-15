$.fn.SelectFriends = function(opts){

  var container = $(this);
  var submitBtn = $(this).find('.js-submit');
  var checkbox = $(this).find('.js-checkbox');
  var selectGroup = $(this).find('.js-select-group');


 
  
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
      updateSelectGroup();
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

  function updateSelectGroup(){
    var html = '';
    checkbox.each(function(){
      if($(this).hasClass('active')){
        var img = $(this).attr('data-img');
        var name = $(this).attr('data-name');
        html += '<li class="txt--c"><img class="l-w--100p has-corner--50p" src="' + img + '" alt="' + name + '"/></li>'
        // html += '<li class="txt--c"><img class="l-w--100p has-corner--50p" src="' + img + '" alt="' + name + '"/><span>' + name + '</span></li>'
        container.find('.js-select-group ul').html(html);
      }
    });
    if(container.find('.js-checkbox.active').length > 0){
      selectGroup.show();
    }
    else{
      container.find('.js-select-group ul').html('');
      selectGroup.hide();
    }
    
    
  }

  function submitDate(){

  }

}
  