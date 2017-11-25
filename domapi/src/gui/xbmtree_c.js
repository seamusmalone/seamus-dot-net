// Copyright 2001-2003, Nebiru Software
// www.domapi.com
core.loadUnit("glyph");core.registerComponent("xbmtree");core.comps.xbmtree.defDelimter="/";function XBMTree(arg){var i=arg["img"];if(!i){alert("You MUST provide an image object for your XBMTree");return null}var e=core._component(arg,"xbmtree");e.img=i;e.style.cursor="default";e.setOverflow("auto");e.setP(0);e.onselect=function(){};e.selnode=null;e.nodes=[];e.showSelection=true;e.maxLevel=0;e.tree=e;e.level=0;e.quickMode=false;core.disallowSelect(e);e.reDraw();return e};core.comps.xbmtree.reDraw=function(){this.xbmtreeReDraw();this.onredraw()};core.comps.xbmtree.xbmtreeReDraw=function(){var t=this.theme;var s=this.style;this.setB(t.bdrWidth);this.setBgColor(t.bgColor);s.borderStyle=t.bdrSolid;s.font=t.font;s.borderColor=t.getInset();s.scrollbarBaseColor=t.ctrlBgColor;this.setP([4,0]);var len=this.nodes.length;for(var a=0;a<len;a++)this.nodes[a].reDraw(true)};core.comps.xbmtree.ondblclick=function(e){core.preventBubble(e);var i=core.findTarget(e,"IMAGELIST");var c=core._treeConst;if(i){if(c.FOLDERS.indexOf(i.index)>-1)core.findParent(i,"TREENODE").toggle();return}i=core.findTarget(e,"TREENODE");if(i)i.toggle()};core.comps.xbmtree.onclick=function(e){core.preventBubble(e);var i=core.findTarget(e,"IMAGELIST");var c=core._treeConst;var n=core.findTarget(e,"TREENODE");if(i){if(c.TOGGLES.indexOf(i.index)>-1)n.toggle();if(c.FOLDERS.indexOf(i.index)>-1)this.selectNode(n)}else if(n)this.selectNode(n)};core.comps.xbmtree.onmouseover=function(e){core.preventBubble(e);if(!this.doRollover)return;var t=this.theme;var n=core.findTarget(e,"TREENODE");if(n&&(!n.selected||!this.showSelection))this.colorNode(n,t.hlBgColor,t.hlFgColor,t.hlFont)};core.comps.xbmtree.onmouseout=function(e){core.preventBubble(e);var t=this.theme;var n=core.findTarget(e,"TREENODE");if(n&&(!n.selected||!this.showSelection))this.colorNode(n,t.bgColor,t.fgColor,t.font)};core.comps.xbmtree.selectNode=function(n){if(this.selnode){this.selnode.selected=false;this.selnode.reDraw(false)}this.expandToPath(n.getPath());this.selnode=n;n.selected=true;this.setFormValue(this.hiddenE);n.reDraw(false);n.onselect();this.onselect();if(n.fn!="undefined")eval(n.fn)};core.comps.xbmtree.add=function(c,fn,folder){var i=this.nodes.length;this.nodes[i]=XBMTreenode({parent:this,caption:c,fn:fn,folder:folder});return this.nodes[i]};core.comps.xbmtree.addPath=function(p,d,fn,folder){p=p.split(core.rVal(d,core.comps.xbmtree.defDelimter));var a,b,found,s,last;var r=this;for(a=0;a<p.length;a++){found=0;s=0;for(b=0;b<r.nodes.length;b++){s=r.nodes[b];if(s.getText()==p[a]){r=s;found=1;break}}if(!found){last=a==(p.length-1);r=r.add(p[a],last?fn:null,last?folder:null)}}};core.comps.xbmtree.collapse=function(recurse){this.popNode(false,recurse)};core.comps.xbmtree.expand=function(recurse){this.popNode(true,recurse)};core.comps.xbmtree.popNode=function(disp,recurse){if(recurse==null)recurse=false;var c,a;var iStart=this.level+1;var iEnd=recurse?this.tree.maxLevel:iStart;while(iEnd>=iStart){c=this.getNodesByLevel(iEnd);for(a=0;a<c.length;a++)c[a].style.display=disp?"block":"none";iEnd--}this.expanded=disp;this.reDraw(false)};core.comps.xbmtree.toggle=function(){if(this.expanded)this.collapse();else{this.expand();if(this.tree.quickMode&&!this.built){for(var a=0;a<this.nodes.length;a++)this.tree.initNode(this.nodes[a]);this.built=true}}return this.expanded};core.comps.xbmtree.init=function(){for(var a=0;a<this.nodes.length;a++)this.initNode(this.nodes[a]);this.collapse(true)};core.comps.xbmtree.initNode=function(n){var i,a,t;var tree=n.tree;var img=tree.img;var lev=n.level+2;var z=lev-2;var imgs=n.childNodes[0];while(imgs.childNodes.length<lev)imgs.appendChild(Glyph(null,16,16,img.get("blank")));while(imgs.childNodes.length>lev)imgs.removeChild(imgs.childNodes[0]);imgs.childNodes[lev-1].load((n.folder!=img.get("fldClose"))?img.get(n.folder):img.get("fldClose"));if(lev>1){if(n.nodes.length==0)i=n.nextSibling?"pathT":"pathL";else{if(n.nextSibling){i=n.expanded?"boxMaxT":"boxMinT"}else{i=n.expanded?"boxMaxL":"boxMinL"}}if(lev==2)i=n.expanded?"boxMax":"boxMin";imgs.childNodes[z].load(img.get(i))}if(lev>2)for(a=1;a<z;a++){t=tree.moveUp(n,a);imgs.childNodes[z-a].load(img.get((t&&t.nextSibling)?"pathI":"blank"))}n.reDraw();if(!tree.quickMode)for(var a=0;a<n.nodes.length;a++)core.comps.xbmtree.initNode(n.nodes[a])};core.comps.xbmtree.getPath=function(d){d=core.rVal(d,core.comps.xbmtree.defDelimter);var r=d+this.getText();var p=this.parentNode;if(!p)return r;while(true)if(p.domAPIObjType=="XBMTREE")return r;else{r=d+p.getText()+r;p=p.parentNode}return null};core.comps.xbmtree.getLevel=function(n){if(!n||!n.parentNode)return 0;var r=0;var p=n.parentNode;while(p){if(p.domAPIObjType=="XBMTREE")return r;else{if(p.domAPIObjType=="TREENODE")r++;p=p.parentNode}}return r};core.comps.xbmtree.moveUp=function(n,i){var r=null;var p=n.parentNode;while((i>0)&&p){if(p.domAPIObjType=="XBMTREE")return r;else{if(p.domAPIObjType=="TREENODE"){r=p;i--}p=p.parentNode}}return r};core.comps.xbmtree.colorNode=function(n,bg,fg,fnt){var s=n.childNodes[1].style;s.backgroundColor=bg;s.color=fg;s.font=fnt};core.comps.xbmtree.getNodesByLevel=function(i){var r=[];var all=this.getElementsByTagName("DIV");for(var a=0;a<all.length;a++)if(all[a].domAPIObjType=="TREENODE"&&all[a].level==i)r[r.length]=all[a];return r};core.comps.xbmtree.findNodeByName=function(n,recurse){for(var a=0;a<this.nodes.length;a++){if(this.nodes[a].getText()==n)r=this.nodes[a];else if(recurse)this.nodes[a].findNodeByName(n,true)}if(typeof r!="undefined")return r};core.comps.xbmtree.findNodeByPath=function(n,d){d=core.rVal(d,core.comps.xbmtree.defDelimter);var p=n.split(d);var last=p[p.length-1];if(n.charAt(0)!=d)n=d+n;var r=[];var all=this.getElementsByTagName("DIV");for(var a=0;a<all.length;a++)if(all[a].domAPIObjType=="TREENODE"&&all[a].getText()==last)r[r.length]=all[a];for(a=0;a<r.length;a++)if(r[a].getPath(d)==n)return r[a];return null};core.comps.xbmtree.expandToPath=function(n,d){d=core.rVal(d,core.comps.xbmtree.defDelimter);if(n.charAt(0)==d)n=n.substring(1,n.length);var p=n.split(d);var t=this;for(var a=0;a<p.length;a++){t=t.findNodeByName(p[a]);if(t)t.expand();else return}};core.comps.xbmtree.attachToForm=function(f,n){this.hiddenE=core._attachToForm(f,n);this.setFormValue(this.hiddenE)};core.comps.xbmtree.setFormValue=function(e){if(!e)return;if(!this.selnode)return;e.value=this.selnode.getPath()};function XBMTreenode(arg){var p=arg["parent"];var c=arg["caption"];var fn=arg["fn"];var folder=arg["folder"];var e=p.appendChild(document.createElement("DIV"));e.tree=p.tree;e.level=e.tree.getLevel(e);if(e.level>e.tree.maxLevel)e.tree.maxLevel=e.level;e.fn=fn;e.img=p.img;var t=e.style;t.position="relative";t.padding="0px";if(core.isIE)t.margin="-2px 0px 0px 0px";if(core.isNS)t.margin="-2px 0px 0px 0px";t.border="0px solid black";t.whiteSpace="nowrap";t.lineHeight="14px";e.caption=c;e.expanded=false;e.nodes=[];e.selected=false;e.onselect=function(){};e.innerHTML=('<span></span><span style="margin-left:4px;padding:0px 2px"></span>');t=core.comps.xbmtree;e.folder=core.rVal(folder,"fldClose");e.add=t.add;e.addPath=t.addPath;e.setText=t._nodesetText;e.getText=t._nodegetText;e.reDraw=t._nodereDraw;e.collapse=t.collapse;e.expand=t.expand;e.toggle=t.toggle;e.popNode=t.popNode;e.getNodesByLevel=t.getNodesByLevel;e.getPath=t.getPath;e.findNodeByName=t.findNodeByName;e.setText(c);e.domAPIObjType="TREENODE";return e};core.comps.xbmtree._nodesetText=function(c){this.childNodes[1].innerHTML=c};core.comps.xbmtree._nodegetText=function(){return this.childNodes[1].innerHTML};core.comps.xbmtree._nodereDraw=function(recurse){if(this.tree.quickMode)recurse=false;var i,a;var tree=this.tree;var t=tree.theme;var img=tree.img;if(tree.showSelection&&this.selected)tree.colorNode(this,t.selBgColor,t.selFgColor,t.selFont);else tree.colorNode(this,t.bgColor,t.fgColor,t.font);var lev=this.level+2;var imgs=this.childNodes[0];var folder=this.selected?"fldOpen":"fldClose";if(this.folder!="fldClose")folder=this.folder;if(imgs.childNodes[lev-1].index!=folder)imgs.childNodes[lev-1].load(img.get(folder));if(lev>1){if(this.nodes.length==0)i=this.nextSibling?"pathT":"pathL";else{if(this.nextSibling){i=this.expanded?"boxMinT":"boxMaxT"}else{i=this.expanded?"boxMinL":"boxMaxL"}}if(lev==2)i=this.expanded?"boxMin":"boxMax";if(imgs.childNodes[lev-2].index!=i)imgs.childNodes[lev-2].load(img.get(i))}if(recurse)for(a=0;a<this.nodes.length;a++)this.nodes[a].reDraw(recurse)};
