// Copyright 2001-2003, Nebiru Software
// www.domapi.com
core.debug={consoleBg:"#000000",consoleFg:"#FFFFFF",consoleFont:'8pt "Courier New", Courier, monospace',propBg:"#E7EAEF",propFg:"#000000",propIsDivBg:"#66cccc",propIsElmBg:"#33ccff",propIsCompBg:"#ffcc33",_propWin:null,_consoleWin:null,_controlsWin:null,_debugstack:null,_prevdebugstack:null,_orgPropObj:null,_baseDiv:[],_baseElm:[],_baseComp:[],_basesBuilt:false,_doDiv:true,_doElm:true,_doComp:true};core.debug._buildBases=function(){if(this._basesBuilt)return;this.basesBuilt=true;d1=document.createElement("DIV");for(var i in d1)this._baseDiv.push(i);this._baseDiv.sort();d2=core.createElm();for(var i in d2)if(this._baseDiv.indexOf(i)==-1)this._baseElm.push(i);this._baseElm.sort();core.registerComponent("dummy");d2=core._component({x:0,y:0,w:1,h:1},"dummy",true);for(var i in d2)if(this._baseDiv.indexOf(i)==-1&&this._baseElm.indexOf(i)==-1)this._baseComp.push(i);this._baseComp.sort()};core.debug._viewBase=function(f){var t,a,d;this._doDiv=f.divs.checked;this._doElm=f.elms.checked;this._doComp=f.comp.checked;var trs=this._propWin.debug_bot.document.getElementsByTagName('TR');for(a=0;a<trs.length;a++){d='block';if(trs[a].isDiv!="-1"&&!this._doDiv)d='none';if(trs[a].isElm!="-1"&&!this._doElm)d='none';if(trs[a].isComp!="-1"&&!this._doComp)d='none';trs[a].style.display=d}};core.debug._propSelAll=function(f,b){f.divs.checked=b;f.elms.checked=b;f.comp.checked=b;this._viewBase(f)};onunload=function(){core.debug.closeConsole();core.debug.closeProps()};core.debug._htmlEscape=function(name,text){if(name=="outerHTML"||name=="innerHTML")text=text.replace(/</g,"&lt;").replace(/>/g,"&gt;");if(text.substr(0,7)=="[object"&&isNaN(name))text='<a href="#" onclick="parent.opener.core.debug.dump_props(parent.opener.core.debug._debugstack.'+name+')">'+text+'</a>';return text};core.debug.closeProps=function(){if(this._propWin&&!this._propWin.closed)this._propWin.close()};core.debug.dump_props=function(obj,doDiv,doElm,doComp){if(this._orgPropObj==null)this._orgPropObj=obj;this._doDiv=core.rVal(doDiv,true);this._doElm=core.rVal(doElm,true);this._doComp=core.rVal(doComp,true);this._buildBases();var place=this._propWin==null||this._propWin.closed;this._prevdebugstack=this._debugstack;this._debugstack=obj;if(!this._propWin||core.rVal(this._propWin.closed,true))this._propWin=open("about:blank","_propWin","scrollbars=yes,resizable=yes");if(place){var h=parseInt(screen.availHeight);var w=parseInt(parseInt(screen.availWidth)*0.35);this._propWin.moveTo(0,0);this._propWin.resizeTo(w,h);top.moveTo(w,0);h=parseInt(parseInt(screen.availHeight)*0.75);top.resizeTo(parseInt(screen.availWidth)-w,h);top.focus()}var result='<html><head><title>DomAPI Property Explorer</title><script>onload=function(){opener.core.debug._debug_loaded()}</script></head><frameset rows="'+(core.isNS?140:140)+',*" framespacing="0"><frame name="debug_top" frameborder="1" src="about:blank" scrolling="no" noresize><frame name="debug_bot" frameborder="0" src="about:blank"></frameset></html>';this._propWin.document.open();this._propWin.document.writeln(result);this._propWin.document.close();this._propWin.focus()};core.debug._debug_loaded=function(){result='<html><head><style>body{background-color:buttonface;color:buttontext;font:10pt Arial,Helvetica,sans-serif;margin:10px;padding:0px"}button{font:10pt Arial,Helvetica,sans-serif"}</style></head><body><form name="f1"><button'+(this._orgPropObj==this._debugstack?" disabled":"")+' onclick="parent.opener.core.debug.dump_props(parent.opener.core.debug._prevdebugstack)"><b>&lt;</b> Back</button>&nbsp;<button onclick="top.debug_bot.doPrint()"><b></b> Print</button>&nbsp;<button onclick="parent.opener.core.debug.closeProps()">Close <b>X</b></button><br /><br /><fieldset style="padding:5px 10px"><legend>Filters</legend>&nbsp;<a href="#" onclick="top.opener.core.debug._propSelAll(document.f1,true);return false">Select All</a> :: <a href="#" onclick="top.opener.core.debug._propSelAll(document.f1,false);return false">Select None</a><br /><br /><input type="Checkbox" id="divs" onclick="top.opener.core.debug._viewBase(this.form)"'+(this._doDiv?' checked':'')+'><label for="divs" style="background-color:'+this.propIsDivBg+'">HTMLElement</label> <input type="Checkbox" id="elms" onclick="top.opener.core.debug._viewBase(this.form)"'+(this._doElm?' checked':'')+'><label for="elms" style="background-color:'+this.propIsElmBg+'">Elm</label> <input type="Checkbox" id="comp" onclick="top.opener.core.debug._viewBase(this.form)"'+(this._doComp?' checked':'')+'><label for="comp" style="background-color:'+this.propIsCompBg+'">Component Base</label></fieldset></form></body></html>';this._propWin.debug_top.document.writeln(result);this._dump_debug_bot()};core.debug._dump_debug_bot=function(){var hasValues='<table cellpadding="0" cellspacing="0" border="0" id="has">';var noValues='<table cellpadding="0" cellspacing="0" border="0" id="hasnot">';var properties=[];var whatIs="";var t,c,d,isDiv,isElm,isComp;for(var i in this._debugstack)properties[properties.length]=i;properties.sort();for(i=0;i<properties.length;i++){t=properties[i];isDiv=core.debug._baseDiv.indexOf(t);isElm=core.debug._baseElm.indexOf(t);isComp=core.debug._baseComp.indexOf(t);whatIs=' isDiv="'+isDiv+'" isElm="'+isElm+'" isComp="'+isComp+'"';d='block';if(isDiv>-1&&!this._doDiv)d='none';if(isElm>-1&&!this._doElm)d='none';if(isComp>-1&&!this._doComp)d='none';c=this.propDefBg;if(isDiv>-1)c=this.propIsDivBg;if(isElm>-1)c=this.propIsElmBg;if(isComp>-1)c=this.propIsCompBg;var temp=String(this._debugstack[t]);if(temp.toLowerCase().slice(0,8)=="function")temp="function()";if(temp!=""&&temp!="null")hasValues+='<tr'+whatIs+' style="display:'+d+'"><td style="font-weight:bold;background-color:'+c+'">'+t+'</td><td>'+this._htmlEscape(t,temp)+'</td></tr>';else noValues+='<tr'+whatIs+' style="display:'+d+'"><td style="background-color:'+c+'">'+t+'</td><td>'+temp+'</td></tr>'}hasValues+='</table>';noValues+='</table>';var result='<html><head><style>body,td{font:8pt monospace;color:'+this.propFg+';background-color:'+this.propBg+'}td{vertical-align:top;border:0px solid silver;border-bottom-width:1px}</style><script>function doPrint(){print()}</script></head><body>'+hasValues+"<hr />"+noValues+'</body></html>';this._propWin.debug_bot.document.writeln(result)};core.debug.dump_var=function(s){this.bringUpConsole();this._consoleWin.document.writeln("<span style='font:"+this.consoleFont+"'>]"+s+"</span><br />");with(this._consoleWin)window.scrollTo(0,document.height?document.height:document.body.scrollHeight);this._consoleWin.focus();this._controlsWin.focus();top.focus()};core.debug.bringUpConsole=function(){var place=false;var t;if(this._consoleWin==null||this._consoleWin.closed){place=true;this._consoleWin=open("about:blank","_consoleWin","width=100,height=100,scrollbars=yes,resizable=yes");t='<html><head><title>DomAPI Console</title></head><body style="background-color:'+this.consoleBg+';color:'+this.consoleFg+'">Loading...</body></html>';this._consoleWin.document.writeln(t)}else this._consoleWin.focus();if(this._controlsWin==null||this._controlsWin.closed){place=true;this._controlsWin=open("about:blank","_controlsWin","width=100,height=100,scrollbars=no,resizable=no");t='<html><head><title>DomAPI Console Helper</title><style>td{font:10pt sans-serif}</style></head><body style="background-color:buttonface;color:buttontext" marginheight="0" marginwidth="0"><div style="float:right;margin-top:-10px"><a href="#" onclick="opener.core.debug.clearConsole();return false">Clear</a><br /><br /><a href="#" onclick="opener.core.debug.closeConsole();return false">Close All</a></div><table border="0" cellpadding="0" cellspacing="0" style="margin-top:-10px"><form name="f1" action="#" onsubmit="this.b1.onclick();return false"><tr><td>Var Name:</td><td><input type="Text" name="e1" value="core.version" width="25" style="font:8pt monospace"> <input type="Button" name="b1" style="width:90px;height:22px" value="Get Value" onclick="opener.core.debug.dump_var(this.form.e1.value+\'=\'+eval(\'opener.\'+this.form.e1.value))"></td></tr></form><tr><td colspan="2"><hr noshade /></td></tr><form name="f2" action="#" onsubmit="this.b2.onclick();return false"><tr><td align="right">Evaluate:</td><td><input type="Text" name="e2" value="alert(\'test\')" width="25" style="font:8pt monospace"> <input type="Button" name="b2" style="width:90px;height:22px" value="Go" onclick="eval(this.form.e2.value)"></td></tr></form></table></form></body></html>';this._controlsWin.document.writeln(t)}else this._controlsWin.focus();if(place){var controlsH=100;var h=parseInt(screen.availHeight)-controlsH;var w=parseInt(parseInt(screen.availWidth)*0.35);this._consoleWin.moveTo(0,0);this._consoleWin.resizeTo(w,h);this._controlsWin.moveTo(0,h);this._controlsWin.resizeTo(w,-controlsH);top.moveTo(w,0);h=parseInt(parseInt(screen.availHeight)*0.75);top.resizeTo(parseInt(screen.availWidth)-w,h);this.clearConsole();this.dump_var("Ready.")}};core.debug.clearConsole=function(){if(this._consoleWin&&!this._consoleWin.closed)this._consoleWin.document.body.innerHTML="";this.dump_var("Ready.")};core.debug.closeConsole=function(){if(this._consoleWin&&!this._consoleWin.closed)this._consoleWin.close();if(this._controlsWin&&!this._controlsWin.closed)this._controlsWin.close()};core.debug._profileStartTime=null;core.debug.startProfile=function(s){this._profileStartTime=new Date().getTime();this.dump_var("Starting "+s)};core.debug.endProfile=function(s,cont){this._profileStartTime=new Date().getTime()-this._profileStartTime;this.dump_var("Ending "+s+" "+this._profileStartTime+" ms");if(cont)this.startProfile(s)};core.debug.showLibs=function(){core.debug.dump_var('START "DUMP LOADED UNITS"');var src=[];var ext=[];var gui=[];var hr="--------------------------";core.debug.dump_var(hr);core.debug.dump_var("Compression: "+(core.compressed?"ON":"OFF"));var l=core.libs;for(var a=0;a<l.length;a++)if(l.rootDir.indexOf(l[a])>-1)src[src.length]=l[a];else if(l.extDir.indexOf(l[a])>-1)ext[ext.length]=l[a];else gui[gui.length]=l[a];if(src.length>0){core.debug.dump_var(hr);core.debug.dump_var("src/");core.debug.dump_var(hr);for(a=0;a<src.length;a++)core.debug.dump_var(src[a])}if(ext.length>0){core.debug.dump_var(hr);core.debug.dump_var("src/ext/");core.debug.dump_var(hr);for(a=0;a<ext.length;a++)core.debug.dump_var(ext[a])}if(gui.length>0){core.debug.dump_var(hr);core.debug.dump_var("src/gui/");core.debug.dump_var(hr);for(a=0;a<gui.length;a++)core.debug.dump_var(gui[a])}core.debug.dump_var(hr);core.debug.dump_var('END "DUMP LOADED UNITS"');core.debug.dump_var("Ready.")};core.debug.dump=function(obj,dump){var mem=[];for(var a in obj)mem.push("<b>"+a+"</b>="+obj[a]);mem.sort();if(dump)this.dump_var(mem.toString().replace(/\,/g,"<br />"));mem=mem.toString().replace(/\,/g,"\n");return mem};
