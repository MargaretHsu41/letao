/**
 * Created by 阿呆 on 2018/6/25.
 */

//判断用户是否登录
//前端不知道用户是否登录过,要请求后台
if(location.href.indexOf("login.html") === -1){
$.ajax({
  type:"get",
  url:"/employee/checkRootLogin",
  dataType:"json",
  success:function(info){
    //console.log(info);
    if(info.error === 400){
      location.href="login.html"
    }else{
      //console.log("成功了");
    }
  }
})
}


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

//公共部分

//左侧二级菜单切换显示
$(".lt_aside .category").click(function(){
  $(".child").stop().slideToggle();
});

//右边主体上部点击图标,收缩左侧菜单
$(".icon_menu").click(function(){
  $(".lt_aside").toggleClass("hidemenu");
  $(".lt_main").toggleClass("hidemenu");
  $(".lt_topbar").toggleClass("hidemenu");
});

//模态框
//点击退出按钮,显示模态框
$(".icon_logout").click(function (){
  $("#logoutModal").modal("show");
});
//模态框中,点击确定按钮,发送给后台销毁用户登录状态
$("#logoutBtn").click(function(){
  $.ajax({
    type:"get",
    url:"/employee/employeeLogout",
    dataType:"json",
    success:function(info){
      if(info.success){
        location.href="login.html";
      }
    }
  })
})





