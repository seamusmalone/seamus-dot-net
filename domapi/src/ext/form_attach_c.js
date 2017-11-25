// Copyright 2001-2003, Nebiru Software
// www.domapi.com
core._attachToForm=function(f,n,v){e=document.createElement("INPUT");e.setAttribute("type","hidden");e.name=n;f.appendChild(e);if(!core.isNil(v))core._setFormElementValue(e,v);return e};core._setFormElementValue=function(e,v){if(!e)return false;e.value=v;return true};
