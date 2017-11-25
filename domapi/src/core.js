//------------------------------------------------------------------------------
// DomAPI core routines
// D. Kadrioski 3/1/2001
// (c) Nebiru Software 2001-2002
//------------------------------------------------------------------------------
// additional contributors:
// O. Conradi <conradi@cs.utwente.nl>
//------------------------------------------------------------------------------
// special thanks to D. Battini for help with Mac compatability
//------------------------------------------------------------------------------

var core   = new Object();
core.bags  = new Object();
core.comps = new Object();

//------------------------------------------------------------------------------
// this allows you to look up elements in an array  e.g. myArray.indexOf("boo");
// it returns the index of the matching element or -1 if not found
Array.prototype.indexOf = function(s){for(var a=0;a<this.length;a++)if(this[a]==s)return a;return -1};
Array.prototype.deleteItem  = function(i){
  if(i<0||i>(this.length-1))return; // out of range
  if(i==(this.length-1)){ // drop last item            
    this.length--;
    return;
  }
  for(var a=(i+1);a<this.length;a++)
    this[a-1]=this[a];
  this.length--;
};
//------------------------------------------------------------------------------

core.libs                  = ["core"];
core.bags.elms             = [];
core.bags.elms.isComponent = false;

//------------------------------------------------------------------------------
// domapi version and unit loader vars
//------------------------------------------------------------------------------
core.version     = "3.00b2";
core.debug       = false; // can cause some functions to give verbose runtime info, also auto includes debug.js
//------------------------------------------------------------------------------
// code unit loading routines
//------------------------------------------------------------------------------
core.unitLoaded = function(name){return core.libs.indexOf(name)>-1};
//------------------------------------------------------------------------------
core.loadUnit = function(name){
  if(core.unitLoaded(name))return false; // unit was already loaded, nothing to do
  core.libs[core.libs.length]=name;
  core.libs.extDir  = ["animate",  "color",  "drag",     "reflow",   "validate",    "more_themes", "quicksort", 
                       "sysutils", "cookie", "shadow",   "nodesort", "form_attach", "resize", "reflow2"];
  core.libs.rootDir = ["core",     "debug",  "elmproto", "theme",    "corecolor",   "mozillaext",  "coreutil"];
  // all others are assumed to be in gui
  // find subdir
  if(core.libs.rootDir.indexOf(name)>-1)subdir="";else if(core.libs.extDir.indexOf(name)>-1)subdir="ext/";else subdir="gui/";
  // if we are using compression, add the "_c"
  name+=(core.compressed?"_c":"")+".js";
  // load the script
  document.writeln('<script type="text\/javascript" src="'+core.libPath+subdir+name+'"><\/script>');
};
//------------------------------------------------------------------------------
core._getUnitPath = function(name){ // returns false or the path to the unit
  var r=false;
  var i;
  var re=new RegExp("\/?"+name+"[\._]");
  var tags=document.getElementsByTagName("SCRIPT");
  for(var a=0;a<tags.length;a++){
    i=tags[a].src.search(re);
    if(i>-1)r=tags[a].src.substr(0,i+1);
    if(r && name=="core")core.compressed = tags[a].src.search("_c.js") != -1; 
  }
  return r;
};
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
// browser sniffing stuff
//------------------------------------------------------------------------------
core.isDom  = document.getElementById?1:0;
core.isIE   = (navigator.userAgent.indexOf("MSIE" )>0)?1:0;
core.isNS   = (navigator.userAgent.indexOf("Gecko")>0)?1:0;
core.isMac  = (navigator.userAgent.indexOf("Mac"  )>0)?1:0;
core.isIE5  = 0;
core.isIE50 = 0;
core.isIE55 = 0;
core.isIE6  = 0;
core.isIE60 = 0;
if(core.isIE){
  var i    = navigator.appVersion.indexOf("MSIE");
  var temp = navigator.appVersion.substring(i+5,i+8);
  core.isIE50   = (temp=="5.0");
  core.isIE55   = (temp=="5.5");
  core.isIE60   = (temp=="6.0");
  core.isIE6    = core.isIE60;
  core.isIE5    = core.isIE50||core.isIE55;
};
// taken from http://www.your-site.com/~rinfo/case_studies/doctypes.html
// mozilla also has a non standard quirks mode http://mozilla.org/docs/web-developer/quirks/
// ie6 in backcompat mode acts as ie5
core._checkStrict = function(){
  var strict = false;
  if(core.isMac && core.isIE5)return true; // temporary fix!! we need something better
  var d      = document.doctype;
  strict     = (document.compatMode=="CSS1Compat");
  strict     = (d&&d.systemId?(d.systemId.indexOf("strict")>-1?true:(d.publicId.indexOf("transitional")>-1?true:false)):(d&&d.publicId.indexOf("transitional")==-1?true:strict));
  strict     = (d&&d.name.indexOf(".dtd")>-1)?true:strict;
  return strict;
};
core.isStrict    = core._checkStrict();
core.needsBoxFix = (core.isIE5)||(core.isIE60 && !core.isStrict);
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
// global constants
//------------------------------------------------------------------------------
core.libPath          = core._getUnitPath(   "core");   // obviously this unit is loaded if this code executes ;)
core.imagePath        = core.libPath       + "gui/images/"; 
if(core.debug)          core.loadUnit(       "debug");  // load the debug unit automatically if needed
core.bodyElm          = function(){return document.body};  
core.cursors          = new Object();
core.cursors.hand     = core.isIE5?"hand":"pointer";
core.cursors.vertBeam = core.isIE?(core.isIE5?"move":"col-resize"):"move";
core.cursors.horzBeam = core.isIE?(core.isIE5?"move":"row-resize"):"move";
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
// load dependancies
//------------------------------------------------------------------------------
core.loadUnit("elmproto");
core.loadUnit("theme");
core.loadUnit("coreutil");
core.loadUnit("corecolor");
core.loadUnit("form_attach");
if(core.isNS)core.loadUnit("mozillaext");
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
// event support (addEvent() and removeEvent() from D. Battini)
//------------------------------------------------------------------------------
core.addEvent = function(o,t,fn,useCapture){
  if(o.addEventListener){   // NS/MOZ DOMs evt
    o.addEventListener(t,fn, useCapture);
    return true;
  }else if(o.attachEvent){  // IEs DOMs evt
    var addEvnRt = o.attachEvent("on"+t,fn);
    return addEvnRt;
  }else if(core.isDom && core.isMac && core.isIE5){ // IEs/IE5/51+ MacOS
    this.eVelm = o;
    eval(this.eVelm["on"+t]=fn);
  }else
    alert("Handler could not be attached");
};
//------------------------------------------------------------------------------
core.removeEvent = function(o,t,fn,useCapture){
  if(o.removeEventListener){ // NS/MOZ DOMs evt
    o.removeEventListener(t,fn, useCapture);
    return true;
  }else if(o.detachEvent){   // IEs DOMs evt
    var remEvnRt = o.detachEvent("on"+t,fn);
    return remEvnRt;
  }else if(core.isDom && core.isMac && core.isIE5){ // IEs/IE5/51+ MacOS
    this.eVelmRem = o; 
    eval(this.eVelmRem["on"+t]=null);
  }else
    alert("Handler could not be removed");
};
//------------------------------------------------------------------------------
core.preventBubble = function(E){
  if(core.isIE){
    event.cancelBubble=true;
    event.returnValue=false;
  }else{
    if(E.stopPropagation)E.stopPropagation();
    else E.preventBubble();
  }
};
//------------------------------------------------------------------------------