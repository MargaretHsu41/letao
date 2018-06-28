/**
 * Created by 阿呆 on 2018/6/29.
 */
$(function (){

  $.ajax({
    type:"get",
    url:"/category/queryTopCategory",
    dataType:"json",
    success:function (info){
      //console.log(info);
      $('.lt_category_left ul').html(template("tpl",info));
      renderSecondById( info.rows[0].id );
    }
  });


  $('.lt_category_left').on("click","a",function(){
    var id =$(this).data("id");
    renderSecondById(id);

    $(this).addClass("current").parent().siblings().find("a").removeClass("current");
  })



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