// Copyright 2001-2003, Nebiru Software
// www.domapi.com
core.keyboard=new Object();core.keyboard.keys=new Array();core.keyboard.lastKey=null;core.keyboard._shift=false;core.keyboard._ctrl=false;core.keyboard.onKeyDown=null;core.keyboard.onKeyUp=null;core.keyboard._events=new Object();core.keyboard.on=function(){core.addEvent(document,"keydown",core.keyboard._keyDown,true);core.addEvent(document,"keyup",core.keyboard._keyUp,true);core.addEvent(window,"blur",core.keyboard._clearAllKeys,true)};core.keyboard._keyDown=function(e){e=(core.isIE)?window.event:e;core.keyboard._recordKey(e.keyCode,e.ctrlKey,e.shiftKey,e.metaKey);if(core.keyboard.onKeyDown)core.keyboard.onKeyDown()};core.keyboard._keyUp=function(e){e=(core.isIE)?window.event:e;core.keyboard._clearKey(e.keyCode,e.ctrlKey,e.shiftKey,e.metaKey);if(core.keyboard.onKeyUp)core.keyboard.onKeyUp()};core.keyboard.off=function(){core.removeEvent(document,"keydown",core.keyboard._onKeyDown,true);core.removeEvent(document,"keyup",core.keyboard._onKeyUp,true)};core.keyboard._recordKey=function(keyCode,ctrlKey,shiftKey,metaKey){var c=core.keyboard;c.shift=shiftKey?true:false;c.ctrl=ctrlKey?true:false;if(keyCode){var exists=false;for(var k=0;k<c.keys.length;k++){if(c.keys[k]==keyCode)exists=true}if((!exists)||(c.keys.length==0)){c.keys[c.keys.length]=keyCode;var key=String.fromCharCode(keyCode);key=key.toUpperCase();c.lastKey=key;core.keyboard._dispEvents(key)}}};core.keyboard._clearKey=function(keyCode,ctrlKey,shiftKey,metaKey){var c=core.keyboard;c.shift=shiftKey?true:false;c.ctrl=ctrlKey?true:false;if((c.keys.length==1)&&(c.keys[0]==keyCode)){c.keys.deleteItem(0)}else{for(var k=0;k<c.keys.length;k++){if(c.keys[k]==keyCode)c.keys.deleteItem(k)}}};core.keyboard._clearAllKeys=function(){var c=core.keyboard;for(var i=0;i<c.keys.length;i++){if(core.keyboard.onKeyUp)core.keyboard.onKeyUp()}c.shift=false;c.ctrl=false;c.keys=new Array()};core.keyboard.addEvent=function(key,func){var c=core.keyboard;e=c._events[key.toUpperCase()];if(e)e[e.length]=func;else c._events[key.toUpperCase()]=[func]};core.keyboard.removeEvent=function(key,func){var c=core.keyboard;e=c._events[key.toUpperCase()];if(!e)return 0;var i=e.indexOf(func);if(i==-1)return 0;e.deleteItem(i);return 1};core.keyboard._dispEvents=function(key){var c=core.keyboard;e=c._events[key];if(!e)return;for(var a=0;a<e.length;a++)e[a](key)};core.keyboard.isShift=function(){return core.keyboard.shift};core.keyboard.isCtrl=function(){return core.keyboard.ctrl};core.keyboard.isKey=function(key){var c=core.keyboard;var exists=false;for(var k=0;k<c.keys.length;k++){var a=String.fromCharCode(c.keys[k]);if(a.toUpperCase()==key.toUpperCase())exists=true}return exists};core.keyboard.on();
