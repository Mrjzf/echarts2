$(function () {
    echartsObj.init();
    runDay();

    // 数字递增
    $('.count').each(count);
})

var beginTime = '2019-01-01';

//运行天数
function runDay() {
    var currenTime = new Date();
    beginTime = new Date(beginTime.replace(/-/g, "/"));
    var time = currenTime.getTime() - beginTime.getTime();
    var day = parseInt(time / (1000 * 60 * 60 * 24));
    $('.running-time').html(day);
    $('.running-time').attr('data-to', day);
}

var echartsObj = {
    pie_market_obj: null, //菜场价格饼图
    pie_shop_obj: null, //平价商店价格饼图
    pie_pharmacy_obj: null, //药店价格饼图
    linear_market_obj: null, //菜场价格折线图
    linear_shop_obj: null, //平价商店价格折线图
    linear_pharmacy_obj: null, //药品价格折线图
    pie_property_obj1: null, //楼盘饼图1
    pie_property_obj2: null, //楼盘饼图2
    mapObj: null, //地图
    geoCoordMap: null, //地图上显示的名称和坐标数据
    mapData: null, //地图上显示的名称和值数据
    bar_shop_obj: null, //商品波动柱状图
    bar_newShop_obj: null, //最新商品价格变动柱状图


    init: function () {
        this.pie_market();
        this.pie_shop();
        this.pie_pharmacy();
        this.map_echarts();
        this.linear_market();
        this.linear_shop();
        this.linear_pharmacy();
        this.pie_property1();
        this.pie_property2();
        this.bar_shop();
        this.bar_newShop();
    },

    //菜场价格饼图
    pie_market: function () {
        this.pie_market_obj = echarts.init(document.getElementById('pie_market_echarts'));
        var option = {
            tooltip: { //悬浮显示
                trigger: "item",
                formatter: "{a} <br/>{b}:{c} ({d}%)",
                position: function (p) {
                    return [p[0] - 20, p[1] - 20];
                },
                textStyle: {
                    fontSize: 12
                }
            },
            title: [{
                text: '菜场价格指数',
                top: '82%',
                left: '18%',
                textStyle: {
                    color: '#fff',
                    fontSize: 9
                }
            }],
            series: [{
                name: '菜场价格',
                type: 'pie',
                radius: ['64%', '74%'],
                color: ['#ED5655', '#073E7B'],
                hoverOffset: 4, //选中后圆环偏移距离（大小）
                label: {
                    normal: {
                        position: 'center',
                        textStyle: {
                            color: '#fff',
                            fontSize: 10
                        }
                    }
                },
                data: [{
                    value: 20,
                    name: '去年菜场价格',
                    label: {
                        normal: {
                            formatter: '{d}%',
                        }
                    }
                }, {
                    value: 80,
                    name: '今年菜场价格',
                    label: {
                        normal: {
                            formatter: '\n环比增长',
                        }
                    }
                }]
            }]
        }
        this.pie_market_obj.setOption(option);
    },

    //平价商店价格饼图
    pie_shop: function () {
        this.pie_shop_obj = echarts.init(document.getElementById('pie_shop_echarts'));
        var option = {
            tooltip: { //悬浮显示
                trigger: "item",
                formatter: "{a} <br/>{b}:{c} ({d}%)",
                position: function (p) {
                    return [p[0] - 20, p[1] - 20];
                },
                textStyle: {
                    fontSize: 12
                }
            },
            title: [{
                text: '平价商店价格指数',
                top: '82%',
                left: '10%',
                textStyle: {
                    color: '#fff',
                    fontSize: 9
                }
            }],
            series: [{
                name: '平价商店价格',
                type: 'pie',
                radius: ['64%', '74%'],
                color: ['#FF9D0B', '#073E7B'],
                hoverOffset: 4, //选中后圆环偏移距离（大小）
                label: {
                    normal: {
                        position: 'center',
                        textStyle: {
                            color: '#fff',
                            fontSize: 10
                        }
                    }
                },
                data: [{
                    value: 78,
                    name: '去年商店价格',
                    label: {
                        normal: {
                            formatter: '{d}%',
                        }
                    }
                }, {
                    value: 22,
                    name: '今年商店价格',
                    label: {
                        normal: {
                            formatter: '\n环比增长',
                        }
                    }
                }]
            }]
        }
        this.pie_shop_obj.setOption(option);
    },

    //药店价格饼图
    pie_pharmacy: function () {
        this.pie_pharmacy_obj = echarts.init(document.getElementById('pie_pharmacy_echarts'));
        var option = {
            tooltip: { //悬浮显示
                trigger: "item",
                formatter: "{a} <br/>{b}:{c} ({d}%)",
                position: function (p) {
                    return [p[0] - 20, p[1] - 20];
                },
                textStyle: {
                    fontSize: 12
                }
            },
            title: [{
                text: '药店价格指数',
                top: '82%',
                left: '20%',
                textStyle: {
                    color: '#fff',
                    fontSize: 9
                }
            }],
            series: [{
                name: '药店价格',
                type: 'pie',
                radius: ['64%', '74%'],
                color: ['#12DC9A', '#073E7B'],
                hoverOffset: 4, //选中后圆环偏移距离（大小）
                label: {
                    normal: {
                        position: 'center',
                        textStyle: {
                            color: '#fff',
                            fontSize: 10
                        }
                    }
                },
                data: [{
                    value: 50,
                    name: '今年药店价格',
                    label: {
                        normal: {
                            formatter: '{d}%',
                        }
                    }
                }, {
                    value: 50,
                    name: '去年药店价格',
                    label: {
                        normal: {
                            formatter: '\n环比增长',
                        }
                    }
                }]
            }]
        }
        this.pie_pharmacy_obj.setOption(option);
    },

    //菜场价格折线图
    linear_market: function () {
        this.linear_market_obj = echarts.init(document.getElementById('linear_market_echarts'));
        option = {
            tooltip: {
                trigger: 'axis'
            },
            calculable: true,
            grid: {
                left: '0%',
                right: '0%',
                bottom: '5%',
                top: '10%',
                height: '90%',
                containLabel: true,
                z: 22
            },
            xAxis: [{
                type: 'category',
                boundaryGap: false,
                data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                axisLine: {
                    lineStyle: {
                        color: '#025797'
                    }
                },
                axisLabel: {
                    show: true,
                    color: '#00F4FC',
                    fontSize: 10,
                }
            }],
            yAxis: [{
                type: 'value',
                axisLine: {
                    lineStyle: {
                        color: '#04366e'
                    }
                },
                axisLabel: {
                    show: true,
                    color: '#00F4FC',
                    fontSize: 10,
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: 'rgba(2,104,178,.3)' //坐标轴内x轴线颜色
                    }
                }
            }],
            dataZoom: [{ //数据缩放
                type: 'inside',
                show: true,
                start: 0,
                end: 100
            }],
            series: [{
                name: '菜场价格指数',
                type: 'line',
                stack: '总量',
                lineStyle: {
                    normal: {
                        width: 1,
                        color: '#ED5655' //折线颜色
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#ED5655',
                        borderColor: '#ED5655', //图形的描边颜色。支持的格式同 color
                        borderWidth: 2 //描边线宽。为 0 时无描边。[ default: 0 ] 
                    }
                },
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0,
                            color: 'rgba(237,86,85,1)' // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: 'rgba(237,86,85,0)' // 100% 处的颜色
                        }],
                        globalCoord: false // 缺省为 false
                    }
                },
                data: [100, 150, 190, 180, 170, 150, 200, 300, 280, 230, 190, 260]
            }]
        };
        this.linear_market_obj.setOption(option);
    },

    //平价商店价格折线图
    linear_shop: function () {
        this.linear_shop_obj = echarts.init(document.getElementById('linear_shop_echarts'));
        option = {
            tooltip: {
                trigger: 'axis'
            },
            calculable: true,
            grid: {
                left: '0%',
                right: '0%',
                bottom: '5%',
                top: '10%',
                height: '90%',
                containLabel: true,
                z: 22
            },
            xAxis: [{
                type: 'category',
                boundaryGap: false,
                data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                axisLine: {
                    lineStyle: {
                        color: '#025797'
                    }
                },
                axisLabel: {
                    show: true,
                    color: '#00F4FC',
                    fontSize: 10,
                }
            }],
            yAxis: [{
                type: 'value',
                axisLine: {
                    lineStyle: {
                        color: '#04366e'
                    }
                },
                axisLabel: {
                    show: true,
                    color: '#00F4FC',
                    fontSize: 10,
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: 'rgba(2,104,178,.3)' //坐标轴内x轴线颜色
                    }
                }
            }],
            dataZoom: [{ //数据缩放
                type: 'inside',
                show: true,
                start: 0,
                end: 100
            }],
            series: [{
                name: '平价商店价格指数',
                type: 'line',
                stack: '总量',
                lineStyle: {
                    normal: {
                        width: 1,
                        color: '#FF9D0B'
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#FF9D0B',
                        borderColor: '#FF9D0B', //图形的描边颜色。支持的格式同 color
                        borderWidth: 2 //描边线宽。为 0 时无描边。[ default: 0 ] 
                    }
                },
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0,
                            color: 'rgba(255,157,11,1)' // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: 'rgba(255,157,11,0)' // 100% 处的颜色
                        }],
                        globalCoord: false // 缺省为 false
                    }
                },
                data: [100, 150, 200, 260, 170, 150, 180, 220, 280, 230, 200, 260]
            }]
        };
        this.linear_shop_obj.setOption(option);
    },

    //药品价格折线图
    linear_pharmacy: function () {
        this.linear_pharmacy_obj = echarts.init(document.getElementById('linear_pharmacy_echarts'));
        option = {
            tooltip: {
                trigger: 'axis'
            },
            calculable: true,
            grid: {
                left: '0%',
                right: '0%',
                bottom: '5%',
                top: '10%',
                height: '90%',
                containLabel: true,
                z: 22
            },
            xAxis: [{
                type: 'category',
                boundaryGap: false,
                data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                axisLine: {
                    lineStyle: {
                        color: '#025797'
                    }
                },
                axisLabel: {
                    show: true,
                    color: '#00F4FC',
                    fontSize: 10,
                }
            }],
            yAxis: [{
                type: 'value',
                axisLine: {
                    lineStyle: {
                        color: '#04366e'
                    }
                },
                axisLabel: {
                    show: true,
                    color: '#00F4FC',
                    fontSize: 10,
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: 'rgba(2,104,178,.3)' //坐标轴内x轴线颜色
                    }
                }
            }],
            dataZoom: [{ //数据缩放
                type: 'inside',
                show: true,
                start: 0,
                end: 100
            }],
            series: [{
                name: '药品价格指数',
                type: 'line',
                stack: '总量',
                lineStyle: {
                    normal: {
                        width: 1,
                        color: '#12DC9A'
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#12DC9A',
                        borderColor: '#12DC9A', //图形的描边颜色。支持的格式同 color
                        borderWidth: 2 //描边线宽。为 0 时无描边。[ default: 0 ] 
                    }
                },
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0,
                            color: 'rgba(18,220,154,1)' // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: 'rgba(18,220,154,0)' // 100% 处的颜色
                        }],
                        globalCoord: false // 缺省为 false
                    }
                },
                data: [100, 150, 200, 180, 170, 200, 200, 280, 280, 230, 190, 260]
            }]
        };
        this.linear_pharmacy_obj.setOption(option);
    },

    //楼盘饼图1
    pie_property1: function () {
        this.pie_property_obj1 = echarts.init(document.getElementById('pie_property_echarts1'));
        var option = {
            tooltip: { //悬浮显示
                trigger: "item",
                formatter: "{a} <br/>{b}:{c} ({d}%)",
                position: function (p) {
                    return [p[0] - 20, p[1] - 20];
                },
                textStyle: {
                    fontSize: 12
                }
            },
            series: [{
                name: '楼盘',
                type: 'pie',
                radius: ['64%', '74%'],
                color: ['#FF7D50', '#073E7B'],
                hoverOffset: 2, //选中后圆环偏移距离（大小）
                label: {
                    normal: {
                        position: 'center',
                        textStyle: {
                            color: '#fff',
                            fontSize: 10
                        }
                    }
                },
                data: [{
                    value: 20,
                    name: '新楼盘',
                    label: {
                        normal: {
                            formatter: '{d}%',
                        }
                    }
                }, {
                    value: 80,
                    name: '楼盘',
                    label: {
                        normal: {
                            formatter: '\n环比增长',
                        }
                    }
                }]
            }]
        }
        this.pie_property_obj1.setOption(option);
    },

    //楼盘饼图2
    pie_property2: function () {
        this.pie_property_obj2 = echarts.init(document.getElementById('pie_property_echarts2'));
        var option = {
            tooltip: { //悬浮显示
                trigger: "item",
                formatter: "{a} <br/>{b}:{c} ({d}%)",
                position: function (p) {
                    return [p[0] - 20, p[1] - 20];
                },
                textStyle: {
                    fontSize: 12
                }
            },
            series: [{
                name: '楼盘',
                type: 'pie',
                radius: ['64%', '74%'],
                color: ['#FF7D50', '#073E7B'],
                hoverOffset: 2, //选中后圆环偏移距离（大小）
                label: {
                    normal: {
                        position: 'center',
                        textStyle: {
                            color: '#fff',
                            fontSize: 10
                        }
                    }
                },
                data: [{
                    value: 20,
                    name: '新楼盘',
                    label: {
                        normal: {
                            formatter: '{d}%',
                        }
                    }
                }, {
                    value: 80,
                    name: '楼盘',
                    label: {
                        normal: {
                            formatter: '\n环比增长',
                        }
                    }
                }]
            }]
        }
        this.pie_property_obj2.setOption(option);
    },

    //地图
    map_echarts: function () {
        this.mapObj = echarts.init(document.getElementById('map_echarts'));
        // this.mapObj.showLoading();
        var uploadedDataURL = "../mapjson/yangzhong.json";

        this.geoCoordMap = { //位置坐标
            '新坝镇菜场': [119.73, 32.26],
            '三茅镇菜场': [119.80, 32.24],
            '开发区菜场': [119.85, 32.19],
            '油坊镇菜场': [119.80, 32.14],
            '八桥镇菜场': [119.88, 32.12],
            '西来桥镇菜场': [119.91, 32.03]
        };
        this.mapData = [{
                name: '新坝镇菜场',
                value: 219,
                gather: true
            },
            {
                name: '三茅镇菜场',
                value: 339,
                gather: true
            },
            {
                name: '开发区菜场',
                value: 412,
                gather: false
            },
            {
                name: '油坊镇菜场',
                value: 429,
                gather: false
            },
            {
                name: '八桥镇菜场',
                value: 389,
                gather: true
            },
            {
                name: '西来桥镇菜场',
                value: 352,
                gather: false
            }
        ];
        var data = this.mapData;

        var option = {
            tooltip: {
                trigger: 'item',
                borderColor: '#FFFFCC',
                showDelay: 0,
                hideDelay: 0,
                enterable: true,
                transitionDuration: 0,
                extraCssText: 'z-index:100',
                formatter: function (params, ticket, callback) {
                    //根据业务自己拓展要显示的内容
                    var res = "";
                    var name = params.name;
                    var value = params.value;
                    console.log(value)
                    res = "<span style='color:#fff;'>" + name + "</span><br/>采集数据：" + value[2];
                    return res;
                }
            },
            geo: {
                map: 'yangzhong',
                zoom: 1,
                label: {
                    emphasis: {
                        show: false
                    }
                },
                roam: false, //是否允许缩放
                layoutCenter: ['50%', '50%'], //地图位置
                layoutSize: "95%",
                itemStyle: {
                    normal: {
                        label: {
                            show: true,
                            color: '#fff',
                            fontSize: 10,
                        },
                        borderColor: 'rgba(147, 235, 248, 1)', //省市边界线
                        borderWidth: 1,
                        areaColor: {
                            type: 'radial',
                            x: 0.5,
                            y: 0.5,
                            r: 0.8,
                            colorStops: [{
                                    offset: 0,
                                    color: 'rgba(147, 235, 248, 0)' // 0% 处的颜色 
                                },
                                {
                                    offset: 1,
                                    color: 'rgba(147, 235, 248, .2)' // 100% 处的颜色 
                                }
                            ],
                            globalCoord: false // 缺省为 false 
                        },
                        shadowColor: 'rgba(128, 217, 248, 1)',
                        shadowOffsetX: -2,
                        shadowOffsetY: 2,
                        shadowBlur: 10
                    },
                    emphasis: {
                        label: {
                            show: true,
                            color: '#fff'
                        },
                        areaColor: 'rgb(100, 209, 240)',
                        borderWidth: 0
                    }
                }
            },
            series: [{
                    name: '城镇',
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    data: convertData(data),
                    // symbolSize: function (val) {
                    //     return val[2] / 35;
                    // },
                    symbolSize: 8,
                    label: {
                        normal: {
                            fontSize: 12,
                            formatter: '{b}',
                            position: 'right',
                            show: true
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#fff', //区县字体颜色
                        }
                    }
                },
                {
                    name: '气泡',
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    data: convertData(data.sort(function (a, b) {
                        return b.value - a.value;
                    }).slice(0, 9)),
                    // symbolSize: function (val) { 根据值改变气泡大小
                    //     console.log(val)
                    //     return val[2] / 30;
                    // },
                    symbolSize: 8,
                    showEffectOn: 'render',
                    rippleEffect: {
                        period: 2,
                        brushType: 'stroke',
                        scale: 4
                    },
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'right',
                            show: false
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    itemStyle: {
                        normal: {
                            //是否采集散点背景色
                            // color: function (val) {
                            //     return val.data.gather == true ? '#f00' : '#2eee92';
                            // },
                            color: '#2BF291',
                            shadowBlur: 10,
                            shadowColor: '#05C3F9'
                        }
                    },
                    zlevel: 2
                }
            ]
        };

        $.getJSON(uploadedDataURL, function (geoJson) {
            echarts.registerMap('yangzhong', geoJson);
            // echartsObj.mapObj.hideLoading();
            echartsObj.mapObj.setOption(option);
        })
    },

    //商品波动柱状图
    bar_shop: function () {
        this.bar_shop_obj = echarts.init(document.getElementById('radioBar_shop'));
        var data = [{
                "name": "苹果",
                "value": 10
            }, {
                "name": "香蕉",
                "value": 20
            }, {
                "name": "榴莲",
                "value": 30
            }, {
                "name": "蒜苗",
                "value": 40
            }, {
                "name": "小米",
                "value": 50
            }, {
                "name": "韭菜",
                "value": 22
            }, {
                "name": "鲫鱼",
                "value": 32
            },
            {
                "name": "芒果",
                "value": 72
            },
            {
                "name": "大枣",
                "value": 62
            },
            {
                "name": "砂糖橘",
                "value": 48
            },
            {
                "name": "柚子",
                "value": 56
            },
            {
                "name": "白菜",
                "value": 10
            }
        ];

        var xData = [],
            yData = [];
        var min = 0;
        var max = 0;
        data.map(function (a, b) {
            xData.push(a.name);
            max = max < a.value ? a.value : max;
            if (a.value === 0) {
                yData.push(a.value + min);
            } else {
                yData.push(a.value);
            }
        });
        max = (Math.floor(max / 10) + 1) * 10;
        max = max > 100 ? max : 100;

        var option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'line',
                    lineStyle: {
                        opacity: 0
                    }
                },
                formatter: function (prams) {
                    if (prams[0].data === min) {
                        return "商品价格:0"
                    } else {
                        return "商品价格：" + prams[0].data
                    }
                }
            },
            toolbox: {
                show: true,
                feature: {
                    magicType: {
                        type: ['line', 'bar']
                    }
                }
            },
            grid: {
                left: '0%',
                right: '0%',
                bottom: '5%',
                top: '7%',
                height: '85%',
                containLabel: true,
                z: 22
            },
            xAxis: [{
                type: 'category',
                gridIndex: 0,
                data: xData,
                axisTick: {
                    alignWithLabel: true
                },
                axisLine: {
                    lineStyle: {
                        color: '#04366e'
                    }
                },
                axisLabel: {
                    show: true,
                    color: '#6DF6F5',
                    fontSize: 12,
                    rotate: 45
                }
            }],
            yAxis: [{
                    type: 'value',
                    gridIndex: 0,
                    splitLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    min: min,
                    max: max,
                    axisLine: {
                        lineStyle: {
                            color: '#04366e'
                        }
                    },
                    axisLabel: {
                        color: '#6DF6F5',
                        formatter: '{value}'
                    }
                },
                { //图层背景
                    type: 'value',
                    gridIndex: 0,
                    min: min,
                    max: max,
                    splitNumber: 12,
                    splitLine: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: false
                    },
                    splitArea: {
                        show: true,
                        areaStyle: {
                            color: ['rgba(250,250,250,0.0)', 'rgba(2,104,178,0.05)']
                        }
                    }
                }
            ],
            series: [{
                    name: '价格波动',
                    type: 'bar',
                    barWidth: '20%',
                    xAxisIndex: 0,
                    yAxisIndex: 0,
                    itemStyle: {
                        normal: {
                            barBorderRadius: 30,
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1, [{
                                        offset: 0,
                                        color: '#05BBB9'
                                    },
                                    {
                                        offset: 1,
                                        color: '#93D56A'
                                    }
                                ]
                            )
                        }
                    },
                    data: yData,
                    zlevel: 10
                },
                {
                    name: '背景',
                    type: 'bar',
                    barWidth: '30%',
                    xAxisIndex: 0,
                    yAxisIndex: 1,
                    barGap: '-135%',
                    data: [max, max, max, max, max, max, max, max, max, max, max, max],
                    itemStyle: {
                        normal: {
                            color: 'rgba(2,104,178,0.1)'
                        }
                    },
                    zlevel: 9
                }
            ]
        };

        this.bar_shop_obj.setOption(option);
    },

    //最新商品价格变动柱状图
    bar_newShop: function () {
        this.bar_newShop_obj = echarts.init(document.getElementById('radioBar_newShop'));
        var data = [{
                "name": "苹果",
                "value": 10
            }, {
                "name": "香蕉",
                "value": 20
            }, {
                "name": "榴莲",
                "value": 30
            }, {
                "name": "蒜苗",
                "value": 40
            }, {
                "name": "小米",
                "value": 50
            }, {
                "name": "韭菜",
                "value": 22
            }, {
                "name": "鲫鱼",
                "value": 32
            },
            {
                "name": "芒果",
                "value": 72
            },
            {
                "name": "大枣",
                "value": 62
            },
            {
                "name": "砂糖橘",
                "value": 48
            },
            {
                "name": "柚子",
                "value": 56
            },
            {
                "name": "白菜",
                "value": 10
            }
        ];

        var xData = [],
            yData = [];
        var min = 0;
        var max = 0;
        data.map(function (a, b) {
            xData.push(a.name);
            max = max < a.value ? a.value : max;
            if (a.value === 0) {
                yData.push(a.value + min);
            } else {
                yData.push(a.value);
            }
        });
        max = (Math.floor(max / 10) + 1) * 10;
        max = max > 100 ? max : 100;

        var option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'line',
                    lineStyle: {
                        opacity: 0
                    }
                },
                formatter: function (prams) {
                    if (prams[0].data === min) {
                        return "商品价格:0"
                    } else {
                        return "商品价格：" + prams[0].data
                    }
                }
            },
            toolbox: {
                show: true,
                feature: {
                    magicType: {
                        type: ['line', 'bar']
                    }
                }
            },
            grid: {
                left: '0%',
                right: '0%',
                bottom: '5%',
                top: '7%',
                height: '85%',
                containLabel: true,
                z: 22
            },
            xAxis: [{
                type: 'category',
                gridIndex: 0,
                data: xData,
                axisTick: {
                    alignWithLabel: true
                },
                axisLine: {
                    lineStyle: {
                        color: '#04366e'
                    }
                },
                axisLabel: {
                    show: true,
                    color: '#6DF6F5',
                    fontSize: 12,
                    rotate: 45
                }
            }],
            yAxis: [{
                    type: 'value',
                    gridIndex: 0,
                    splitLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    min: min,
                    max: max,
                    axisLine: {
                        lineStyle: {
                            color: '#04366e'
                        }
                    },
                    axisLabel: {
                        color: '#6DF6F5',
                        formatter: '{value}'
                    }
                },
                { //图层背景
                    type: 'value',
                    gridIndex: 0,
                    min: min,
                    max: max,
                    splitNumber: 12,
                    splitLine: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: false
                    },
                    splitArea: {
                        show: true,
                        areaStyle: {
                            color: ['rgba(250,250,250,0.0)', 'rgba(2,104,178,0.05)']
                        }
                    }
                }
            ],
            series: [{
                    name: '价格变化',
                    type: 'bar',
                    barWidth: '20%',
                    xAxisIndex: 0,
                    yAxisIndex: 0,
                    itemStyle: {
                        normal: {
                            barBorderRadius: 30,
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1, [{
                                        offset: 0,
                                        color: '#FDDC00'
                                    },
                                    {
                                        offset: 1,
                                        color: '#FC4039'
                                    }
                                ]
                            )
                        }
                    },
                    data: yData,
                    zlevel: 10
                },
                {
                    name: '背景',
                    type: 'bar',
                    barWidth: '30%',
                    xAxisIndex: 0,
                    yAxisIndex: 1,
                    barGap: '-135%',
                    data: [max, max, max, max, max, max, max, max, max, max, max, max],
                    itemStyle: {
                        normal: {
                            color: 'rgba(2,104,178,0.1)'
                        }
                    },
                    zlevel: 9
                }
            ]
        };

        this.bar_newShop_obj.setOption(option);
    }
}

//处理地图数据
function convertData(data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var geoCoord = echartsObj.geoCoordMap[data[i].name];
        if (geoCoord) {
            res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value),
                gather: data[i].gather
            });
        }
    }
    return res;
};

//地图数据切换
$('.changeBtn ul').on('click', 'li', function () {
    $(this).addClass('active').siblings().removeClass('active');
    if ($(this).index() == 0) {
        echartsObj.geoCoordMap = { //位置坐标
            '新坝镇菜场': [119.73, 32.26],
            '三茅镇菜场': [119.80, 32.24],
            '开发区菜场': [119.85, 32.19],
            '油坊镇菜场': [119.80, 32.14],
            '八桥镇菜场': [119.88, 32.12],
            '西来桥镇菜场': [119.91, 32.03]
        };
        echartsObj.mapData = [{
                name: '新坝镇菜场',
                value: 219,
                gather: true
            },
            {
                name: '三茅镇菜场',
                value: 339,
                gather: true
            },
            {
                name: '开发区菜场',
                value: 412,
                gather: false
            },
            {
                name: '油坊镇菜场',
                value: 429,
                gather: false
            },
            {
                name: '八桥镇菜场',
                value: 389,
                gather: true
            },
            {
                name: '西来桥镇菜场',
                value: 352,
                gather: false
            }
        ];
    } else if ($(this).index() == 1) {
        echartsObj.geoCoordMap = { //位置坐标
            '新坝镇药店': [119.76, 32.28],
            '三茅镇药店': [119.83, 32.26],
            '开发区药店': [119.85, 32.19],
            '油坊镇药店': [119.80, 32.14],
            '八桥镇药店': [119.88, 32.12],
            '西来桥镇药店': [119.91, 32.03]
        };
        echartsObj.mapData = [{
                name: '新坝镇药店',
                value: 219,
                gather: true
            },
            {
                name: '三茅镇药店',
                value: 339,
                gather: true
            },
            {
                name: '开发区药店',
                value: 412,
                gather: false
            },
            {
                name: '油坊镇药店',
                value: 429,
                gather: false
            },
            {
                name: '八桥镇药店',
                value: 389,
                gather: true
            },
            {
                name: '西来桥镇药店',
                value: 352,
                gather: false
            }
        ];
    }
    var option = echartsObj.mapObj.getOption();
    option.series[0].data = convertData(echartsObj.mapData);
    option.series[1].data = convertData(echartsObj.mapData.sort(function (a, b) {
        return b.value - a.value;
    }).slice(0, 9))
    // console.log(option);
    echartsObj.mapObj.setOption(option);
})


window.onresize = function () {
    echartsObj.pie_market_obj.resize();
    echartsObj.pie_shop_obj.resize();
    echartsObj.pie_pharmacy_obj.resize();
    echartsObj.linear_market_obj.resize();
    echartsObj.linear_shop_obj.resize();
    echartsObj.linear_pharmacy_obj.resize();
    echartsObj.pie_property_obj1.resize();
    echartsObj.pie_property_obj2.resize();
    echartsObj.mapObj.resize();
    echartsObj.bar_shop_obj.resize();
    echartsObj.bar_newShop_obj.resize();
}