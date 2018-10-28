$.fn.Calender = function(opts){

  var _calendarContainer = $(this).find('.js-calendar-container');
  var onSelect = true;


 
  
  events();

  function events(){
    initCalendar();
   }

   function initCalendar(){
    for (var i = 0; i < 12; i++){
      var _date = new Date();
      var _selector = '.js-calendar-' + (i+1);
      // console.log(_selector);
      _date.setDate(1);
      _date.setMonth(_date.getMonth() - 6 + i); 
      // console.log(_date);
      _calendarContainer.append('<div class="c-calendar--block js-calendar js-calendar-'+ (i+1) + '" data-time="' + _date +'"></div>')

      $(_selector).calendar({
        date: _date,
        daysMin:['日', '一', '二', '三', '四', '五', '六'],
      })

    }
    _calendarContainer.append('<input type="hidden" name="selectDate" class="js-calendar-select-date">');
    // selectDate();
  }

  function selectDate(){
    $('.js-calendar .day').on('click touch', function(){
      if(!onSelect){
        $(this).addClass('active');
      }
    })
    $('.js-calendar-select-date').val('a');
  }


}
  