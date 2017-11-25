//------------------------------------------------------------------------------
// DomAPI core routines
// D. Kadrioski 3/1/2001
// (c) Nebiru Software 2001-2002
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
// color stuff
// this is just the base code to support core.js
// if you want more color functionallity, loadUnit("color");
//------------------------------------------------------------------------------

var color = new Object();

color.hexToInt = function(h){return parseInt(h.substring(1),16)};
//------------------------------------------------------------------------------
color.intToHex = function(i){
  i=i.toString(16);
  while(i.length<6)i="0"+i;
  return "#"+i;
};
//------------------------------------------------------------------------------
color.rgbToHex = function(s){
  // takes in an rgb array and returns the hex value
  // the complimentary function, hexToRGB() is located in ext/color_c.js
  var n  = Math.round(s[2]);
      n += Math.round(s[1]) << 8;
      n += Math.round(s[0]) << 16;
  return color.intToHex(n);
};
//------------------------------------------------------------------------------
color.makeSureIsHexColor = function(s){
  // netscape 6 seems to return colors in rgb(0,0,0) format, even in you set
  // the color using hex format #FFFFFF.
  // this function will detect that and convert it to hex for use in the other
  // color routines (lightenColor, darkenColor, etc...)
  // - new in 2.07
  // If color_c.js has been included on this page, then this function can attempt
  // to resolve color constants such as "red" into their hex equivalents
  if(s.substring(0,4)=="rgb("){                              // must be ns, of course
    var temp=s.split("rgb(")[1].split(",");                  // pull out rgb values
    for(var i=0;i<temp.length;i++)temp[i]=parseInt(temp[i]); // convert them to integers
    return(color.rgbToHex(temp));                            // turn it into hex and exit
  }else{
    if(core.isNil(s))   return s;     // nothing to do
    if(s.charAt(0)=="#")return s;     // must already be hex 
    // might be a color constant
    if(core.unitLoaded("color")){     // looks like color_c.js has been included
      var i=color.lookupColorNames.indexOf(s); // attempt to lookup color constant
      if(i>0)s="#"+color.lookupColors[i];      // return the hex value for this constant
    }
    return s;
  }
};
//------------------------------------------------------------------------------