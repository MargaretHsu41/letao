/**
 * Created by 阿呆 on 2018/6/30.
 */

$(function(){
//从search 页面 的输入框中获取搜索关键词,关键词会拼接在地址栏里面,searchList要根据地址栏里面的关键词,渲染数据
  var key = getSearch("key"); //获取地址栏中的key
  $('.search_input').val(key); //关键词给searchList页面的search_input
  //渲染
  render();

function render (){

  //渲染时,出现的加载图标,推入一个图标
  $('.lt_product').html('<div class="loading"></div>')
  var params = {}
  params.proName= $('.search_input').val();
  params.page=1;
  params.pageSize=100;
  //通过ajax请求,获取数据,渲染页面
  setTimeout(function(){
    $.ajax({
      type:"get",
      url:"/product/queryProduct",
      data:params,
      dataType:"json",
      success:function(info){
        $('.lt_product').html(template("tpl" ,info));
        console.log(info);
      }
    })
  },2000)



  //searchList页面的搜索历史也会推入search页面的
  //给搜索添加点击事件,获取搜索框中的内容,存到search_list数组最前面,重新存储到localStorage,再渲染
//判断是否为空,判断是否是重复数组,如果搜索内容超过10,则删除最早的
$('.search_btn').click(function(){
  var key = $('.search_input').val();
  if (key === ''){
    mui.toast("请输入搜索关键词");
    return;
  }
  var history = localStorage.getItem("search_list") || '[]';

  var arr = JSON.parse(history);
  var index = indexOf(key);
  if( index > -1){
    arr.splice(index, 1);
  }
  if (arr.length >= 10){
    arr.pop();
  }
  arr.unshift(key);

  localStorage.setItem('search_list',JSON.stringify(arr));
})


}




});