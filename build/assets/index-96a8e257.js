(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))a(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const c of n.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function r(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerPolicy&&(n.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?n.credentials="include":i.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function a(i){if(i.ep)return;i.ep=!0;const n=r(i);fetch(i.href,n)}})();const f=new Image;f.src="/src/assets/plane.png";class m{constructor({x:t,y:r,width:a,height:i}){this.size={width:a,height:i},this.velocity={x:0,y:-4},this.sprite=f,this.rotation={angle:0,rotationSpeed:0},this.position={x:t,y:r,anchorX:t+a/2,anchorY:r+i/2}}draw(t){t.save(),t.translate(this.position.x,this.position.y),t.rotate(this.rotation.angle*Math.PI/360),t.fillStyle="black",t.drawImage(this.sprite,-this.size.width/2,-this.size.height/2,this.size.width,this.size.height),t.restore()}update(t){this.rotation.angle+=this.rotation.rotationSpeed,this.rotation.angle>360&&(this.rotation.angle-=720),this.rotation.angle<-720&&(this.rotation.angle+=720),this.position.x+=-this.velocity.y*Math.sin(this.rotation.angle*Math.PI/360),this.position.y+=this.velocity.y*Math.cos(this.rotation.angle*Math.PI/360),this.draw(t)}}class w{constructor({centerX:t,centerY:r,radius:a,colorNumbers:i}){this.position={centerX:t,centerY:r},this.colorNumbers=i,this.color="#000000",this.radius=a,this.opacity=.6}update(t){this.opacity=(this.opacity*80-1)/80,(this.opacity*40-1)/40>.1&&(this.radius=(this.radius*20-1)/20),this.color=`rgba(${this.colorNumbers[0]},${this.colorNumbers[1]},
      ${this.colorNumbers[2]},${this.opacity})`,t.beginPath(),t.arc(this.position.centerX,this.position.centerY,this.radius,0,2*Math.PI,!1),t.fillStyle=this.color,t.fill()}}const h=document.getElementById("canvas");h.width=1360;h.height=680;const o=h.getContext("2d"),s=new m({x:650,y:400,width:45,height:50});console.log(s);const l=[],p={x:240,y:500,width:100,height:100},y={x:100,y:500,width:100,height:100};function d(e,t){o.beginPath(),o.rect(e.x,e.y,e.width,e.height),o.fillStyle="rgba(225,225,225,0.5)",o.fill(),o.lineWidth=2,o.strokeStyle="#000000",o.stroke(),o.closePath(),o.font="40pt Kremlin Pro Web",o.fillStyle="#000000",o.fillText(t,e.x+e.width/4,e.y+64)}const g=()=>{requestAnimationFrame(g),o.clearRect(0,0,h.width,h.height);const e=new w({centerX:s.position.x,centerY:s.position.y,colorNumbers:[100,100,100],radius:5});l.push(e),l.length>=40&&l.shift(),l.forEach(t=>t.update(o)),s.update(o,l),d(p,">"),d(y,"<")};g();window.addEventListener("keypress",e=>{switch(e.code){case"KeyA":s.rotation.rotationSpeed=-4;break;case"KeyD":s.rotation.rotationSpeed=4;break}});window.addEventListener("keyup",e=>{(e.code==="KeyA"&&s.rotation.rotationSpeed<0||e.code==="KeyD"&&s.rotation.rotationSpeed>0)&&(s.rotation.rotationSpeed=0)});function b(e,t){var r=e.getBoundingClientRect();return{x:t.clientX-r.left,y:t.clientY-r.top}}function u(e,t){return e.x>t.x&&e.x<t.x+t.width&&e.y<t.y+t.height&&e.y>t.y}h.addEventListener("click",function(e){var t=b(h,e);u(t,y)&&(console.log("inside leftbtn"),s.rotation.rotationSpeed=-4),u(t,p)&&(s.rotation.rotationSpeed=4)},!1);
