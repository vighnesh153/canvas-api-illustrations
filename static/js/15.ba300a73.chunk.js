(this["webpackJsonpcanvas-api-illustrations"]=this["webpackJsonpcanvas-api-illustrations"]||[]).push([[15,16,33],{28:function(t,n,e){"use strict";e.r(n),e.d(n,"default",(function(){return s}));var a=e(91),i=e(92),s=function(){function t(){Object(a.a)(this,t),this.x=0,this.y=0}return Object(i.a)(t,[{key:"generateNext",value:function(){var t,n,e=Math.random();e<.01?(t=0,n=.16*this.y):e<.86?(t=.85*this.x+.04*this.y,n=-.04*this.x+.85*this.y+1.6):e<.93?(t=.2*this.x-.26*this.y,n=.23*this.x+.22*this.y+1.6):(t=-.15*this.x+.28*this.y,n=.26*this.x+.24*this.y+.44),this.x=t,this.y=n}},{key:"X",get:function(){return this.x}},{key:"Y",get:function(){return this.y}}]),t}()},29:function(t,n,e){"use strict";e.r(n),e.d(n,"default",(function(){return r}));var a=e(91),i=e(92),s=e(28),c=e(93),r=function(){function t(n){Object(a.a)(this,t),this.fern=new s.default,this.canvas=void 0,this.canvas=new c.a(n),this.canvas.drawFilledRect(0,0,this.canvas.width,this.canvas.height,"white")}return Object(i.a)(t,[{key:"plot",value:function(){var t=this.fern,n=t.X,e=t.Y,a=this.canvas.width*n/6+250,i=(this.canvas.height-20)*(1-e/10)+10;this.canvas.drawFilledCircle(a,i,1,"green")}},{key:"update",value:function(){this.fern.generateNext()}}]),t}()},39:function(t,n,e){"use strict";e.r(n);var a=e(0),i=e.n(a),s=e(29);n.default=function(t){var n=t.canvasRef,e=t.setDataAttributes,c=i.a.useRef(),r=function(){if(!c.current){var t=new s.default(n.current);c.current=!0,function t(n){for(var e=0;e<50;e++)n.plot(),n.update();c.current&&requestAnimationFrame((function(){return t(n)}))}(t)}},o={buttons:[{text:"Start",clickHandler:function(){r()}}]};return Object(a.useEffect)((function(){return e(o),function(){c.current=!1}}),[e,o]),i.a.createElement(i.a.Fragment,null)}},91:function(t,n,e){"use strict";function a(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}e.d(n,"a",(function(){return a}))},92:function(t,n,e){"use strict";function a(t,n){for(var e=0;e<n.length;e++){var a=n[e];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}function i(t,n,e){return n&&a(t.prototype,n),e&&a(t,e),t}e.d(n,"a",(function(){return i}))},93:function(t,n,e){"use strict";e.d(n,"a",(function(){return s}));var a=e(91),i=e(92),s=function(){function t(n){Object(a.a)(this,t),this.canvas=void 0,this.canvasContext=void 0,this.drawBitmap=this.drawBitmap.bind(this),this.drawFilledRect=this.drawFilledRect.bind(this),this.drawOutlineRect=this.drawOutlineRect.bind(this),this.drawLine=this.drawLine.bind(this),this.drawFilledCircle=this.drawFilledCircle.bind(this),this.drawBitmap=this.drawBitmap.bind(this),this.writeText=this.writeText.bind(this),this.canvas=n,this.canvasContext=this.canvas.getContext("2d"),this.reset()}return Object(i.a)(t,[{key:"getBoundingClientRect",get:function(){return this.canvas.getBoundingClientRect()}},{key:"width",get:function(){return this.canvas.width}},{key:"height",get:function(){return this.canvas.height}}]),Object(i.a)(t,[{key:"reset",value:function(){this.canvasContext.setTransform(1,0,0,1,0,0)}},{key:"drawBitmap",value:function(t,n,e,a){this.canvasContext.save(),this.canvasContext.translate(n,e),this.canvasContext.rotate(a),this.canvasContext.drawImage(t,-t.width/2,-t.height/2),this.canvasContext.restore()}},{key:"drawFilledRect",value:function(t,n,e,a,i){this.canvasContext.fillStyle=i,this.canvasContext.fillRect(t,n,e,a)}},{key:"drawOutlineRect",value:function(t,n,e,a,i){this.canvasContext.strokeStyle=i,this.canvasContext.strokeRect(t,n,e,a)}},{key:"drawRoundedRect",value:function(t,n,e,a,i,s){this.canvasContext.beginPath(),this.canvasContext.strokeStyle=s,this.canvasContext.moveTo(t+e-i,n+a),this.canvasContext.arcTo(t,n+a,t,n,i),this.canvasContext.arcTo(t,n,t+e,n,i),this.canvasContext.arcTo(t+e,n,t+e,n+a,i),this.canvasContext.arcTo(t+e,n+a,t,n+a,i),this.canvasContext.stroke()}},{key:"drawLine",value:function(t,n,e,a,i,s){this.canvasContext.save(),this.canvasContext.beginPath(),this.canvasContext.lineWidth=i,this.canvasContext.strokeStyle=s,this.canvasContext.moveTo(t,n),this.canvasContext.lineTo(e,a),this.canvasContext.stroke(),this.canvasContext.restore()}},{key:"drawDashedLine",value:function(t,n,e,a,i,s,c){this.canvasContext.setLineDash(c),this.drawLine(t,n,e,a,i,s),this.canvasContext.setLineDash([])}},{key:"drawFilledCircle",value:function(t,n,e,a){this.canvasContext.beginPath(),this.canvasContext.fillStyle=a,this.canvasContext.arc(t,n,e,0,2*Math.PI,!0),this.canvasContext.fill()}},{key:"writeText",value:function(t,n,e,a,i){this.canvasContext.fillStyle=i,this.canvasContext.fillText(t,n,e)}},{key:"translate",value:function(t,n){this.canvasContext.translate(t,n)}},{key:"rotate",value:function(t){this.canvasContext.rotate(t)}},{key:"pushState",value:function(){this.canvasContext.save()}},{key:"popState",value:function(){this.canvasContext.restore()}}]),t}()}}]);
//# sourceMappingURL=15.ba300a73.chunk.js.map