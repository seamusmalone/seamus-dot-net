// Copyright 2001-2003, Nebiru Software
// www.domapi.com
core.loadUnit("rpcpacket");core.rpc={};core.rpc.doDebug=false;core.rpc.timeout=30000;core.rpc.lastError="";core.rpc._handlers=[];core.rpc._thandlers=[];core.rpc._inMotion=[];core.headTag=null;core.rpc.onsend=function(packet){};core.rpc.onreceive=function(packet){};core.rpc.ontimeout=function(packet){};core.rpc.sendPacket=function(packet,recvHandler,timeout,timeoutHandler){try{if(this.doDebug)alert("Sending packet "+packet.guid);if(recvHandler)this._handlers.push([packet.guid,recvHandler]);if(timeoutHandler)this._thandlers.push([packet.guid,timeoutHandler]);return this._dispatch(packet,timeout)}catch(E){if(this.doDebug)alert("Error in sendPacket:"+E.message);this.lastError=E.message;return-1}};core.rpc.receivePacket=function(packet){try{if(this.doDebug)alert("Receiving packet "+packet.guid);var found=false;for(var a=0;a<this._inMotion.length;a++)if(this._inMotion[a].guid==packet.guid){this._inMotion.deleteItem(a);found=true}if(!found){this.lastError=core.getString("RPC_TIMED_OUT");if(this.doDebug)alert(this.lastError);return-2}this.onreceive(packet);if(this.doDebug)alert("_handlers="+this._handlers);for(a=0;a<this._handlers.length;a++)if(this._handlers[a][0]==packet.guid){if(this.doDebug)alert("Handler found for packet "+packet.guid);var recvHandler=this._handlers[a][1];if(recvHandler&&recvHandler!="undefined"){var obj=null;var fn=recvHandler;var params=[packet];if(typeof(recvHandler)=="object"){obj=recvHandler.obj;fn=recvHandler.fn;params=params.concat(recvHandler.params);if(this.doDebug)if(obj)alert("OO with object, obj: "+obj+"\nfn:\n"+fn+"\nparams: "+params.toString());else alert("OO with null-object, obj: "+obj+"\nfn:\n"+fn+"\nparams: "+params.toString())}else if(this.doDebug)alert("Non-OO, obj: "+obj+"\nfn:\n"+fn+"\nparams: "+params.toString());fn.apply(obj,params)}this._handlers.deleteItem(a);break}status=defaultStatus;var t=document.getElementById(packet.guid);if(t){if(this.headTag)this.headTag.removeChild(t);else throw({message:core.getString("RPC_NO_HEAD1")})}else throw({message:core.getString("RPC_NO_SCRIPT")});return 1}catch(E){if(this.doDebug)alert("Error in receivePacket:"+E.message);this.lastError=E.message;return-1}};core.rpc._dispatch=function(p,timeout){try{if(!p)return-2;var d=p.data;var url=p.url;url+=(p.url.indexOf("?")!=-1)?"&":"?";url+="guid="+p.guid;url+="&"+d.saveToString("&","=",true);if(this.doDebug)alert("Dispatching: "+url);var scriptTag=document.createElement("SCRIPT");scriptTag.src=url;scriptTag.type="text/javascript";scriptTag.defer=true;scriptTag.id=p.guid;if(!this.headTag)this.headTag=this._getHeadTag();if(!this.headTag)throw({message:core.getString("RPC_NO_HEAD2")});status=p.statusText;this._inMotion.push(p);this.headTag.appendChild(scriptTag);setTimeout("core.rpc._timeoutHandler('"+p.guid+"')",timeout==null?this.timeout:timeout*1000);this.onsend(p);return 1}catch(E){if(this.doDebug)alert("Error in _dispatch:"+E.message);this.lastError=E.message;return-1}};core.rpc._getHeadTag=function(){var h=document.getElementsByTagName("HEAD");return(h.length>0)?h[0]:null};core.rpc._timeoutHandler=function(guid){var found_thandler=false;for(var a=0;a<this._inMotion.length;a++)if(this._inMotion[a].guid==guid){for(var b=0;b<this._thandlers.length;b++)if(this._thandlers[b][0]==guid){found_thandler=true;this._inMotion.deleteItem(a);var timeoutHandler=this._thandlers[b][1];if(timeoutHandler&&timeoutHandler!="undefined"){var obj=null;var fn=timeoutHandler;var params=[];if(typeof(timeoutHandler)=="object"){obj=timeoutHandler.obj;fn=timeoutHandler.fn;params=params.concat(timeoutHandler.params);if(this.doDebug)if(obj)alert("OO with object, obj: "+obj+"\nfn:\n"+fn+"\nparams: "+params.toString());else alert("OO with null-object, obj: "+obj+"\nfn:\n"+fn+"\nparams: "+params.toString())}else if(this.doDebug)alert("Non-OO, obj: "+obj+"\nfn:\n"+fn+"\nparams: "+params.toString());fn.apply(obj,params)}this._thandlers.deleteItem(b);break}if(!found_thandler){this.ontimeout(this._inMotion[a]);this._inMotion.deleteItem(a)}}};
