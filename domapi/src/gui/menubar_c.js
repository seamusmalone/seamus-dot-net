// Copyright 2001-2003, Nebiru Software
// www.domapi.com
core.loadUnit("menu");core.registerComponent("menubar");function Menubar(arg){arg.w=core.rInt(arg["w"],450);var e=core._component(arg,"menubar");e.style.cursor="default";e.autoHeight=typeof arg["h"]=="undefined";e.setZ(1);e.isOpened=false;if(e.autoHeight)e.setH(25);e.setP([core.rInt(e.theme.bdrWidth,1)*2,0]);e.hideAllMenus=core.comps.menu.hideAllMenus;core.disallowSelect(e);e.reDraw();return e};core.comps.menubar.reDraw=function(){this.menubarReDraw();this.onredraw()};core.comps.menubar.menubarReDraw=function(){this.setB(this.theme.bdrWidth);this.setColor(this.theme.ctrlFgColor);this.setBgColor(this.theme.ctrlBgColor);this.style.font=this.theme.ctrlFont;this.style.borderStyle=this.theme.bdrSolid;this.style.borderColor=this.theme.getOutset();var t;for(var b=0;b<this.childNodes.length;b++){t=this.childNodes[b].style;t.borderColor=this.theme.ctrlBgColor;t.backgroundColor=this.theme.ctrlBgColor;t.color=this.theme.ctrlFgColor;t.font=this.theme.ctrlFont;if(this.childNodes[b].dropDown){this.childNodes[b].dropDown.theme=this.theme;this.childNodes[b].dropDown.reDraw()}}};core.comps.menubar.addItem=function(caption,fn,desiredWidth){if(core.isIE50)caption="&nbsp;"+caption+"&nbsp;";this.appendChild(Menuitem({parent:this,caption:caption,fn:fn}));var t=this.childNodes[this.childNodes.length-1];t.dw=core.rInt(desiredWidth,130);t.isOpened=false;t.theme=this.theme;t=t.style;t.font=this.theme.ctrlFont;t.borderWidth=this.theme.bdrWidth;t.borderStyle=this.theme.bdrSolid;t.borderColor=this.theme.ctrlBgColor;t.top="2px";return this.childNodes[this.childNodes.length-1]};core.comps.menubar.hlCol=function(t){t.style.borderColor=this.theme.getInset();if(t.dropDown){t.style.backgroundColor=this.theme.hlBgColor;t.style.color=this.theme.hlFgColor}};core.comps.menubar.deHlCol=function(t){t.style.borderColor=this.theme.ctrlBgColor;t.style.backgroundColor=this.theme.ctrlBgColor;t.style.color=this.theme.ctrlFgColor};core.comps.menubar.onmouseover=function(e){var temp=core.findTarget(e,"MENUITEM");if(!temp)return;if(!temp.enabled)return;core.preventBubble(e);if(this.isOpened){this.hlCol(temp);if(temp.dropDown){if(!temp.isOpened){this.hideAllMenus();this.moveChildMenu(temp);temp.isOpened=true}}else this.hideAllMenus()}else temp.style.borderColor=this.theme.getOutset()};core.comps.menubar.onmouseout=function(e){var temp=core.findTarget(e,"MENUITEM");if(!temp)return;if(!temp.enabled)return;core.preventBubble(e);this.deHlCol(temp);temp.style.borderColor=this.theme.ctrlBgColor};core.comps.menubar.onclick=function(e){core.preventBubble(e);var temp=core.findTarget(e,"MENUITEM");if(!temp){this.hideAllMenus();return};if(!temp.enabled)return;this.hlCol(temp);if(temp.isOpened){this.hideAllMenus();this.isOpened=false}else{if(temp.dropDown)this.moveChildMenu(temp);temp.isOpened=true;this.isOpened=true}};core.comps.menubar.moveChildMenu=function(m){var x,y;x=m.offsetLeft+this.offsetLeft;y=this.offsetHeight+this.offsetTop-1;m.dropDown.moveTo(x,y);m.dropDown.show()};
