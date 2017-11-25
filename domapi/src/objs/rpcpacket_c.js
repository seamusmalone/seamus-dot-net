// Copyright 2001-2003, Nebiru Software
// www.domapi.com
core.loadUnit("list");RPCPacket=function(url,statusText){this.guid=core.guid();this.url=core.rVal(url);this.data=new List();this.statusText=core.rVal(statusText,core.getString("RPC_DEF_STATUS"))};RPCPacket.prototype.loadFromForm=function(f){this.data.loadFromForm(f,true)};
