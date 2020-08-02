(this["webpackJsonpcanvas-api-illustrations"]=this["webpackJsonpcanvas-api-illustrations"]||[]).push([[28],{33:function(t,e,n){"use strict";n.r(e),n.d(e,"default",(function(){return h}));var i=n(92),s=n(91),a=n(93),o=function t(e,n){Object(s.a)(this,t),this.x=e,this.y=n},h=function(){function t(e,n,i){Object(s.a)(this,t),this.canvas=void 0,this.order=void 0,this.lineThickness=1,this.squaresCount=void 0,this.totalPoints=void 0,this.done=!1,this.hilbertIndices=[new o(0,0),new o(0,1),new o(1,1),new o(1,0)],this.points=void 0,this.framesCounter=0,this.stopper=void 0,this.canvas=new a.a(e),this.canvas.drawFilledRect(0,0,this.canvas.width,this.canvas.height,"white"),this.order=n,this.squaresCount=Math.pow(2,n),this.totalPoints=Math.pow(this.squaresCount,2),this.points=new Array(this.totalPoints),this.stopper=i,this.generatePoints()}return Object(i.a)(t,[{key:"getHilbertIndex",value:function(t){for(var e=this.hilbertIndices[3&t],n=new o(e.x,e.y),i=1;i<this.order;i++){t>>=2;var s=Math.pow(2,i);switch(3&t){case 0:var a=[n.y,n.x];n.x=a[0],n.y=a[1];break;case 1:n.y+=s;break;case 2:n.x+=s,n.y+=s;break;case 3:var h=[s-1-n.y,s-1-n.x];n.x=h[0],n.y=h[1],n.x+=s}}return n}},{key:"generatePoints",value:function(){for(var t=this.canvas.height/this.squaresCount,e=0;e<this.totalPoints;e++){var n=this.getHilbertIndex(e);n.x*=t,n.y*=t,n.x+=(this.canvas.width-t*(this.squaresCount-1))/2,n.y+=(this.canvas.height-t*(this.squaresCount-1))/2,this.points[e]=n}}},{key:"plot",value:function(){if(!this.done)for(var t=this.points[0],e=Math.min,n=1;n<e(this.framesCounter,this.points.length);n++){var i=this.points[n];this.canvas.drawLine(t.x,t.y,i.x,i.y,this.lineThickness,"darkblue"),t=i}}},{key:"update",value:function(){this.done||(this.framesCounter++,this.framesCounter>this.points.length&&(this.done=!0,this.points=[]))}}]),t}()},91:function(t,e,n){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}n.d(e,"a",(function(){return i}))},92:function(t,e,n){"use strict";function i(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function s(t,e,n){return e&&i(t.prototype,e),n&&i(t,n),t}n.d(e,"a",(function(){return s}))},93:function(t,e,n){"use strict";n.d(e,"a",(function(){return a}));var i=n(91),s=n(92),a=function(){function t(e){Object(i.a)(this,t),this.canvas=void 0,this.canvasContext=void 0,this.drawBitmap=this.drawBitmap.bind(this),this.drawFilledRect=this.drawFilledRect.bind(this),this.drawOutlineRect=this.drawOutlineRect.bind(this),this.drawLine=this.drawLine.bind(this),this.drawFilledCircle=this.drawFilledCircle.bind(this),this.drawBitmap=this.drawBitmap.bind(this),this.writeText=this.writeText.bind(this),this.canvas=e,this.canvasContext=this.canvas.getContext("2d"),this.reset()}return Object(s.a)(t,[{key:"getBoundingClientRect",get:function(){return this.canvas.getBoundingClientRect()}},{key:"width",get:function(){return this.canvas.width}},{key:"height",get:function(){return this.canvas.height}}]),Object(s.a)(t,[{key:"reset",value:function(){this.canvasContext.setTransform(1,0,0,1,0,0)}},{key:"drawBitmap",value:function(t,e,n,i){this.canvasContext.save(),this.canvasContext.translate(e,n),this.canvasContext.rotate(i),this.canvasContext.drawImage(t,-t.width/2,-t.height/2),this.canvasContext.restore()}},{key:"drawFilledRect",value:function(t,e,n,i,s){this.canvasContext.fillStyle=s,this.canvasContext.fillRect(t,e,n,i)}},{key:"drawOutlineRect",value:function(t,e,n,i,s){this.canvasContext.strokeStyle=s,this.canvasContext.strokeRect(t,e,n,i)}},{key:"drawRoundedRect",value:function(t,e,n,i,s,a){this.canvasContext.beginPath(),this.canvasContext.strokeStyle=a,this.canvasContext.moveTo(t+n-s,e+i),this.canvasContext.arcTo(t,e+i,t,e,s),this.canvasContext.arcTo(t,e,t+n,e,s),this.canvasContext.arcTo(t+n,e,t+n,e+i,s),this.canvasContext.arcTo(t+n,e+i,t,e+i,s),this.canvasContext.stroke()}},{key:"drawLine",value:function(t,e,n,i,s,a){this.canvasContext.save(),this.canvasContext.beginPath(),this.canvasContext.lineWidth=s,this.canvasContext.strokeStyle=a,this.canvasContext.moveTo(t,e),this.canvasContext.lineTo(n,i),this.canvasContext.stroke(),this.canvasContext.restore()}},{key:"drawDashedLine",value:function(t,e,n,i,s,a,o){this.canvasContext.setLineDash(o),this.drawLine(t,e,n,i,s,a),this.canvasContext.setLineDash([])}},{key:"drawFilledCircle",value:function(t,e,n,i){this.canvasContext.beginPath(),this.canvasContext.fillStyle=i,this.canvasContext.arc(t,e,n,0,2*Math.PI,!0),this.canvasContext.fill()}},{key:"writeText",value:function(t,e,n,i,s){this.canvasContext.fillStyle=s,this.canvasContext.fillText(t,e,n)}},{key:"translate",value:function(t,e){this.canvasContext.translate(t,e)}},{key:"rotate",value:function(t){this.canvasContext.rotate(t)}},{key:"pushState",value:function(){this.canvasContext.save()}},{key:"popState",value:function(){this.canvasContext.restore()}}]),t}()}}]);
//# sourceMappingURL=28.c8bd4726.chunk.js.map