/**
 * Created by 阿呆 on 2018/6/26.
 */

$(function(){
var currentPage =1;
var pageSize = 2;
  //表格数据从后台传
  render();
  function render (){
    $.ajax({
      url:"/category/queryTopCategoryPaging",
      type:"get",
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      dataType:"json",
      success:function(info){
        //模板和数据的结合
        $("tbody").html(template("tpl",info));

        $(".pagination").bootstrapPaginator({
          bootstrapMajorVersion:3,
          totalPages:Math.ceil(info.total / info.size),
          currentPage:currentPage,
          onPageClicked:function(a,b,c,page){
            currentPage = page;
            render();
          }
        })
      }
    })
  }
//添加分类的功能
  //点击按钮,显示模态框
  $("#addBtn").click(function(){
    //模态框显示
    $("#addModal").modal("show");
  });

//通过表单校验插件,校验表单
  $("#form").bootstrapValidator({
    //配置图标
    feedbackIcons:{
      valid:'glyphicon glyphicon-ok',
      invalid:'glyphicon glyphicon-remove' ,
      validating:'glyphicon glyphicon-refresh'
    },
    fields:{
      categoryName:{
        validators:{
          notEmpty:{
            message:"一级分类名称不能为空"
          }
        }
      }
    }
  });

  $("#form").on("success.form.bv",function(e){
    e.preventDefault(); //阻止浏览器默认提交,通过ajax提交
    //后台获取数据并渲染数据到页面中
    $.ajax({
      type:"post",
      url:"/category/addTopCategory",
      dataType:"json",
      data:$("#form").serialize(),
      success:function (info){
        //console.log(info);
        if (info.success){
          //关闭模态框
          $("#addModal").modal("hide");
          //渲染页面
          currentPage = 1;
          render();

         //重置表单内容及状态
          $("#form").data("bootstrapValidator").resetForm(true);
        }
      }
    })
  })



});
