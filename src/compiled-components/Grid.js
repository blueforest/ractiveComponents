var Ractive = require('ractive');

var __options__ = {
	template: {v:3,t:[{p:[1,1,0],t:7,e:"table",a:{"class":"table"},f:[{p:[2,5,26],t:7,e:"tbody",f:[{p:[3,13,46],t:7,e:"tr",f:[{t:4,f:[{p:[5,21,100],t:7,e:"td",f:[{t:2,r:".label",p:[5,25,104]}]}],r:"columns",p:[4,17,67]}]}," ",{t:4,f:[{p:[9,17,214],t:7,e:"tr",f:[{t:4,f:[{p:[11,25,288],t:7,e:"td",f:[{t:2,rx:{r:"rows",m:[{t:30,n:"rowIndex"},{t:30,n:".field"}]},p:[12,29,321]}]}],i:"columnIndex",r:"columns",p:[10,21,239]}]}],i:"rowIndex",r:"rows",p:[8,13,179]}]}]}]},
},
component={},
__prop__,
__export__;
component.exports= {
    onint:function(){
        this.on('load',function(){
            var _ajax = this.get('ajax');
            var _this = this;
            if(this.get('ajax').url){
                $.ajax({
                    url:_ajax.url,
                    type:_ajax.type?_ajax.type:"GET",
                    dataType:_ajax.dataType?_ajax.dataType:"json",
                    data:_ajax.data
                }).done(function(response){
                    if(response.success){
                        _this.set('rows',response.items)
                    }
                });
            }
        });
        this.fire('load')
    },
    data: {
        ajax:{
            url:"",
            type:"",
            dataType:"",
            data:""
        },
        columns: [],
        rows: []
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