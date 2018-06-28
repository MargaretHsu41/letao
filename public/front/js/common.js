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
})