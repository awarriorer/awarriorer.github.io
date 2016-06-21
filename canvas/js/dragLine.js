/*
	dataLine.uncle 1.0.0
	作者：uncle·yang
	github:
	功能介绍：

*/

;(function(){
	'use strict';
	var $;
	/*===========================
    dataLine.uncle
    ===========================*/

    var drawData = function(container, params){
    	if (!(this instanceof drawData)) return new drawData(container, params);

    	//设置默认参数
		var defaults = {
			drawstyle:"lineChart",
			//样式设置
			bgColor:"#fff",
			canvasWidth:container.width(),
			canvasHeight:container.height(),
			//折线图
			bgLineWidth:1,
			bgLineColor:"#c1c1c1",

			//数据
			start:0,
			data:{
				numArr:[],
				titleArr:[]
			}
		};
		//defaults end!

		/*
			初始化默认值
		*/
		params = params || {};
		for (var def in defaults) {
	        if (typeof params[def] === 'undefined') {
	            params[def] = defaults[def];
	        }
	        else if (typeof params[def] === 'object') {
	            for (var deepDef in defaults[def]) {
	                if (typeof params[def][deepDef] === 'undefined') {
	                    params[def][deepDef] = defaults[def][deepDef];
	                }
	            }
	        }
	    }

	    // dataLine
        var d = this;

        d.params = params;

        d.classNames = [];

        //初始化 $
        if (typeof $ === 'undefined') {
            if (typeof Dom7 === 'undefined') {
                $ = window.Dom7 || window.Zepto || window.jQuery;
            }
            else {
                $ = Dom7;
            }
            if (!$) return;
        }

        d.$ = $;

        //初始化变量
        d.initVal(container);
        //程序入口
        d.init();

    }
    //初始化变量
    drawData.prototype.initVal = function(container){
    	var self   = this;
    	var params = self.params;

    	//声明元素
    	params.$canvas = $("<canvas>");//创建jquery元素
    	params.canvas  = params.$canvas[0];//获取js对象
    	params.context = params.canvas.getContext("2d");//绘制环境

    	self.container = container;

    }

    //初始化方法
    drawData.prototype.init = function(){
    	var self   = this;
    	var params = self.params;

    	//填充背景色
		params.$canvas.css({
			'background-color':params.bgColor
		});
		params.canvas.width  = params.canvasWidth;
		params.canvas.height = params.canvasHeight;

		//追加元素
		self.container.append(params.$canvas);

		//要画的类型
		if ( params.drawstyle != undefined ) {
			self[params.drawstyle]();
		}else{
			console.erro("你传入的drawStyle不合法！");
		}
    }

    //折线图
    drawData.prototype.lineChart = function(){
    	var self   = this;
    	var params = self.params;

    	console.log("开始画折线图！");

    	//画竖线，背景线
    	self.drawVerticalLine();

    }

    //画竖线
    drawData.prototype.drawVerticalLine = function(){
    	var self   = this;
    	var params = self.params;

    	var context   = params.context;
    	
    	var distWidth = parseInt(  params.canvasWidth / params.data.numArr.length );

    	context.lineWidth   = params.bgLineWidth;
    	context.strokeStyle = params.bgLineColor; 

    	for (var i = 1; i < params.data.numArr.length; i++) {
    		context.beginPath();
    		context.moveTo( i*distWidth - params.bgLineWidth / 2, 0 );
    		context.lineTo( i*distWidth - params.bgLineWidth / 2, params.canvasHeight );
			context.stroke(); // 进行绘制
    	}

    }

    //画线折线

    window.drawData = drawData;

})()
