var ws = require("nodejs-websocket");
var child_process = require('child_process');
var fs = require("fs")
console.log("Started to Create...")
Date.prototype.format = function(fmt)
{ 
var o = {
"M+" : this.getMonth()+1, //月份
"d+" : this.getDate(), //日
"h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时
"H+" : this.getHours(), //小时
"m+" : this.getMinutes(), //分
"s+" : this.getSeconds(), //秒
"q+" : Math.floor((this.getMonth()+3)/3), //季度
"S" : this.getMilliseconds() //毫秒
};
if(/(y+)/.test(fmt))
fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
for(var k in o)
if(new RegExp("("+ k +")").test(fmt))
fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
return fmt;
}
var server = ws.createServer(function(conn){
conn.on("text", function (str) {
	try{
	var parsed=JSON.parse(str);
	console.log(parsed);
	var message=parsed.body.properties.Message,sender=parsed.body.properties.Sender;
	var argv=message.split(" ");
	if(argv[0]=="#mod")
	{
		if(argv.length<3)
		conn.sendText(`{
	"body": {
		"origin": {
			"type": "player"
		},
		"commandLine": "/tell `+sender+` 参数数量不够",
		"version": 1
	},
	"header": {
		"requestId": "00000000-0000-0000-0000-000000000000",
		"messagePurpose": "commandRequest",
		"version": 1,
		"messageType": "commandRequest"
	}
}`);
		if(argv[1]=="add"||argv[1]=="apply"||argv[1]=="load")
		{
		eval(argv[2]+"=require('"+argv[2]+"');");
		}
		if(argv[1]=="del"||argv[1]=="delete"||argv[1]=="unload")
		{
			eval(argv[2]+"=undefined;");
		}
	}
	else
	{
		if(argv[0]){
		function poststr(execstr){
	conn.sendText(`{
	"body": {
		"origin": {
			"type": "player"
		},
		"commandLine": "`+execstr+`",
		"version": 1
	},
	"header": {
		"requestId": "00000000-0000-0000-0000-000000000000",
		"messagePurpose": "commandRequest",
		"version": 1,
		"messageType": "commandRequest"
	}
}`);
		}
		var strr=argv[0]+".onmessage(message,argv,poststr,sender);";
		eval(strr)
		if(eval(argv[0]).needtime)
		{
			setInterval(eval(argv[0]).ontime,eval(argv[0]).timeinterval);
		}
		}
	}
	}catch(e){
		console.log(e);
	}
})
    conn.on("close", function (code, reason) {
        console.log("关闭连接",+code+","+reason)
});
    conn.on("error", function (code, reason) {
        console.log("异常关闭")
});
setTimeout(function(){
		var eventlist=["BossKilled","CraftingSessionCompleted","PlayerTravelled","ScreenChanged","MobKilled","EntitySpawned","PlayerMessage","CommandRequest","CommandResponse"];
	for (var ss=0;ss<eventlist.length;ss++)
	        conn.sendText(`{
	"body": {
		"eventName": "`+eventlist[ss]+`"
	},
	"header": {
		"requestId": "00000000-0000-0000-0000-000000000000",
		"messagePurpose": "subscribe",
		"version": 1,
		"messageType": "commandRequest"
	}
}`);
},5000);

}).listen(8900)

console.log("WebSocket done")