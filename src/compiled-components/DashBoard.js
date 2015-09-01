var Ractive = require('ractive');

var __options__ = {
	template: {v:3,t:[{p:[1,1,0],t:7,e:"div",a:{"class":"dashboard"},f:[{p:[2,2,25],t:7,e:"div",a:{"class":"clearfix"},f:[{p:[3,3,50],t:7,e:"span",a:{"class":"pull-left"},f:[{p:[4,4,78],t:7,e:"button",a:{"class":"btn btn-primary btn-xl"},v:{click:"popUp"},f:[{p:[4,60,134],t:7,e:"i",a:{"class":"glyphicon glyphicon-signal"}}]}]}," ",{p:[6,3,198],t:7,e:"span",a:{"class":"pull-right"},f:[{p:[7,12,235],t:7,e:"div",a:{"class":"dropdown mr10",style:"display: inline"},f:[{p:[8,20,306],t:7,e:"button",a:{"class":"btn btn-primary dropdown-toggle",type:"button",id:"dropdownMenu1","data-toggle":"dropdown","aria-expanded":"true"},f:["选择 ",{p:[10,21,479],t:7,e:"span",a:{"class":"caret"}}]}," ",{p:[12,21,557],t:7,e:"ul",a:{"class":"dropdown-menu",role:"menu","aria-labelledby":"dropdownMenu1"},f:[{t:4,f:[{p:[14,25,692],t:7,e:"li",a:{role:"presentation"},f:[{p:[15,26,742],t:7,e:"a",a:{role:"menuitem",tabindex:"-1",href:"#"},v:{click:{n:"changeUrl",d:[{t:2,r:"url",p:[15,79,795]}]}},f:[{t:2,r:"name",p:[15,97,813]}]}]}],r:"dropdownLinks",p:[13,22,649]}]}]}," ",{p:[19,13,929],t:7,e:"button",a:{"class":"btn btn-primary btn-xl mr5"},f:["统计"]}]}]}," ",{p:[22,2,1003],t:7,e:"div",a:{id:[{t:2,r:"chartWrap",p:[22,11,1012]}]}}]}]},
},
component={},
__prop__,
__export__;
function formatter(response){
    	var _data=response.data;
    	if(!_data){
    		return null;
    	}
    	var series=[];
    	for(var _key in _data){
    		var _name=_key;
    		var _items=_data[_key];
    		var _oneSeries={};
    		_oneSeries.name=_name;
    		var _stData=[];
			$.each(_items,function(i,element){
				if(element.value){
					var _stItem={};
					_stItem.y=parseFloat(element.value);
					_stItem.x=parseInt(element._collectDate_);
					_stData.push(_stItem);
				}
			});
			_oneSeries.data=_stData;
			series.push(_oneSeries);
    	}
    	return series;
    }
var chart;

component.exports = {
	oninit:function(){
		//加载图表
		this.on('loadChart',function(){
			var _this = this;
			var _ajax = _this.get('ajax');
			//console.log(formatter(res))
			//new CLineChart('chartWrap', {series:formatter(res)}, true);

			if(_this.get('ajax').url){
                $.ajax({
                    url:_ajax.url,
                    type:_ajax.type?_ajax.type:"GET",
                    dataType:_ajax.dataType?_ajax.dataType:"json",
                    data:_ajax.data
                }).done(function(response){
                    if(response.success){
                    	if(!chart){
                    		var chartWrap = _this.get('chartWrap')
                        	chart = new CLineChart(chartWrap, {series:formatter(response)}, true);
                     	}else{
                     		var series=formatter(response);
                     		$.each(series,function(i,element){
                     			if(i<chart.series.length){
                     				chart.series[i].update(element);
                     			}
                     			else{
                     				chart.addSeries(element);
                     			}
                     		})
                     		chart.series = formatter(response);
                     	}
            			
                    }
                });
            }
		});
		


		this.on('changeUrl',function(e,url){
			event.original.preventDefault();
			console.log(url)
		});

		this.on('popUp',function(){
			//$("#pop-up-modal").modal('show');
		});

		
	},
	oncomplete:function(){
		var _this = this;
		_this.fire('loadChart');
	
	},
	data:function(){
		return {
			dropdownLinks:[],
			displayOptions:[{value:1,text:"1小时"},{value:3,text:"3小时"},{value:6,text:"6小时"},{value:12,text:"12小时"},{value:24,text:"1天"},{value:168,text:"7天"},{value:720,text:"30天"},{value:"my",text:"自定义"}],
			ajax:{
	            url:"",
	            type:"",
	            dataType:"",
	            data:""
        	},
        	chartWrap:""
		}
	}
}
if ( typeof component.exports === "object" ) {
	for ( __prop__ in component.exports ) {
		if ( component.exports.hasOwnProperty(__prop__) ) {
			__options__[__prop__] = component.exports[__prop__];
		}
	}
}

__export__ = Ractive.extend( __options__ );
module.exports = __export__;