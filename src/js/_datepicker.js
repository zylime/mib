$.fn.datePicker = function(opts){

  var container = $(this);




 
  
  events();

  function events(){
    YYMMPicker();   
  
  }
  function YYMMPicker(){
    var today = new Date();
    var yearRange = today.getFullYear();
    yearRange = "1950:" + yearRange;
    $('.js-ui-datepicker-yymm').datepicker({
      changeMonth: true,
      changeYear: true,
      dateFormat: 'yy-mm',
      yearRange: yearRange,
      showButtonPanel: true,
      currentText: "当月",
      onChangeMonthYear: function (year, month, inst) {
        $(this).val($.datepicker.formatDate('M yy', new Date(year, month - 1, 1)));
      },
      onClose: function(dateText, inst) {
        var month = $(".ui-datepicker-month :selected").val();
        var year = $(".ui-datepicker-year :selected").val();
        $(this).val($.datepicker.formatDate('M yy', new Date(year, month, 1)));
      }
    }).focus(function () {
      $(".ui-datepicker-calendar").hide();
    });
  }



}