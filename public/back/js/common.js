/**
 * Created by 阿呆 on 2018/6/25.
 */

//进度条,要给所有的ajax用
//ajax开始进度条开始,ajax结束进度条结束
//第一个ajax开始时,发送进度条
$(document).ajaxStart(function (){
  NProgress.start();
});
$(document).ajaxStop(function (){
  setTimeout(function(){
    NProgress.done();
  },1000)
});


