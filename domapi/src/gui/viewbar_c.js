// Copyright 2001-2003, Nebiru Software
// www.domapi.com
core.registerComponent("viewbar");core.viewbarShared={};core.comps.viewbar.defDelimter="/";function Viewbar(arg){var e=core._component(arg,"viewbar");e.exclusive=true;e.selected=null;e.selectedGroup=null;e.onchange=function(){};e.onbeforechange=function(){return true};e.showSelection=true;e.setOverflow("auto");e.groups=[];e.groups.parentNode=e;e.groups.add=core.viewbarShared._addGroup;core.disallowSelect(e);e.onredrawitem=function(n){};e.reDraw();return e};core.comps.viewbar.reDraw=function(){this.viewbarReDraw();this.onredraw()};core.comps.viewbar.viewbarReDraw=function(){var t=this.theme;var s=this.style;this.setB(t.bdrWidth);s.borderStyle=this.doBorder?t.bdrSolid:"none";this.setBgColor(this.doBGFill?t.bgColor:"transparent");this.setColor(t.fgColor);s.borderColor=t.getInset();s.scrollbarBaseColor=t.ctrlBgColor;s.font=t.font;var b;for(var a=0;a<this.groups.length;a++)this.reDrawGroup(this.groups[a])};core.comps.viewbar.reDrawGroup=function(g){for(var a=0;a<g.childNodes.length;a++)this.reDrawItem(g.childNodes[a])};core.comps.viewbar.reDrawItem=function(n){var t=this.theme;var s=n.style;if(n.isHeader){s.backgroundColor=t.ctrlBgColor;s.color=t.ctrlFgColor;s.borderStyle=t.bdrOutset;s.borderWidth=t.bdrWidth;s.borderColor=t.bdrColor;s.font=t.ctrlFont}else if(n.selected&&this.showSelection){s.backgroundColor=t.selBgColor;s.color=t.selFgColor;s.borderColor=t.ctrlBgColor;s.font=t.selFont}else{s.backgroundColor=this.doBGFill?t.bgColor:"transparent";s.color=t.fgColor;s.borderColor=t.ctrlBgColor;s.font=t.font}this.onredrawitem(n)};core.comps.viewbar.selectItem=function(n){if(!this.onbeforechange(n))return false;this.selected=n;this.selectedGroup=n.parentNode;var g=this.groups;for(var b=0;b<g.length;b++)for(var a=0;a<g[b].childNodes.length;a++)if(g[b].childNodes[a].selected){g[b].childNodes[a].selected=false;this.reDrawItem(g[b].childNodes[a])}n.selected=true;if(n.fn)eval(n.fn);this.reDrawItem(n);this.setFormValue(this.hiddenE);this.onchange()};core.comps.viewbar.setExclusive=function(b){this.exclusive=b;if(b&&this.selectedGroup){for(var a=0;a<this.groups.length;a++)if(this.groups[a]!=this.selectedGroup)this.groups[a].collapseGroup()}};core.comps.viewbar.onmouseover=function(e){if(!this.doRollover||!this.enabled)return;var temp=core.findTarget(e,"VIEWBARITEM");if(!temp||(temp.selected&&this.showSelection)||temp.isHeader)return;var t=this.theme;var s=temp.style;s.color=t.hlFgColor;s.backgroundColor=t.hlBgColor;s.font=t.hlFont;this.onredrawitem(temp)};core.comps.viewbar.onmouseout=function(e){if(!this.doRollover||!this.enabled)return;var temp=core.findTarget(e,"VIEWBARITEM");if(!temp)return;this.reDrawItem(temp)};core.comps.viewbar.onmousedown=function(e){if(!this.enabled)return;var temp=core.findTarget(e,"VIEWBARITEM");if(!temp)return;if(this.doDepress)this.setBorderIn(temp)};core.comps.viewbar.onmouseup=function(e){if(!this.enabled)return;var n=core.findTarget(e,"VIEWBARITEM");if(!n)return;var g=n.parentNode;if(this.doDepress)this.setBorderOut(n);if(!n.isHeader)this.selectItem(n);else{if(g.isCollapsed)g.expandGroup();else g.collapseGroup()}};core.comps.viewbar.setBorderOut=function(n){if(n.isHeader)n.style.borderWidth=this.theme.bdrWidth;else n.style.borderWidth="0px 0px 1px 0px"};core.comps.viewbar.setBorderIn=function(n){var w=parseInt(this.theme.bdrWidth);if(n.isHeader)n.style.borderWidth=(w*2)+"px 0px 0px "+(w*2)+"px";else n.style.borderWidth="1px 0px 0px 0px"};core.comps.viewbar.attachToForm=function(f,n){this.hiddenE=core._attachToForm(f,n);this.setFormValue(this.hiddenE)};core.comps.viewbar.setFormValue=function(e){if(!e)return;var t="";var s=this.selected;if(!s)return;var r=s.value;if(!r)r=s.innerHTML;r=core.findParent(s,"VIEWBARGROUP").value+core.comps.viewbar.defDelimter+r;e.value=r};core.viewbarShared._addGroup=function(caption,v){var g=document.createElement("DIV");g.id=this.parentNode.id+"_GROUP_"+this.parentNode.childNodes.length;g.domAPIObjType="VIEWBARGROUP";g.value=core.rVal(v,caption);var s=g.style;s.margin="0px";s.listStyle="none";s.overflow="hidden";if(core.isNS)s.paddingLeft="0px";this[this.length]=g;this.parentNode.appendChild(g);var t=core.viewbarShared;g.add=t._addToGroup;g.collapseGroup=t._collapseGroup;g.expandGroup=t._expandGroup;g.isCollapsed=true;g.add(caption,null,null,true);this.parentNode.onredrawitem(this[this.length-1]);return this[this.length-1]};core.viewbarShared._addToGroup=function(caption,v,fn,isHeader){var e=document.createElement("DIV");e.id=this.id+"_"+this.childNodes.length;e.domAPIObjType="VIEWBARITEM";e.innerHTML=caption;e.value=v;e.fn=fn;e.isHeader=isHeader;e.selected=false;var t=e.style;t.borderStyle="solid";t.borderWidth="0px 0px 1px 0px";t.paddingTop="1px";t.paddingBottom="1px";t.paddingLeft="5px";t.position="relative";if(isHeader){t.cursor=core.cursors.hand;t.fontWeight="bold";t.paddingTop="3px";t.paddingBottom="3px"}else{t.display="none";t.cursor="default"}this.appendChild(e);this.parentNode.reDrawItem(e);return e};core.viewbarShared._collapseGroup=function(){var c=this.childNodes;if(!c)return;this.isCollapsed=true;for(var a=1;a<c.length;a++)c[a].style.display="none"};core.viewbarShared._expandGroup=function(){var p=this.parentNode;var c=this.childNodes;if(p.exclusive)for(var a=0;a<p.groups.length;a++)p.groups[a].collapseGroup();this.isCollapsed=false;for(a=1;a<c.length;a++)c[a].style.display="block"};