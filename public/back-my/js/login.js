/**
 * Created by 阿呆 on 2018/6/27.
 */

$(function(){

  //校验数据
  $("#form").bootstrapValidator({
    feedbackIcons:{
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
      username:{
        validators:{
          notEmpty:{
            message:"请输入用户名"
          },
          stringLength:{
            min:2,
            max:6,
            message:"请输入2-6位用户名"
          },
          callback:{
            message:"用户名不存在"
          }
        }
      },
      password:{
        validators:{
          notEmpty:{
            message:"请输入密码"
          },
          stringLength:{
            min:6,
            max:12,
            message:"请输入6-12位密码"
          },
          callback:{
            message:"密码不正确"
          }
        }
      }
    }
  })

  $("#form").on("success.form.bv",function(e){
    e.preventDefault();

    //从后台获取数据
    $.ajax({
      type:"post",
      url:"/employee/employeeLogin",
      dataType:"json",
      data:$("#form").serialize(),
      success: function(info){
        if( info.error === 1000){
          $("#form").data("bootstrapValidator").updateStatus("username","INVALID","callback")
          //console.log(1000);
        }
        if( info.error === 1001){
          $("#form").data("bootstrapValidator").updateStatus("password","INVALID","callback")
          //console.log(1001);
        }
        if( info.success){
          location.href="index.html";
        }
      }
    })
  })


  $("[type=reset]").click(function(){
    $("#form").data("bootstrapValidator").resetForm(true);
  })
});