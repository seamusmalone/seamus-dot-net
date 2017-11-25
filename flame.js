function flame(id,x,y,w,h,tx,ty){
	this.DynLayer=DynLayer
	this.DynLayer(id,x,y,w,h)

	this.spots=2
	this.tilesx=tx
	this.tilesy=ty
	this.tw=Math.round(w/tx)
	this.th=Math.round(h/ty)
	this.timerid=null
	this.running=false
	this.autoflame=false

	this.setSize((this.tw*tx)+2,(this.th*ty)+2)
	this.setVisible(false)

	this.palette=new Array()
	DynAPI.functions.createRedPal(this.palette)
	
	this.addEventListener(flame.listener)
	
	return this
}
flame.prototype=new DynLayer()
flame.prototype.getSubClass=function() { return flame }
flame.prototype.setFlame=function(b) { this.autoflame=b }
flame.listener=new EventListener()
flame.listener.onprecreate=function(e) {
	var o=e.getSource()
	o.setBgColor('#ffffff')

	o.evlyr=new DynLayer(null,1,1,(o.tw*o.tilesx),(o.th*o.tilesy))
	o.evlyr.setVisible(true)

	o.flyr=new Array()
	o.fcol=new Array()
	for (var x=0; x<o.tilesx; x++) for (var y=0; y<o.tilesy; y++) {
		o.fcol[x+(o.tilesx*y)]=0
		o.flyr[x+(o.tilesx*y)]=new DynLayer(null,1+(x*o.tw),1+(y*o.th),o.tw,o.th)
		o.flyr[x+(o.tilesx*y)].setBgColor(o.palette[o.fcol[x+(o.tilesx*y)]])
		o.flyr[x+(o.tilesx*y)].setVisible(true)
		o.addChild(o.flyr[x+(o.tilesx*y)])
	}
	for (var x=0; x<o.tilesx; x++) {
		c=Math.round(Math.random()*2)	
		if (c>0) c=255
		o.fcol[x+(o.tilesx*(o.tilesy-1))]=c;
	}
	
	DynAPI.functions.getColor(255,64,128)
	o.addChild(o.evlyr)
}
flame.listener.onmousemove=function(e){
	var o=e.getSource()
	targx=Math.round((e.getX()-(o.tw/2))/o.tw)
	targy=Math.round((e.getY()-(o.th/2))/o.th)
	o.fcol[targx+(o.tilesx*targy)]=255
}
flame.listener.onrepaint=function(e){
	var o=e.getSource()
	fire=o.flyr
	col=o.fcol
	pal=o.palette
	tx=o.tilesx
	ty=o.tilesy

	for (var y=0; y<ty-1; y++) for (var x=0; x<tx; x++) {
			if (x==0) col[x+(tx*y)]=Math.round((col[(x+1)+(tx*y)]+col[x+(tx*(y+1))])/3.1)
			else if (x==tx-1) col[x+(tx*y)]=Math.round((col[(x-1)+(tx*y)]+col[x+(tx*(y+1))])/3.1)
			else col[x+(tx*y)]=Math.round((col[(x-1)+(tx*y)]+col[(x+1)+(tx*y)]+col[x+(tx*(y+1))])/3.1)
	}
	max=ty*tx
	for (var y=0; y<max; y++) if (is.ns4) fire[y].doc.bgColor=pal[col[y]]
	else fire[y].css.backgroundColor=pal[col[y]]


	ty=tx*(ty-1)
	for (var x=0; x<tx; x++) col[x+ty]=0
	tx-=1
	al=o.spots
	if (o.autoflame) for (var i=0; i<al; i++) col[Math.round(Math.random()*tx)+ty]=255
}
flame.prototype.start=function () { 
	this.stop()
	this.timerid=setInterval(this+'.invokeEvent("repaint")',50) 
	this.running=true
	this.invokeEvent('start')
}
flame.prototype.stop=function () { 
	if(this.running) clearInterval(this.timerid)
	this.running=false
	this.invokeEvent('stop')
}