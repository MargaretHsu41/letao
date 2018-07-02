/**
 * Created by 阿呆 on 2018/6/30.
 */

$(function(){
  var currentPage = 1;
  var pageSize = 5;
//从search 页面 的输入框中获取搜索关键词,关键词会拼接在地址栏里面,searchList要根据地址栏里面的关键词,渲染数据
//  var key = getSearch("key"); //获取地址栏中的key
//  $('.search_input').val(key); //关键词给searchList页面的search_input
//  //渲染
//  render();

function render (callback){

  //渲染时,出现的加载图标,推入一个图标
  $('.lt_product').html('<div class="loading"></div>');

  var params = {}
  params.proName= $('.search_input').val();
  params.page=currentPage;
  params.pageSize=pageSize;


  var $current = $('.lt_sort .current');
  //console.log($current);
  if ($current.length > 0){
    //如果>0说明有高亮,需要排序
    var sortName = $current.data('type');
    //console.log(sortName);
    //1升序,2降序
    var sortValue = $current.find("i").hasClass("fa-angle-down")? 2 :1;
    params[sortName]=sortValue;
  }



  //通过ajax请求,获取数据,渲染页面
  setTimeout(function(){
    $.ajax({
      type:"get",
      url:"/product/queryProduct",
      data:params,
      dataType:"json",
      success:function(info){
        //console.log(info);
        callback && callback(info);
      }
    })
  },500)
}

//下拉刷新
mui.init({
  pullRefresh:{
    container:'.mui-scroll-wrapper',//下拉刷新容器
    down:{  //配置下拉
      auto:true,  //已进入页面就自动下拉刷新
      callback:function(){
        currentPage = 1; //刷新第一页
        render(function(info){
          console.log(info);
          $('.lt_product').html(template("tpl" ,info));
          //返回数据后,关闭下拉刷新
          mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();

        });

      }
    },
    up:{
      callback:function(){
        currentPage++;
        render(function(info){
          //当没有数据加载时,禁用上拉加载
          if(info.data.length === 0){
            mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh(true);
          }else{
            //如果有数据时,继续渲染数据
            $('.lt_product .loading').remove();
            $('.lt_product').append(template("tpl" ,info));
            mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh();
          }
        })
      }
    }
  }
})




  //searchList页面的搜索历史也会推入search页面的
  //给搜索添加点击事件,获取搜索框中的内容,存到search_list数组最前面,重新存储到localStorage,再渲染
//判断是否为空,判断是否是重复数组,如果搜索内容超过10,则删除最早的
$('.lt_product').on('tap','a',function(){
  var id = $(this).data("id");
  location.href = "product.html?productId="+id;
});

  //解析地址栏参数
  var key = getSearch("key");
  $('.search_input').val(key);

$('.search_btn').click(function(){
  var key = $('.search_input').val();
  if (key === ''){
    mui.toast("请输入搜索关键词");
    return;
  }
  //直接用下拉刷新,效果和render()一样
  mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
  var history = localStorage.getItem("search_list") || '[]';

  var arr = JSON.parse(history);
  //console.log(arr);
  var index = arr.indexOf(key);
  if( index > -1){
    arr.splice(index, 1);
  }
  if (arr.length >= 10){
    arr.pop();
  }
  arr.unshift(key);

  localStorage.setItem('search_list',JSON.stringify(arr));

  //清空搜索框
  $('.search_input').val('');
});

  //添加排序功能
//添加点击事件，有选中的加current类，其余移除current类
$('.lt_sort a[data-type]').on('tap','on',function(){
  if ($(this).hasClass("current")){
    $(this).find('i').toggleClass("fa-angle-down").toggleClass("fa-angle-up");
  }else{
    $(this).addClass("current").siblings().removeClass("current");
  }
  mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();

})

});