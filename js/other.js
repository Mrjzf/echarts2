var main_ctrl = {
    age: 1,
    init: function () {
        getMaterialResourceStatistics(this.pie.bind(this)); //饼图
        getDiskSpaceStatistics(this.gauge.bind(this)); //仪表
        getTagStatistics(this.tagcloud.bind(this)); //词云标签
        getMaterialAndDownLoadStatistics(); //获取总素材和下载量
        getUserStatistics(); //获取用户统计信息
        this.radioBar(); //中间柱形图
        getOfficeDownNumStatistics(this.top10Bar.bind(this)); //右下角柱形图
        getSafeOperationDays(); //获取系统安全运行天数。
    },
    pieOption: null, //饼状图对象
    pieChart: null, //饼状图对象
    currentIndex: 1, //饼状图自动选择
    gaugeOption: null, //仪表盘对象
    gaugeChart: null, //仪表盘对象
    radioChart: null, //柱形图对象
    radioOption: null, //柱形图对象
    top10Chart: null, //右下角top10柱形图对象
    top10Option: null, //右下角top10柱形图对象
    pie: function (res) {
        // 圆环图
        var dataList = res.data;
        this.pieChart = echarts.init(document.getElementById("pie"));
        var data = [{
                name: "视频",
                value: dataList[2].resourceNum
            },
            {
                name: "图片",
                value: dataList[1].resourceNum
            },
            {
                name: "文档",
                value: dataList[0].resourceNum
            }
        ];

        main_ctrl.pieOption = {
            color: ["#2dee93", "#0095f9", "#dd4b55"],
            animation: true,
            hoverAnimation: true,
            hoverOffset: 0,
            tooltip: {
                trigger: "item",
                formatter: "{a} <br/>{b}:{c} ({d}%)",
                position: function (p) {
                    return [p[0] - 20, p[1] - 20];
                },
                textStyle: {
                    fontSize: 12
                }
            },
            // 设置圆形图中间文字
            graphic: {
                type: "text",
                left: "center",
                top: "center",
                style: {
                    text: "资产统计发布",
                    textAlign: "center",
                    fill: "#fff"
                }
            },

            series: [{
                name: "资产统计",
                type: "pie",
                radius: ["55%", "80%"],
                avoidLabelOverlap: true,
                data: data,
                itemStyle: {
                    normal: {
                        position: "center",
                        label: {
                            show: false
                        },
                        labelLine: {
                            show: false
                        }
                    },
                    emphasis: {
                        position: "center",
                        label: {
                            show: true,
                            position: "outer",
                            textStyle: {
                                fontSize: 12
                            }
                        },
                        labelLine: {
                            show: true,
                            lineStyle: {
                                color: "#445e83"
                            }
                        }
                    }
                }
            }]
        };

        this.pieChart.setOption(this.pieOption);
        this.pieCircle();
    },
    pieCircle: function () {
        //   开启定时器
        main_ctrl.currentIndex = -1;
        this.pieDispatch();
        var self = this;
        setInterval(function () {
            self.pieDispatch();
        }, 3000);
    },
    pieDispatch: function () {
        //   圆环分发
        var dataLength = main_ctrl.pieOption.series[0].data.length;
        // 取消之前高亮的图形
        main_ctrl.pieChart.dispatchAction({
            type: "downplay",
            seriesIndex: 0,
            dataIndex: main_ctrl.currentIndex
        });
        main_ctrl.currentIndex = (main_ctrl.currentIndex + 1) % dataLength;
        // 高亮当前图形
        main_ctrl.pieChart.dispatchAction({
            type: "highlight",
            seriesIndex: 0,
            dataIndex: main_ctrl.currentIndex
        });
        // 显示 tooltip
        main_ctrl.pieChart.dispatchAction({
            type: "showTip",
            seriesIndex: 0,
            dataIndex: main_ctrl.currentIndex
        });
    },
    gauge: function (res) {
        // 仪表盘
        var data = [{
                name: "总空间",
                value: res.data.totleSize
            },
            {
                name: "已使用",
                value: res.data.useSize
            }
        ];
        var barData = [];
        var color = [];
        data.forEach(function (v, i) {
            barData.push(v.name + " " + v.value);
            //    [[0.3, "#2eee92"], [1, "#0090ff"]]
        });
        var percent = parseFloat([data[1].value / data[0].value]).toFixed(3);
        color.push([percent, "#2eee92"]);
        color.push([1, "#0090ff"]);
        this.gaugeChart = echarts.init(document.getElementById("gauge"));
        this.gaugeOption = {
            legend: {
                //配置legend，这里的data，要对应type为‘bar’的series数据项的‘name’名称，作为图例的说明
                data: barData,
                selectedMode: false, //图例禁止点击
                bottom: 0,
                itemWidth: 23,
                itemHeight: 12,
                textStyle: {
                    color: "#fff",
                    fontStyle: "normal",
                    fontWeight: "normal",
                    fontFamily: "sans-serif",
                    fontSize: 11
                }
            },
            grid: {
                z: 1, //grid作为柱状图的坐标系，其层级要和仪表图层级不同，同时隐藏
                show: false,
                left: "-30%",
                right: "4%",
                bottom: "3%",
                containLabel: true,
                splitLine: {
                    show: false //隐藏分割线
                }
            },
            xAxis: [
                //这里有很多的show，必须都设置成不显示
                {
                    type: "category",
                    data: [],
                    axisLine: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    },
                    splitArea: {
                        interval: "auto",
                        show: false
                    }
                }
            ],
            yAxis: [
                //这里有很多的show，必须都设置成不显示
                {
                    type: "value",
                    axisLine: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    }
                }
            ],
            backgroundColor: "rgba(0,0,0,0)",
            tooltip: {
                formatter: "{a} <br/>{b} {c}%"
            },
            series: [{
                    name: "已使用",
                    type: "gauge",
                    z: 3,
                    min: 0,
                    max: 100,
                    splitNumber: 10,
                    radius: "90%", //图例大小
                    axisLine: {
                        // 坐标轴线
                        lineStyle: {
                            // 属性lineStyle控制线条样式
                            width: 10,
                            color: color
                        }
                    },
                    axisTick: {
                        // 坐标轴小标记
                        show: true,
                        length: 15, // 属性length控制线长
                        lineStyle: {
                            // 属性lineStyle控制线条样式
                            color: "auto"
                        }
                    },
                    splitLine: {
                        // 分隔线
                        // show: true,
                        length: 10, // 属性length控制线长
                        lineStyle: {
                            // 属性lineStyle（详见lineStyle）控制线条样式
                            color: "auto"
                        }
                    },
                    axisLabel: {
                        fontSize: 12
                    },
                    detail: {
                        textStyle: {
                            // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                            fontWeight: "bolder",
                            fontSize: 16
                        },
                        offsetCenter: [0, "50%"],
                        formatter: "{value}%"
                    },
                    title: {
                        color: "#fff",
                        // fontWeight: 'bolder',
                        fontSize: 12
                    },
                    data: [{
                        value: percent * 100,
                        name: "空间占用率"
                    }]
                },
                {
                    name: barData[0],
                    type: "bar",
                    barWidth: "60%",
                    data: [0],
                    itemStyle: {
                        normal: {
                            color: "#dd4b55"
                        }
                    }
                },
                {
                    name: barData[1],
                    type: "bar",
                    barWidth: "60%",
                    data: [0],
                    itemStyle: {
                        normal: {
                            color: "#2eee92"
                        }
                    }
                }
            ]
        };
        this.gaugeChart.setOption(this.gaugeOption);
    },
    tagcloud: function (res) {
        var list = res.list;
        var jrrmgj = [];
        list.forEach(function (v, i) {
            jrrmgj.push(v.name);
        });

        var li = "";
        var color = [
            "color_red",
            "color_orange",
            "color_green",
            "color_blue",
            "color_blue2"
        ];

        for (var i = 0; i < jrrmgj.length; i++) {
            li += '<li class="' + color[i % 5] + '">' + jrrmgj[i] + "</li>";
        }
        $(".tags").html(li);

        tagcloud({
            selector: ".tags", //元素选择器
            fontsize: 18, //基本字体大小, 单位px
            radius: 35, //滚动半径, 单位px
            mspeed: "normal", //滚动最大速度, 取值: slow, normal(默认), fast
            ispeed: "normal", //滚动初速度, 取值: slow, normal(默认), fast
            direction: 135, //初始滚动方向, 取值角度(顺时针360): 0对应top, 90对应left, 135对应right-bottom(默认)...
            keep: false //鼠标移出组件后是否继续随鼠标滚动, 取值: false, true(默认) 对应 减速至初速度滚动, 随鼠标滚动
        });
    },
    radioBar: function () {
        getRadioBarData(this.dealwithRadioBar.bind(this));
    },
    dealwithRadioBar: function (res) {
        var result = res.data;
        var timeArray = [];
        var dataOptions = [];
        result.forEach(function (v, i) {
            var loacationData = [];
            var numData = [];
            for (var j = 0; j < v.list.length; j++) {
                loacationData.push(v.list[j].name);
                numData.push(v.list[j].upLoadCount);
            }
            dataOptions.push({
                title: {
                    text: v.staticDate,
                    textStyle: {
                        color: "#fff"
                    }
                },
                grid: {
                    left: 0,
                    containLabel: true
                },
                xAxis: [{
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: "#fff"
                        },
                        nameTextStyle: {
                            color: "#fff"
                        }
                    },
                    splitLine: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    type: "value",
                    axisLabel: {
                        textStyle: {
                            color: "#fff"
                        }
                    }
                }],
                yAxis: [{
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: "#fff"
                            }
                        },
                        splitLine: {
                            show: false
                        },
                        axisLabel: {
                            rotate: 0,
                            margin: 0,
                            interval: 0,
                            fontSize: 12

                            // formatter: function(v) {
                            //   var v = v.length > 4 ? v.substr(0, 4) + "..." : v;
                            //   return v;
                            // }
                        },

                        offset: 0,
                        axisTick: {
                            show: false
                        },
                        type: "category",

                        data: loacationData
                    },
                    {
                        data: [],
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: "#fff"
                            }
                        },
                        type: "category"
                    }
                ],
                series: [{
                    barWidth: 8,
                    name: "效能指数",
                    yAxisIndex: 1,
                    type: "bar",
                    data: numData,
                    itemStyle: {
                        normal: {
                            color: function (params) {
                                if (params.value < 60) return normalcolor;
                                else return maxcolor;
                            },
                            barBorderRadius: [10, 10, 10, 10]
                        },
                        emphasis: {
                            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                    offset: 0,
                                    color: "#2af598"
                                },
                                {
                                    offset: 1,
                                    color: "#009efd"
                                }
                            ]),
                            barBorderRadius: 4
                        }
                    },
                    label: {
                        normal: {
                            show: true,
                            position: "right",
                            formatter: "{c}  ",
                            color: "#fff"
                        }
                    }
                }]
            });
            timeArray.push(v.staticDate);
        });
        this.radioChart = echarts.init(document.getElementById("radioBar"));
        var normalcolor = new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: "#0e9aa2"
            },
            {
                offset: 1,
                color: "#9afb67"
            }
        ]);
        var maxcolor = new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: "#0e9aa2"
            },
            {
                offset: 1,
                color: "#9afb67"
            }
        ]);
        this.radioOption = {
            textStyle: {
                color: "#fff"
            },
            title: {
                textStyle: {
                    color: "#fff"
                }
            },
            timeline: {
                show: true,
                top: "center",
                right: 0,
                height: 300,
                width: 10,
                inverse: true,
                playInterval: 2500,
                symbol: "none",
                orient: "vertical",
                axisType: "category",
                autoPlay: true,
                checkpointStyle: {
                    color: "#fff",
                    borderColor: "rgba(4, 165, 261, .5)"
                },
                lineStyle: {
                    color: "#fff"
                },
                itemStyle: {
                    normal: {
                        color: "#fff"
                    },
                    emphasis: {
                        color: "#fff"
                    }
                },

                controlStyle: {
                    show: true,
                    color: "#fff",
                    borderColor: "#fff",
                    normal: {
                        color: "white"
                    },
                    emphasis: {
                        color: "yellow"
                    },
                    nextIcon: "M765.7 486.8L314.9 134.7c-5.3-4.1-12.9-0.4-12.9 6.3v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1c16.4-12.8 16.4-37.6 0-50.4z",
                    prevIcon: "M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8c-16.4 12.8-16.4 37.5 0 50.3l450.8 352.1c5.3 4.1 12.9 0.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z",
                    stopIcon: "M424 352h-48c-4.4 0-8 3.6-8 8v304c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V360c0-4.4-3.6-8-8-8zM648 352h-48c-4.4 0-8 3.6-8 8v304c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V360c0-4.4-3.6-8-8-8z",
                    playIcon: "M719.4 499.1l-296.1-215c-10.6-7.7-25.3-0.2-25.3 12.9v430c0 13.1 14.8 20.5 25.3 12.9l296.1-215c8.8-6.4 8.8-19.4 0-25.8z m-257.6 134V390.9L628.5 512 461.8 633.1z"
                },
                label: {
                    normal: {
                        show: false
                    }
                },
                data: timeArray
            },
            options: dataOptions
        };
        this.radioChart.setOption(this.radioOption);
    },
    top10Bar: function (res) {
        this.top10Chart = echarts.init(document.getElementById("top10-radio"));
        var list = res.list;
        var data = [];
        list.forEach(function (v) {
            data.push({
                name: v.officeName,
                value: v.downLoadNum
            });
        });

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
        max = this.top10Option = {
            backgroundColor: "rgba(0,0,0,0)", //图层背景
            color: ["#3398DB"],
            tooltip: {
                trigger: "axis",
                axisPointer: {
                    type: "line",
                    lineStyle: {
                        opacity: 0
                    }
                },
                formatter: function (prams) {
                    if (prams[0].data === min) {
                        return "下载量: 0";
                    } else {
                        return "下载量：" + prams[0].data;
                    }
                }
            },
            grid: {
                left: "0%",
                right: "0%",
                bottom: "5%",
                top: "7%",
                height: "85%",
                containLabel: true,
                z: 22
            },
            xAxis: [{
                type: "category",
                gridIndex: 0,
                data: xData,
                axisTick: {
                    alignWithLabel: true
                },
                axisLine: {
                    lineStyle: {
                        color: "#04366e"
                    }
                },
                axisLabel: {
                    show: true,
                    color: "#8ec4e9",
                    fontSize: 12,
                    rotate: 45
                }
            }],
            yAxis: [{
                    type: "value",
                    gridIndex: 0,
                    splitLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    min: 0,
                    max: max,
                    axisLine: {
                        lineStyle: {
                            color: "#04366e"
                        }
                    },
                    axisLabel: {
                        color: "#8ec4e9",
                        formatter: "{value}"
                    }
                },
                {
                    type: "value",
                    gridIndex: 0,
                    min: 0,
                    max: max,
                    splitNumber: 14,
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
                            color: ["rgba(250,250,250,0.0)", "rgba(2,104,178,0.05)"]
                        }
                    }
                }
            ],
            series: [{
                    name: "日排行",
                    type: "bar",
                    barWidth: "30%",
                    xAxisIndex: 0,
                    yAxisIndex: 0,
                    itemStyle: {
                        normal: {
                            barBorderRadius: 30,
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: "#fee300"
                                },
                                {
                                    offset: 1,
                                    color: "#fc3d3b"
                                }
                            ])
                        }
                    },
                    data: yData,
                    zlevel: 11
                },
                {
                    name: "背景",
                    type: "bar",
                    barWidth: "50%",
                    xAxisIndex: 0,
                    yAxisIndex: 1,
                    barGap: "-135%",
                    data: [max, max, max, max, max, max, max, max, max, max],
                    itemStyle: {
                        normal: {
                            color: "rgba(2,104,178,0.1)"
                        }
                    },
                    zlevel: 9
                }
            ]
        };

        this.top10Chart.setOption(this.top10Option);
    }
};

// 获取素材统计
function getMaterialResourceStatistics(callback) {
    $.ajax({
        url: "/mlms/interface/bigData/getMaterialResourceStatistics",
        dataType: "json",
        success: function (res) {
            callback(res);
        }
    });
}
// 获取磁盘空间统计
function getDiskSpaceStatistics(callback) {
    $.ajax({
        url: "/mlms/interface/bigData/getDiskSpaceStatistics",
        dataType: "json",
        success: function (res) {
            callback(res);
        }
    });
}
// 获取热门标签
function getTagStatistics(callback) {
    $.ajax({
        url: "/mlms/interface/bigData/getTagStatistics",
        dataType: "json",
        success: function (res) {
            $(".statistics-box .num")
                .eq(0)
                .html(res.data.tagTotleCount);
            $(".statistics-box .num")
                .eq(1)
                .html(res.data.hotTagCount);
            callback(res);
        }
    });
}
// 获取素材数以及下载数
function getMaterialAndDownLoadStatistics() {
    $.ajax({
        url: "/mlms/interface/bigData/getMaterialAndDownLoadStatistics",
        dataType: "json",
        success: function (res) {
            var data = res.data;
            $(".totalAmout")
                .eq(0)
                .html(data[0].totleNum);
            $(".totalAmout")
                .eq(1)
                .html(data[1].totleNum);
            $(".amount-info")
                .eq(0)
                .html(
                    "文档:" +
                    data[0].docNum +
                    " " +
                    "图片:" +
                    data[0].picNum +
                    " " +
                    "视频:" +
                    data[0].videoNum
                );
            $(".amount-info")
                .eq(1)
                .html(
                    "文档:" +
                    data[1].docNum +
                    " " +
                    "图片:" +
                    data[1].picNum +
                    " " +
                    "视频:" +
                    data[1].videoNum
                );
        }
    });
}
// 获取用户数量统计
function getUserStatistics() {
    $.ajax({
        url: "/mlms/interface/bigData/getUserStatistics",
        dataType: "json",
        success: function (res) {
            var data = res.data;
            $(".users .num")
                .eq(0)
                .html(data.editor);
            $(".users .num")
                .eq(1)
                .html(data.audit);
            $(".users .num")
                .eq(2)
                .html(data.issuer);
            $(".users .num")
                .eq(3)
                .html(data.operator);
        }
    });
}
// 获取政府机构下载量统计
function getOfficeDownNumStatistics(callback) {
    $.ajax({
        url: "/mlms/interface/bigData/getOfficeDownNumStatistics?pageNo=1&pageSize=10",
        dataType: "json",
        success: function (res) {
            callback(res);
        }
    });
}
// 获取政府机构上传排行榜
function getRadioBarData(callback) {
    $.ajax({
        url: "/mlms/interface/bigData/getOfficeUploadRanking?pageNo=1&pageSize=20",
        dataType: "json",
        success: function (res) {
            callback(res);
        }
    });
}
// 获取系统运行天数
function getSafeOperationDays() {
    $.ajax({
        url: "/mlms/interface/bigData/getSafeOperationDays",
        dataType: "json",
        success: function (res) {
            $(".running-time").html(res.operationDays);
        }
    });
}