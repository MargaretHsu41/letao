/**
 * Created by 阿呆 on 2018/6/29.
 */


$(function(){
//功能1:搜索框中输入的内容存储为一个数组
  //获取本地存储的数据
  //转为数组
  //通过模板引擎,渲染到页面
  render();
  function getHistory(){
    //由于前面要通过数组的遍历判断数据,因此当没有数据时,也要有一个空数组,不然会报错
    //获取search_list的字符串
    var history = localStorage.getItem("search_list") || '[]';
    //将json字符串转换为数组
    var arr = JSON.parse(history);
    //返回数组
    return arr
  };
  //渲染
  function render (){
    //获取历史记录的数组
    var arr = getHistory();
    //将获取的数组听过模板引擎存进去
    console.log(arr);
    $('.lt_history').html(template("history_tpl" ,{arr:arr}));
  };

//功能2:清空历史记录
  //给动态生成的清空历史记录添加点击事件(委托)
  //点击弹出确认框
  //删除localStorage里面的search_list
  //重新渲染
  $('.lt_history').on("click",".icon_empty", function(){
   //确认框mui.condirm(内容,标题,按钮内容数组,callback)
    mui.confirm( "你是否要清空全部的历史记录?", "温馨提示", ["取消", "确认"],function (e) {
        if(e.index === 1){
          localStorage.removeItem("search_list");
          render();
        }
    })
  });


//功能3:删除一条历史记录
  //点击×,需要一个点击事件
  //获取下标,用来获取当前记录
  //根据下标删除数据 splice(index,1)
  //把删除过后的数据存储到localStorage
  //重新渲染
  $('.lt_history').on("click",".icon_delete",function(){
    //获取当前点击的下标
    var index = $(this).data("index");
    console.log(index);
    //获取数据的数组
    var arr = getHistory();
    //根据index删除一个,arr.splice(index, 1)会直接覆盖原来的数组,返回删除后的数组,如果用arr=arr.splice(index,1),获得的arr是被删除的那一个
    arr.splice(index, 1);
    //存储数据并渲染
    localStorage.setItem("search_list",JSON.stringify(arr));
    render();
  });



//功能4:添加搜索记录功能
//  给搜索添加点击事件,获取搜索框中的内容,存到search_list数组最前面,重新存储到localStorage,再渲染
//判断是否为空,判断是否是重复数组,如果搜索内容超过10,则删除最早的
  $('.search_btn').click(function(){
    //获取搜索框中的内容
    var key = $('.search_input').val();
    //非空判断,如果输入为空,提示用户输入
    if( key === ""){
      mui.toast("请输入搜索关键字");
      return;
    }
    //获取数组
    var arr = getHistory();
    //判断搜索关键词是否有过,并记录下arr.indexOf返回的值,如果返回是-1,则无重复,如果大于-1,则是重复项的下标,则有重复项,
    var index = arr.indexOf( key );
    if (index > -1){
      arr.splice(index ,1);
    }
    //长度判断
    if( arr.length >= 10){
      arr.pop();
    }
    arr.unshift( key );
    localStorage.setItem("search_list",JSON.stringify(arr));
    render();

    //输入完成后需要清空input框
    $('.search_input').val("");

    //最后根据输入的信息进行页面跳到商品页面
    location.href="searchList.html?key="+key;
  })



})