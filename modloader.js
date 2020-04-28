var mcws=require("mcws");
var running=0;
var arr=[];
var server=new mcws(function(choise,message,conn){
	if(choise=="create"){
		conn.sendcommand('/say Welcome Use Mod-loader which is develop by edwinlao');
		conn.sendcommand('/say type ./help to get some information.');
	}
	else{
		if(message.body&&message.body.eventName&&message.body.eventName=="PlayerMessage"){
		var lmessage=message.body.properties.Message;
		if(lmessage=="./help"){
			conn.sendcommand("/say ./help:Show This information.");
			conn.sendcommand("/say ./addmod %modname%:load a mod");
			conn.sendcommand("/say ./runmod:Start Mod");
			conn.sendcommand("/say ./stopmod:Stop mod");
			conn.sendcommand("/say ./bye:close the websocket");
			conn.sendcommand("/say ./run %commandname%:Run a command");
		}
		else if(lmessage.slice(0,2+6)=="./addmod"){
			arr[arr.length]=require(".\\mods\\"+lmessage.slice(9,16384));
			conn.sendcommand("/say Loading mod:"+lmessage.slice(9,16384));
		}
		else if(lmessage=="./runmod"){
			console.log("Mod was loaded");
			running=1;
			conn.sendcommand("/say Mod was loaded");
			for (var stc=0;stc<arr.length;stc++)
				if(arr[stc].onmessage("create",message,conn))return;
		}
		else if(lmessage=="./stopmod"){
			console.log("Mod was stoped");
			running=0;
			conn.sendcommand("/say Mod was stoped");
		}
		else if(lmessage=="./bye"){
			console.log("WebSocket was stoped");
			running=0;
			conn.sendcommand("/say WebSocket was stoped");
			conn.sendcommand("/say Thanks for use this addon.");
			conn.sendcommand("/closewebsocket");
		}
		else if(lmessage.slice(0,2+3)=="./run"){
			conn.sendcommand(lmessage.slice(6,16384));
		}
		else{
				if(running==0){
				if(lmessage.slice(0,2)=="./"){
					conn.sendcommand("/say You sended "+lmessage.slice(0,2+3));
					conn.sendcommand("/say Unknown command because you haven't started the server.Now we'll show some helps.");
					conn.sendcommand("/say ./help:Show This information.");
					conn.sendcommand("/say ./modload %modname%:load a mod");
					conn.sendcommand("/say ./runmod:Start Mod");
					conn.sendcommand("/say ./stopmod:Stop mod");
					conn.sendcommand("/say ./bye:close the websocket");
					conn.sendcommand("/say ./run %commandname%:Run a command");
				}
				
			}
		}
		}
		if(running){
			for (var stc=0;stc<arr.length;stc++)
				if(arr[stc].onmessage(choise,message,conn))return;
		}
	}
},8900);