// Copyright 2001-2003, Nebiru Software
// www.domapi.com
core.loadUnit("animate");core.registerComponent("news");function News(arg){w=core.rInt(arg["w"],200);h=core.rInt(arg["h"],100);arg.w=w;arg.h=h;var e=core._component(arg,"news");e.obj1=core.createElm(e,0,0,w,h);e.obj2=core.createElm(e,0,0,w,h);e.style.cursor="default";e.setOverflow("hidden");e.obj1.setP(5);e.obj2.setP(5);e.fromY=-h;e.items=[];e.itemIndex=-1;e.pause=7000;e.timerH=null;e.isRunning=false;e.speed=20;e.steps=50;e.direct=1;e.fromX=0;e.reDraw();return e};core.comps.news.reDraw=function(){this.newsReDraw();this.onredraw()};core.comps.news.newsReDraw=function(){this.setB(this.theme.bdrWidth);this.style.backgroundColor=this.theme.bgColor;this.style.color=this.theme.fgColor;this.style.borderColor=this.theme.bdrColor;this.style.borderStyle=this.theme.bdrSolid};core.comps.news.direction=function(direct){this.direct=direct;switch(direct){case 1:this.fromX=0;this.fromY=-this.getH();break;case 2:this.fromX=-this.getW();this.fromY=-this.getH();break;case 3:this.fromX=-this.getW();this.fromY=0;break;case 4:this.fromX=-this.getW();this.fromY=this.getH();break;case 5:this.fromX=0;this.fromY=this.getH();break;case 6:this.fromX=this.getW();this.fromY=this.getH();break;case 7:this.fromX=this.getW();this.fromY=0;break;case 8:this.fromX=this.getW();this.fromY=-this.getH();break}};core.comps.news.reset=function(){this.stop();this.obj1.moveTo(0,0);this.obj2.moveTo(this.fromX,this.fromY);this.itemIndex=0};core.comps.news.start=function(){this.reset();if(this.items.length>0)this.obj1.setText(this.items[this.itemIndex]);this.isRunning=true;this.direction(this.direct);if(this.items.length<1)return;this.obj1.setZ(0);this.obj2.setZ(1);this.obj2.setText(this.items[this.itemIndex]);this.timerH=setInterval("core.bags.elms["+this.domAPIIndex+"].slide()",this.pause)};core.comps.news.stop=function(){if(this.timerH)clearInterval(this.timerH);this.isRunning=false};core.comps.news.addItem=function(sent){this.items[this.items.length]=sent};core.comps.news.slide=function(){var elm=core.bags.elms[this.domAPIIndex];elm.itemIndex++;if(elm.itemIndex>(elm.items.length-1))elm.itemIndex=0;elm.obj1.setText(elm.obj2.innerHTML);elm.obj2.setText(elm.items[elm.itemIndex]);elm.obj1.moveTo(0,0);elm.obj2.moveTo(elm.fromX,elm.fromY);elm.obj1.glideTo(0-elm.fromX,0-elm.fromY,3,elm.steps,elm.speed);elm.obj2.glideTo(0,0,3,elm.steps,elm.speed)};
