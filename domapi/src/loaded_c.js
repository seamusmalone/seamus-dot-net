// Copyright 2001-2003, Nebiru Software
// www.domapi.com
if(core.doSplash){core.splashSlide=function(){var e=core.getElm("domapi_splash");var y=parseInt(e.offsetTop);var x=parseInt(e.offsetLeft);if(y>-30){e.style.top=(y-1)+"px";if(core.isIE){e.style.left=x+"px";e.style.right="0px"}setTimeout("core.splashSlide()",10)}else e.style.visibility="hidden"};setTimeout("core.splashSlide()",2000)}
