// Copyright 2001-2003, Nebiru Software
// www.domapi.com
core._xbmtree1=function(){var t=this;t.width=16;t.height=16;t.get=function(i,nm){i=core.rVal(i,"blank");nm=core.rVal(nm,i);return "#define "+nm+"_width "+this.width+"\n#define "+nm+"_height "+this.height+"\nstatic char "+nm+"_bits[] = "+this[i]};t.blank="{0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00};";t.root="{0x00,0x01,0x80,0x02,0x78,0x04,0x2c,0x08,0x14,0x71,0x8c,0x62,0xff,0x4f,0x55,0x95,0xab,0x5a,0x56,0x75,0xaa,0x6a,0x56,0x75,0xac,0x6a,0xfc,0x7f,0xf8,0x3f,0x00,0x00};";t.pathI="{0x80,0x00,0x00,0x00,0x80,0x00,0x00,0x00,0x80,0x00,0x00,0x00,0x80,0x00,0x00,0x00,0x80,0x00,0x00,0x00,0x80,0x00,0x00,0x00,0x80,0x00,0x00,0x00,0x80,0x00,0x00,0x00};";t.pathT="{0x80,0x00,0x00,0x00,0x80,0x00,0x00,0x00,0x80,0x00,0x00,0x00,0x80,0x00,0x00,0x00,0x80,0xaa,0x00,0x00,0x80,0x00,0x00,0x00,0x80,0x00,0x00,0x00,0x80,0x00,0x00,0x00};";t.pathL="{0x80,0x00,0x00,0x00,0x80,0x00,0x00,0x00,0x80,0x00,0x00,0x00,0x80,0x00,0x00,0x00,0x80,0xaa,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00};";t.boxMax="{0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0xf8,0x0f,0x08,0x08,0x88,0x08,0x88,0x08,0xe8,0xab,0x88,0x08,0x88,0x08,0x08,0x08,0xf8,0x0f,0x00,0x00,0x00,0x00,0x00,0x00};";t.boxMin="{0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0xf8,0x0f,0x08,0x08,0x08,0x08,0x08,0x08,0xe8,0xab,0x08,0x08,0x08,0x08,0x08,0x08,0xf8,0x0f,0x00,0x00,0x00,0x00,0x00,0x00};";t.boxMaxT="{0x80,0x00,0x00,0x00,0x80,0x00,0x00,0x00,0xf8,0x0f,0x08,0x08,0x88,0x08,0x88,0x08,0xe8,0xab,0x88,0x08,0x88,0x08,0x08,0x08,0xf8,0x0f,0x00,0x00,0x80,0x00,0x00,0x00};";t.boxMinT="{0x80,0x00,0x00,0x00,0x80,0x00,0x00,0x00,0xf8,0x0f,0x08,0x08,0x08,0x08,0x08,0x08,0xe8,0xab,0x08,0x08,0x08,0x08,0x08,0x08,0xf8,0x0f,0x00,0x00,0x80,0x00,0x00,0x00};";t.boxMaxL="{0x80,0x00,0x00,0x00,0x80,0x00,0x00,0x00,0xf8,0x0f,0x08,0x08,0x88,0x08,0x88,0x08,0xe8,0xab,0x88,0x08,0x88,0x08,0x08,0x08,0xf8,0x0f,0x00,0x00,0x00,0x00,0x00,0x00};";t.boxMinL="{0x80,0x00,0x00,0x00,0x80,0x00,0x00,0x00,0xf8,0x0f,0x08,0x08,0x08,0x08,0x08,0x08,0xe8,0xab,0x08,0x08,0x08,0x08,0x08,0x08,0xf8,0x0f,0x00,0x00,0x00,0x00,0x00,0x00};";t.fldClose="{0x00,0x00,0x7c,0x00,0xd6,0x00,0xab,0x3f,0x55,0x75,0xab,0x6a,0x55,0x75,0xab,0x6a,0x55,0x75,0xab,0x6a,0x55,0x75,0xab,0x6a,0xff,0x7f,0xfe,0x7f,0x00,0x00,0x00,0x00};";t.fldOpen="{0x00,0x00,0xf8,0x00,0x54,0x01,0xaa,0x7e,0x56,0xd5,0xaa,0xea,0xff,0xdf,0xab,0xfa,0x55,0xf5,0xaa,0xfa,0x56,0xf5,0xac,0xea,0xfc,0xff,0xf8,0xff,0x00,0x00,0x00,0x00};";t.special0=t.blank;t.special1=t.blank;t.special2=t.blank;t.special3=t.blank;t.special4=t.blank;t.special5=t.blank;t.special6=t.blank;t.special7=t.blank;t.special8=t.blank;t.special9=t.blank;this.folders=[t.fldOpen,t.fldClose,t.special0,t.special1,t.special2,t.special3,t.special4,t.special5,t.special6,t.special7,t.special8,t.special9];this.toggles=[t.boxMax,t.boxMaxT,t.boxMaxL,t.boxMin,t.boxMinT,t.boxMinL]};core.xbmtree1=new core._xbmtree1();
