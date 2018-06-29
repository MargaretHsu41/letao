$(function (){
  mui(".mui-scroll-wrapper").scroll({
    deceleration:0.0005,//滑动阻力
    indicators:false
  });
  //轮播图自动轮播
  var gallery =mui('.mui-slider');
  gallery.slider({
    interval:2000//自动更换轮播图,2s一次
  });
});

//解析地址栏参数
function getSearchObj (){
  //获取地址栏?后面的拼接
  var search = location.search;
  //解码成中文
  search = decodeURI( search );
  //去掉?
  search = search.slice(1);
  //根据&把字符串分成"a"="b"的格式
  var arr = search.split("&");
  //根据=划分key和value
  var obj={}
  arr.forEach(function(v,i){
    var key = v.split("=")[0];
    var value = v.split("=")[1];
    obj[key]=value;
  })
  return obj;
}