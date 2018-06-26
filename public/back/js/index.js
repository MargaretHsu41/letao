/**
 * Created by 阿呆 on 2018/6/26.
 */

$(function(){
  //获取DOM元素
  var echarts1 = echarts.init(document.querySelector(".echarts_1"));

  // 指定图表的配置项和数据
  var option = {
    //标题
    title: {
      text: '2017年注册人数'
    },
    //提示框
    tooltip: {},
    //图例
    legend: {
      data:['人数']
    },
    //X轴
    xAxis: {
      data: ["1月","2月","3月","4月","5月","6月"]
    },
    //y轴
    yAxis: {},
    series: [{
      name: '人数',
      type: 'bar',
      data: [1000, 1500, 1800, 1200, 2500, 1800]
    }]
  };
     //调用配置项显示图表
  echarts1.setOption(option);

  //饼图
  //获取DOM元素
  var echarts2 = echarts.init(document.querySelector(".echarts_2"));

  // 指定图表的配置项和数据
  var option2 = {
    title : {
      text: '热门品牌销售',
      subtext: '2018年6月',
      x:'center'
    },
    tooltip : {
      //数据项触发
      trigger: 'item',
      //提示框文本 {a}（系列名称），{b}（数据项名称），{c}（数值）, {d}（百分比）
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
      //图例展示方向
      orient: 'vertical',
      //位置
      left: 'left',
      data: ['耐克','阿迪','新百伦','李宁','阿迪王']
    },
    series : [
      {
        name: '品牌',
        type: 'pie',
        //圆直径长度
        radius : '70%',
        //圆心位置
        center: ['50%', '60%'],
        data:[
          {value:335, name:'耐克'},
          {value:310, name:'阿迪'},
          {value:234, name:'新百伦'},
          {value:135, name:'李宁'},
          {value:1548, name:'阿迪王'}
        ],
        //设置阴影
        itemStyle: {
          emphasis: {
            shadowBlur: 100,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
  //调用配置项显示图表
  echarts2.setOption(option2);
})