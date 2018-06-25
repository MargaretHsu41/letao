/**
 * Created by 阿呆 on 2018/6/25.
 */

$(function(){
  $("#form").bootstrapValidator({
   //配置图标
   feedbackIcons:{
     valid:'glyphicon glyphicon-ok',
     invalid:'glyphicon glyphicon-remove' ,
     validating:'glyphicon glyphicon-refresh'
   },

//校验用户名,要求不能为空,长度
    fields:{
      username:{
        validators:{
          notEmpty:{
            message:"用户名不能为空"
          },
          stringLength:{
            min:2,
            max:6,
            message:"用户名长度必须在2-6位"
          },
          callback:{
            message:"用户名不存在"
          }
        }
      },

//校验密码,要求不能为空,长度
      password:{
        validators:{
          notEmpty:{
            message:"密码不能为空"
          },
          stringLength:{
            min:6,
            max:12,
            message:"密码长度必须在6-12位"
          },
          callback:{
            message:"密码错误"
          }
        }
      }
    }
  });

  //表单校验成功后,判断用户名密码是否正确
  $("#form").on("success.form.bv",function (e){
    //阻止浏览器默认提交表单
    e.preventDefault();
    //通过后台校验数据,接口文档
    $.ajax({
      type:"post",
      url:"/employee/employeeLogin",
      data:$("#form").serialize(),
      dataType:"json",
      success:function(info){
        //console.log(info);
        if(info.success){
          location.href="index.html";
        }
        if(info.error === 1001){
          //alert("密码错误");
          //将表单验证的结果直接显示在状态上
          $("#form").data("bootstrapValidator").updateStatus("password","INVALID","callback");
        }
        if(info.error === 1000){
          //alert("用户名不存在");
          $("#form").data("bootstrapValidator").updateStatus("username","INVALID","callback");
        }
      }
    })
  })

  //当点击重置按钮时,内容会清空,但是状态不变,因此要重置input上的状态
  $('[type="reset"]').click(function (){
    //resetForm可以重置校验状态,当里面传参数true,不仅可以重置校验状态,还可以重置内容
    $("#form").data("bootstrapValidator").resetForm();
  })
});
