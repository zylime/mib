$.fn.Collapse = function(opts){
  var defaults = {
    text: false
  }
  var settings = $.extend(defaults, opts);
  var container = $(this).find('.js-collapse-container'),
      content = $(this).find('.js-collapse-content'),
        btn = $(this).find('.js-collapse-btn');
  var label1, label2;

  if(settings.text){
    label1 = '阅读更多',
    label2 = '收起';
  }
  const defHeight= container.height();
  
  events();

  function events(){
    var _this = this;
    var contentHeight = content.height();
    var toggleHeight;
    if(defHeight < contentHeight){
      btn.attr('data-expanded', false).removeClass('hide');
      if(settings.text){
        btn.find('span').html(label1);
      }
      toggleHeight = contentHeight;
    }

    // toggle height
    btn.on('click', function(){
      let _status = $(this).attr('data-expanded') == "true" ? "false" : "true";
      
      container.animate({
        'height': toggleHeight + 'px'
      });
      btn.attr('data-expanded', _status);
      toggleHeight = toggleHeight == defHeight? contentHeight : defHeight;
      if(settings.text){
        let _label = $(this).find('span').html() == label1 ? label2 : label1;
        btn.find('span').html(_label);
      }
    });
   }

}
  