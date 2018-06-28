/**
 * Created by 阿呆 on 2018/6/28.
 */

$(function(){
var currentPage = 1;
var pageSize = 5;
var picArr =[];//设置一个空数组存放图片地址
  render();
  function render(){
    $.ajax({
      type:"get",
      url:"/product/queryProductDetailList",
      dataType:"json",
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      success:function(info){
        //console.log(info)
        $('tbody').html(template("tpl",info));

        //分页
        $(".pagination").bootstrapPaginator({
          bootstrapMajorVersion:3,
          totalPages:Math.ceil(info.total /info.size),
          currentPage:currentPage,
          //分页框的大小
          size:"mini",
          //分页框内的内容
          itemTexts:function(type,page,current){
            switch(type){
              case "prev":
                return"上一页";
              case "first":
                return "首页";
              case "next":
                return "下一页";
              case "last":
                return "尾页";
              case "page":
                return page;
            }
          },
          //分页框的提示内容
          tooltipTitles:function(type,page,current){
            switch(type){
              case "prev":
                return"上一页";
              case "first":
                return "首页";
              case "next":
                return "下一页";
              case "last":
                return "尾页";
              case "page":
                return "前往第" +page+"页";
            }
          },
          //提示框的样式,默认是false
          useBootstrapTooltip:true,
          onPageClicked:function(a,b,c,page){
            currentPage=page;
            render();
          }
        })
      }
    })
  }


  //添加分类
  $("#addBtn").click(function(){
    $("#addModal").modal("show");

    //渲染下拉菜单
    $.ajax({
      type:"get",
      url:"/category/querySecondCategoryPaging",
      dataType:"json",
      data:{
      page:1,
      pageSize:100
      },
      success:function(info){
        //console.log(info);
        $(".dropdown-menu").html(template("addTpl",info));
      }
    })
  });

  //通过委托事件给a增加点击事件
$(".dropdown-menu").on("click","a",function(){
  var txt = $(this).text();
  $("#dropdownTxt").text(txt);
//想隐藏域存储id
  var id = $(this).data("id");
  $('[name="brandId"]').val(id);

  //手动重置隐藏域的校验状态
  $('#form').data("bootstrapValidator").updateStatus("brandId","VALID");
})

  //校验表单
  $("#form").bootstrapValidator({
    excluded:[],
    feedbackIcons:{
      valid: 'glyphicon glyphicon-ok',   // 校验成功
      invalid: 'glyphicon glyphicon-remove', // 校验失败
      validating: 'glyphicon glyphicon-refresh'  // 校验中
    },
    fields:{
      brandId:{
        validators:{
         notEmpty:{
            message:"请选择二级分类名称"
          }
        }
      },
      proName:{
        validators:{
          notEmpty:{
            message:"请输入商品名称"
          }
        }
      },
      proDesc:{
        validators:{
          notEmpty:{
            message:"请输入商品描述"
          }
        }
      },
      num:{
        validators:{
          notEmpty:{
            message:"请输入商品库存"
          },
          regexp:{
            regexp:/^[1-9]\d*$/,
            message:"请输入非零的数字"
          }
        }
      },
      size:{
        validators:{
          notEmpty:{
            message:"请输入商品尺码"
          },
          regexp:{
            regexp:/^\d{2}-\d{2}$/,
            message:"请输入格式为xx-xx的尺码,例如35-39"
          }
        }
      },
      oldPrice:{
        validators:{
          notEmpty:{
            message:"请输入商品原价"
          },
        }
      },
      price:{
        validators:{
          notEmpty:{
            message:"请输入商品现价"
          },
        }
      },
      picStatus:{
        validators:{
          notEmpty:{
            message:"请上传3张图片"
          }
        }
      }
    }
  });

  //进行图片上传初始化
  $("#fileupload").fileupload({
    dataType:"json",
    done:function(e , data){
      //console.log(data.result);
      //data.result打印出来的是picAddr和picName
      //获取url
      var picUrl = data.result.picAddr;
      //给数组中添加图片地址
      picArr.unshift(data.result);
      //给结构中添加img标签
      $('.imgBox').prepend('<img src="'+ picUrl +'" width="100" height="100">');
      //如果长度大于3.要删除最后一张
      if(picArr.length > 3){
        picArr.pop();
        //html结构中也要删除动态生成的结构
        //img:last-of-type 找到最后一个 img 类型的标签, 让他自杀
        $('.imgBox img:last-of-type').remove();
      }
      //如果图片长度=3,要设置校验状态为√
      if(picArr.length === 3){
        $('#form').data('bootstrapValidator').updateStatus('picStatus','VALID');
      }
    }

  });


  //注册成功后,提交表单,渲染至页面
  $('#form').on("success.form.bv",function(e){
    //阻止浏览器默认提交,通过ajax提交
    e.preventDefault();
//传输的数据不仅有表单信息,还有图片地址,要拼接到一起
    var paramStr = $('#form').serialize();
    paramStr += "&picAddr1=" + picArr[0].picAddr + "&picName1" +picArr[0].picName;
    paramStr += "&picAddr2=" + picArr[1].picAddr + "&picName2" +picArr[1].picName;
    paramStr += "&picAddr3=" + picArr[2].picAddr + "&picName3" +picArr[2].picName;
    $.ajax({
      type:"post",
      url:"/product/addProduct",
      dataType:"json",
      data:paramStr,
      success:function(info){
        //console.log(info);
        if (info.success){
          //关闭模态框
          $('#addModal').modal("hide");
          //重置表单状态
          $("#form").data("bootstrapValidator").resetForm(true);
          //渲染当前页面
          currentPage=1;
          render();

          //手动重置非表单的状态
          $('#dropdownTxt').text("请选择二级分类");
          $('.imgBox img').remove();
        }
      }
    })

  })
















})