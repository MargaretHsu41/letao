/**
 * Created by 阿呆 on 2018/6/29.
 */
$(function (){
//获取左侧一级分类名称
  $.ajax({
    type:"get",
    url:"/category/queryTopCategory",
    dataType:"json",
    success:function (info){
      //console.log(info);
      $('.lt_category_left ul').html(template("tpl",info));

      //跟据左侧第一个一级分类的第一个渲染第一个二级分类,id是固定不变的,当id=0被删除,第一个的id可能就是1,所以只能动态获取
      renderSecondById( info.rows[0].id );
    }
  });

//给动态生成的a注册点击事件,用事件委托
  $('.lt_category_left').on("click","a",function(){
    //获取点击的a的id
    var id =$(this).data("id");
    //根据id渲染二级分类
    renderSecondById(id);

    //给点击的a设置current样式,其余的a都取消current样式
    $(this).addClass("current").parent().siblings().find("a").removeClass("current");
  })


//获取二级分类
function renderSecondById (id) {
  $.ajax({
    type:"get",
    url:"/category/querySecondCategory",
    dataType:"json",
    data:{
      id:id
    },
    success:function(info){
     $('.lt_category_right ul').html(template("rightTpl",info));
    }
})
}
});