//------------------------------------------------------------------------------
// DomAPI core routines
// D. Kadrioski 3/1/2001
// (c) Nebiru Software 2001-2002
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
// utility functions
//------------------------------------------------------------------------------
core.isNil = function(s)  {return s==null || !String(s).length};                                // value is null or blank
core.rInt  = function(s,d){return(core.isNil(s)||isNaN(s))?((core.isNil(d)||isNaN(d))?0:d):parseInt(s)};  // return value if integer else default
core.rVal  = function(s,d){return(core.isNil(s)?(core.isNil(d)?"":d):s)};                                 // return value if not nil else default
//------------------------------------------------------------------------------
core.bodyWidth  = function(){return parseInt(core.isIE?(!core.isStrict?document.body.clientWidth: document.documentElement.clientWidth ):window.innerWidth)};
core.bodyHeight = function(){return parseInt(core.isIE?(!core.isStrict?document.body.clientHeight:document.documentElement.clientHeight):window.innerHeight)};
core.scrollTop  = function(){return core.isIE?document.body.scrollTop:pageYOffset};
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
// base utility functions used by components
//------------------------------------------------------------------------------
core.getElm = function(i){return document.getElementById(i)}; // getElm() is simply shorthand to document.getElementById()
//------------------------------------------------------------------------------
// resolves the target obj of an event
core.getTarget = function(E){return core.isNS?E.target:event.srcElement};
// based on the target node of the event passed, searches up the tree for a particular node
core.findTarget = function(E,k){return core.findParent(core.getTarget(E),k)};
//------------------------------------------------------------------------------
// search up the domtree for a specific node type and returns it (or null if not exists)
core.findParent = function(t,k){
  if(!t)return null;
  while(t.parentNode){
    if(t.nodeName==k)return t;
    if(/*t.domAPIObjType && */t.domAPIObjType==k)return t;
    t=t.parentNode;
  }
  return null;
};
//------------------------------------------------------------------------------
core.getNodeIndex = function(n){
  // returns the index of a childnode in relation to it's siblings
  if(!n)return null;
  r=0;
  var t=n.previousSibling;
  while(t){
    r++;
    t=t.previousSibling;
  }
  return r;
};
//------------------------------------------------------------------------------
core.insertElm = function(e,t,w){
  // valid "where" values are beforeBegin, afterBegin, beforeEnd and afterEnd
  // this function removes the elm from the page and re-inserts it at the specified target 
  if(!e)return;
  e.moveTo();
  e.setPosition("relative");
  if(!t)return;
  t.insertAdjacentElement(core.rVal(w,"afterBegin"),e);
};
//------------------------------------------------------------------------------
core.getTrueOffset = function(e){
  var x=0; var y=0;
  if(!e)return [x,y];
  while(e && (e.style.position=="relative" || e.style.position=="absolute")){
    x+=core.rInt(e.offsetLeft);
    y+=core.rInt(e.offsetTop);
    //dump_var([x,y]);
    e=e.parentNode;
  }
  return [x,y];
};
//------------------------------------------------------------------------------
core.disallowSelect = function(e){
  e.onselectstart    = core._onselectstart;
  e.style.userSelect = "none";
};
//------------------------------------------------------------------------------
core._onselectstart = function(){return false};
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
// box methods - these handle taking in optional arrays for setting box properties
// such as margin, padding and borders
// they also ensure a 4 element array is *always* returned when reading these properties
//------------------------------------------------------------------------------
core.boxValuesOut = function(s){
  if(core.isNil(s) || isNaN(parseInt(s)))return [0,0,0,0];
  var a=s.split(" ");
  for(var i=0;i<a.length;i++)a[i]=parseInt(a[i]);
  switch(a.length){
    case 1:a[1]=a[0];a[2]=a[0];a[3]=a[0];break;
    case 2:a[2]=a[0];a[3]=a[1];break;
    case 3:a[3]=a[1];break;
  }
  return a;
};
//------------------------------------------------------------------------------
core.boxValuesIn = function(t,r,b,l){
  if(typeof(t)=="object" && t.length){r=t[1];b=t[2];l=t[3];t=t[0]} // in mozilla an array is always passed as 1 argument
  t=core.rInt(t);
  if(core.isNil(l)){
    if(core.isNil(b)){
      if(core.isNil(r)) {r=t; b=t; l=t}                    // 1 arg: t     -> t t t t
      else{b=t; l=r}                                  // 2 arg: t r   -> t r t r
    }else{
      r=rInt(r);
      l=r;                                            // 3 arg: t r b -> t r b r
    }
  }
  return t+"px "+r+"px "+b+"px "+l+"px";
};
//------------------------------------------------------------------------------