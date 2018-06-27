/**
 * Created by 阿呆 on 2018/6/26.
 */

$(function(){

  var currentPage = 1;
  var pageSize =2;

  render();
  function render(){

    $.ajax({
      type:"get",
      url:"/category/querySecondCategoryPaging",
      dataType:"json",
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      success:function(info){
        //console.log(info);
        $("tbody").html(template("tpl",info));

        //分页
        $(".pagination").bootstrapPaginator({
          bootstrapMajorVersion:3,
          totalPages:Math.ceil(info.total/info.size),
          currentPage:currentPage,
          onPageClicked:function(a,b,c,page){
            currentPage=page;
            render();
          }
        })
      }
    })
  }



  //添加分类功能

  //显示模态框
  $("#addBtn").click(function(){
    $("#addModal").modal("show");
  });

  //获取下拉菜单中的一级分类
  $.ajax({
    type:"get",
    url:"/category/queryTopCategoryPaging",
    dataType:"json",
    data:{
      page:1,
      pageSize:100
    },
    success:function(info){
      //console.log(info);
      $(".dropdown-menu").html(template("addTpl",info));
    }
  });


//点击下拉菜单的选项文字变成主文字
//通过委托事件,让a可以被点击选中
  $(".dropdown-menu").on("click","a",function(){
    //获取当前a中的文字
    var txt = $(this).text();
    $("#dropdownTxt").text( txt );

    //获取a里面的id,把
    var id =$(this).data("id");
    $('[name="categoryId"]').val(id);

    //选择一级分类以后,把校验的状态改成√
    $("#form").data("bootstrapValidator").updateStatus("categoryId","VALID");
  });

//图片上传
  $("#fileupload").fileupload({
    dataType:"json",
    done:function(e,data){
      //console.log(data.result.picAddr);
      var picUrl = data.result.picAddr;
      //把图片地址赋给imgbox
      $(".imgBox img").attr("src",picUrl);
      //把地址赋值给name="brandLogo"
      $('[name="brandLogo"]').val(picUrl);
      //重置状态
      $("#form").data("bootstrapValidator").updateStatus("brandLogo","VALID");
    }
  });



  //表单校验
$("#form").bootstrapValidator({
  excluded:[],
  // 配置图标
  feedbackIcons: {
    valid: 'glyphicon glyphicon-ok',   // 校验成功
    invalid: 'glyphicon glyphicon-remove', // 校验失败
    validating: 'glyphicon glyphicon-refresh'  // 校验中
  },
  fields:{
    categoryId:{
      validators:{
        notEmpty:{
          message:"请选择一级分类名称"
        }
      }
    },
    brandName:{
      validators:{
        notEmpty:{
          message:"请输入二级分类名称"
        }
      }
    },
    brandLogo:{
      validators:{
        notEmpty:{
          message:"请上传图片"
        }
      }
    }
  }
});


  //添加分类按钮
  //阻止浏览器默认提交行为,通过ajax提交
  $("#form").on("success.form.bv",function(e){
    e.preventDefault();

    $.ajax({
      type:"post",
      url:"/category/addSecondCategory",
      dataType:"json",
      data:$("#form").serialize(),
      success:function(info){
        //console.log(info);
        if(info.success){
          $("#addModal").modal("hide");
          $("#form").data("bootstrapValidator").resetForm(true);
          currentPage =1;
          render();

          //由于非表单的下拉菜单和图片不是表单,不能自动重置,要手动重置
          $("#dropdownTxt").text("请选择一级分类");
          $(".imgBox img").attr("src","./image/none.png");
        }
      }
    })
  })

});