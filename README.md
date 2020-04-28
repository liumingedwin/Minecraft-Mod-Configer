# Minecraft-Mod-Configer

## 基本使用
一个专为`Minecraft Bedrock Edition`设计的Mod包管理器。首先参考[Minecraft-WebSocket](https://github.com/liumingedwin/mcws)进行安装。然后直接进入控制台，输入`node modloader`即可运行

您需要使用`Node.js`在`mods`文件夹编写项目源代码，像这样
```javascript
var inter;
module.exports.onmessage=function(choise,message,conn){
/*
choise:create/text
create:启用mod
text:事件或发送命令产生的消息
message:消息本体
conn:通信对象
conn.sendcommand("命令"); //发送命令
message.body.properties.Message:在聊天框发送的消息
*/
//书写您的代码

}
```

这是一个mod样例，用于显示时间：
```javascript
var inter;
module.exports.onmessage=function(choise,message,conn){
	if(choise=="create")
	{
		var inter=setInterval(function(){
			var time1 = new Date().format("yyyy-MM-dd HH:mm:ss");
			conn.sendcommand(`/title @a actionbar 时间：${time1}`);
		});
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
```

将它保存至mod\timeshow.js，启动服务器，即可
