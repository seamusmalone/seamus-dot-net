// Copyright 2001-2003, Nebiru Software
// www.domapi.com
core.loadUnit("speedbutton");core.registerComponent("toolbar");function Toolbar(arg){arg.w=core.rInt(arg["w"],400);arg.h=core.rInt(arg["h"],32);var e=core._component(arg,"toolbar");var t=core.comps.toolbar;core.disallowSelect(e);e.reDraw();return e};core.comps.toolbar.reDraw=function(){this.toolbarReDraw();this.onredraw()};core.comps.toolbar.toolbarReDraw=function(){this.setB(this.theme.bdrWidth);this.style.borderColor=this.theme.getOutset();this.style.backgroundColor=this.theme.ctrlBgColor;this.style.borderStyle=this.theme.bdrSolid;this.style.cursor="default";var t;for(a=0;a<this.childNodes.length;a++){t=this.childNodes[a];if(typeof t.reDraw=="function"){t.theme=this.theme;t.reDraw()}if(t.domAPIObjType=="TOOLBARSPACER")t.setH(this.getH()-6)}};core.comps.toolbar.spaceControls=function(spacing){if(!this.childNodes)return false;spacing=core.rInt(spacing,2);var i=spacing+1;var t;for(a=0;a<this.childNodes.length;a++){t=this.childNodes[a];t.moveTo(i,(t.domAPIObjType=="TOOLBARSPACER")?3:spacing);i=i+spacing+t.getW()}};core.comps.toolbar.addSpacer=function(spacing){var space=core.createElm(this,null,null,core.rInt(spacing,12),this.getH());var line=core.createElm(space,null,null,2,23);with(line.style){borderStyle="inset";borderWidth="1px";overflow="hidden"}space.style.textAlign="center";space.domAPIObjType="TOOLBARSPACER"};