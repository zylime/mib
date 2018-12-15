$.fn.Scan = function(opts){

  var container = $(this);



 
  
  events();

  function events(){
    initScan();
    
  }
  function initScan(){
    var canvas=null,context=null,video=null;  
    window.addEventListener("DOMContentLoaded", function (){
      try{
        canvas = document.getElementById("canvas");
        context = canvas.getContext("2d");
        video = document.getElementById("video");
        
        var videoObj = { "video": true,audio:false},
        flag=true,
        MediaErr = function (error)
        {           
          flag=false;  
          if (error.PERMISSION_DENIED)
          {
             alert('用户拒绝了浏览器请求媒体的权限', '提示');
          } else if (error.NOT_SUPPORTED_ERROR) {
             alert('对不起，您的浏览器不支持拍照功能，请使用其他浏览器', '提示');
          } else if (error.MANDATORY_UNSATISFIED_ERROR) {
             alert('指定的媒体类型未接收到媒体流', '提示');
          } else {
             alert('系统未能获取到摄像头，请确保摄像头已正确安装。或尝试刷新页面，重试', '提示');
          }
        };
        //获取媒体的兼容代码，目前只支持（Firefox,Chrome,Opera）
            if (navigator.getUserMedia)
        {
          //qq浏览器不支持
          if (navigator.userAgent.indexOf('MQQBrowser') > -1) {
             alert('对不起，您的浏览器不支持拍照功能，请使用其他浏览器', '提示');
             return false;
                }
                navigator.getUserMedia(videoObj, function (stream) {
            video.src = stream;                
            video.play();      
                }, MediaErr);           
        }
        else if(navigator.webkitGetUserMedia)
        {
               navigator.webkitGetUserMedia(videoObj, function (stream)
           {          
                 video.src = window.webkitURL.createObjectURL(stream);           
                 video.play();           
              }, MediaErr);           
        }
        else if (navigator.mozGetUserMedia)
        {
          navigator.mozGetUserMedia(videoObj, function (stream) {
             video.src = window.URL.createObjectURL(stream);
             video.play();
          }, MediaErr);
        }
        else if (navigator.msGetUserMedia)
        { 
           navigator.msGetUserMedia(videoObj, function (stream) {
                  $(document).scrollTop($(window).height());
                    video.src = window.URL.createObjectURL(stream);
                    video.play();
                 }, MediaErr);
        }else{
          alert('对不起，您的浏览器不支持拍照功能，请使用其他浏览器');
          return false;
        }
        if(flag){
          alert('为了获得更准确的测试结果，请尽量将二维码置于框中，然后进行拍摄、扫描。 请确保浏览器有权限使用摄像功能');
        }
           //这个是拍照按钮的事件，          
          // $("#snap").click(function () {startPat();}).show();
      }catch(e){      
            printHtml("浏览器不支持HTML5 CANVAS");       
        } 
    }, false);

  }


 

}
  