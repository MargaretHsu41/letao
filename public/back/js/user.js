/**
 * Created by 阿呆 on 2018/6/26.
 */

$(function (){
var currentPgae = 1;//当前页
var pageSize = 5; //一页多少条

  render(); //进入页面先渲染一波
  function render(){
    $.ajax({
      type:"get",
      url:"/user/queryUser",
      dataType:"json",
      data:{
        page:currentPgae,
        pageSize:pageSize
      },
      success:function(info){
        //console.log(info);
        //组合模板数据和模板
        $("tbody").html(template('tpl',info));

        //分页初始化
        $(".pagination").bootstrapPaginator({
          bootstrapMajorVersion:3,  //版本号必写
          totalPages:Math.ceil(info.total/info.size), //总页数有数据总条数/每页条数
          currentPage:info.page,  //当前页码
          onPageClicked:function(a,b,c,page){ //前三个参数不填,abc为了占位
            //为按钮绑定点击事件 page:当前点击的按钮值
            currentPgae = page;  //把page赋值给当前页码
           render(); //重新渲染页面
          }
        })
      }
    })
  }


  //禁用启用按钮功能
  //点击按钮,弹出模态框
  //按钮是动态生成的,用事件委托进行点击事件,不需要等待按钮渲染好

  var currentId; //记录当前用户ID
  var isDelete; //记录用户的状态
  $("tbody").on("click",".btn",function(){
    $("#userModal").modal("show");
    currentId = $(this).parent().data("id");
    //console.log(currentId);
    //如果用户有btn-danger就是禁用,不然就是启用
    isDelete = $(this).hasClass("btn-danger") ? 0 :1;
    //console.log(isDelete);
  })
  //获取用户的状态后,根据按钮点击,切换用户的状态,用户的状态切换要后台修改
  $("#submitBtn").click(function(){
    $.ajax({
      type:"post",
      url:"/user/updateUser",
      dataType:"json",
      data:{
        id:currentId,
        isDelete:isDelete
      },
      success:function(info){
        //console.log(info);
        if(info.success){
          //关闭模态框
          $("#userModal").modal("hide");
          //重新渲染数据
          render();
        }
      }
    })
  })
})