// $.fn.resetPsw = function(opts){

//   var container = $(this);

//   var submitBtn = $(this).find('.js-submit');
//   var form = $(this).find('.js-reset-psw-form');
//   var psw1 = $(this).find('.js-input-psw1');
//   var psw2 = $(this).find('.js-input-psw2');
//   var error = $(this).find('.js-error');
//   var popup = $('.js-popup-reset-psw');

//   events();

//   function events(){

//     validateForm();
//   }

//   function validateForm(){
//     submitBtn.on('click', function(e){
//       // e.preventDefault();
//       form.validate({
//         rules: {
//           newPsw: {
//             required: true,
//             minlength: 6,
//             maxlength: 18
//           },
//           repeatPsw: {
//             equalTo: "#newPsw"
//           }
//         },
//         messages: {
//           newPsw: {
//             required: $('input[name="reset-psw-200"]').val(),
//             minlength: $('input[name="reset-psw-221"]').val(),
//             maxlength: $('input[name="reset-psw-222"]').val()
//           },
//           repeatPsw: {
//             equalTo: $('input[name="reset-psw-210"]').val()
//           }
//         },
//         submitHandler: function(e){
//           // submitData();
//           showPopup(popup);
//         }
//       })

//     })
//   }

//   function submitData(){
//     var _data = form.serializeJson();
//     var _url = 'http://mib.zengpan.org:8000/reset-psw?';
//     var q = form.serializeJson();
//     var response = { "status" : 100, "message" : "修改成功" } ;
//     q['_response'] = response;
//     q = JSON.stringify(q);
//     _url = _url + q;   

//     var r = new XMLHttpRequest();
//     r.open("GET", encodeURI(_url), true);
//     r.onerror = r.onabort = r.ontimeout = function(e) { console.log(e); }
//     r.send();
//     r.onreadystatechange = function() {
//       if (r.readyState == r.DONE) {
//         if (r.status == 200) {
//           var _status = $.parseJSON(r.response).status;
//           var _msg = $.parseJSON(r.response).message;
//           if(_status == 300){
//             error.hide();
//             showPopup(popup);
//           }
//           else{
//             var _errorHtml;
//             if(_status == 300){
//               _errorHtml = $('input[name="reset-psw-300"]').val();
//             }
//             else if(_status == 223){
//               _errorHtml = $('input[name="reset-psw-223"]').val();
//             }
//             error.html(_errorHtml);
//             error.show();
//           }
          
//         }
//       }
//     }
//   }

//   function showPopup(ele){
//     var ele = ele;
//     ele.show();
//     $('.js-popup-cover').show();
//   }

// }
//   