// Copyright 2001-2003, Nebiru Software
// www.domapi.com
core.loadUnit("sysutils");function TCookie(){this.name="";this.value=""};core.cookies=[];core.cookies.loaded=false;core.cookies.getValue=function(name,def){if(!this.loaded)this.load();var i=this.indexOf(name);if(i==-1)return def;else return this[i].value};core.cookies.setValue=function(name,value,mins){if(!this.loaded)this.load();var i=this.indexOf(name);if(i==-1)i=this.length;this[i]=new TCookie();this[i].name=sysutils.trim(name);this[i].value=escape(value);mins=mins?mins:40320;var expires=new Date(sysutils.now().getTime()+mins*60*1000);document.cookie=this[i].name+"="+this[i].value+"; expires="+expires.toGMTString()};core.cookies.deleteValue=function(name){if(!this.loaded)this.load();var i=this.indexOf(name);if(i>-1)this.setValue(name,null,-1440)};core.cookies.indexOf=function(name){for(var a=0;a<this.length;a++)if(sysutils.trim(this[a].name.toUpperCase())==sysutils.trim(name.toUpperCase()))return a;return-1};core.cookies.load=function(){this.loaded=true;var temp,a;this.length=0;var list=sysutils.trim(document.cookie);if(list=="")return;list=list.split("; ");for(a=0;a<list.length;a++){temp=list[a].split("=");this[a]=new TCookie;this[a].name=sysutils.trim(temp[0]);this[a].value=unescape(temp[1])}};