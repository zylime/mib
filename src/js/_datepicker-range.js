$.fn.datePickerRange = function(opts){

  var container = $(this);
  var datePicker = container.find('.js-ui-datepicker-range');



  
 
  
  events();

  function events(){
 
    rangePicker();
  }

  function rangePicker(){
    var selectedRange;
    var defaultVal = $(datePicker).val();
    datePicker.datepicker({
      dateFormat:'yy/mm/dd',
      numberOfMonths: 1,
      onSelect: function( selectedDate ) {
          if(!$(this).data().datepicker.first){
              $(this).data().datepicker.inline = true
              $(this).data().datepicker.first = selectedDate;
          }else{
              if(selectedDate > $(this).data().datepicker.first){
                  $(this).val($(this).data().datepicker.first+" - "+selectedDate);
              }else{
                  $(this).val(selectedDate+" - "+$(this).data().datepicker.first);
              }
              $(this).data().datepicker.inline = false;
              selectedRange = $(this).val();

          }
      },
      onClose:function(){
          $('.js-date-display').html(selectedRange);
          // $(this).val(defaultVal);
          $('.display-date').addClass('active');
          delete $(this).data().datepicker.first;
          $(this).data().datepicker.inline = false;
      }
    })
  }
  
 

}