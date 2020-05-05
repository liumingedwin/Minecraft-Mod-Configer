var inter;
module.exports.onmessage=function(choise,message,conn){
	if(choise=="create")
	{
		inter=setInterval(function(){
			var time1 = new Date().format("yyyy-MM-dd HH:mm:ss");
			conn.sendcommand(`/title @a actionbar 时间：${time1}`);
		},2000);
		return true;
	}
	else{
	if(message.body&&message.body.eventName&&message.body.eventName=="PlayerMessage"){
		var lmessage=message.body.properties.Message;
		if(lmessage=="clearinterval")
			clearInterval(inter);
	}
	}
}
