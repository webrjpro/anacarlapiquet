'use strict';
// An isometric world rendered locally. No external graphics engine or remote service.
class IslandWorld {
 constructor(canvas, hooks) {
  this.canvas=canvas;this.ctx=canvas.getContext('2d');this.hooks=hooks;this.zoom=1;this.player={x:5,y:8};this.target={...this.player};this.hover=null;this.time=0;this.particles=[];this.hits=[];this.tiles=[];this.reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  for(let y=0;y<16;y++)for(let x=0;x<16;x++){
   const d=((x-7.5)/7.3)**2+((y-7.5)/7.1)**2;
   if(d<1+Math.sin(x*2+y)*.07){const river=(x===7||x===8)&&y>3&&y<11;const path=(y===8&&x<7)||(y===3&&x>3&&x<11)||(x===11&&y>6&&y<12);this.tiles.push({x,y,river,path,n:this.noise(x,y),z:river?-.15:0});}
  }
  this.companionImage=new Image();this.companionImage.src='assets/characters/nilo.png';
  this.resizeObserver=new ResizeObserver(()=>this.resize());this.resizeObserver.observe(canvas);
  canvas.addEventListener('pointermove',e=>{this.hover=this.pick(e);canvas.style.cursor=this.hover?'pointer':'default';});
  canvas.addEventListener('pointerleave',()=>this.hover=null);
  canvas.addEventListener('click',e=>{canvas.focus();if(!this.hooks.building()){const rect=canvas.getBoundingClientRect();const r=REGIONS.findIndex((r,i)=>{const p=this.project(r.x+.5,r.y+.5,i===1?135:i===5?155:92);return Math.hypot(e.clientX-rect.left-p.x,e.clientY-rect.top-p.y)<24*this.scale;});if(r!==-1){this.hooks.select(r);return;}}const tile=this.pick(e);if(!tile)return;if(this.hooks.building()){this.hooks.place(tile);return;}const r=this.regionAt(tile.x,tile.y);if(r!==-1){this.hooks.select(r);}else this.walk(tile.x,tile.y);});
  this.frame=this.frame.bind(this);requestAnimationFrame(this.frame);
 }
 noise(x,y){return Math.abs(Math.sin(x*127.1+y*311.7)*43758.5453)%1;}
 resize(){const r=this.canvas.getBoundingClientRect();if(!r.width||!r.height)return;this.width=r.width;this.height=r.height;const d=Math.min(devicePixelRatio||1,2);this.canvas.width=Math.round(r.width*d);this.canvas.height=Math.round(r.height*d);this.ctx.setTransform(d,0,0,d,0,0);this.scale=Math.min(r.width/900,(r.height-230)/500)*this.zoom;this.ox=r.width/2;this.oy=r.height*.47-155*this.scale;}
 project(x,y,z=0){return {x:this.ox+(x-y)*28*this.scale,y:this.oy+(x+y)*14*this.scale-z*this.scale};}
 poly(points,color,stroke){const c=this.ctx;c.beginPath();points.forEach((p,i)=>i?c.lineTo(p.x,p.y):c.moveTo(p.x,p.y));c.closePath();c.fillStyle=color;c.fill();if(stroke){c.strokeStyle=stroke;c.lineWidth=.7;c.stroke();}}
 cube(x,y,z,w,d,h,colors){const p=[this.project(x,y,z),this.project(x+w,y,z),this.project(x+w,y+d,z),this.project(x,y+d,z)];const b=p.map(v=>({x:v.x,y:v.y+h*this.scale}));this.poly([p[3],p[2],b[2],b[3]],colors[1]);this.poly([p[1],p[2],b[2],b[1]],colors[2]);this.poly(p,colors[0]);}
 regionAt(x,y){return REGIONS.findIndex(r=>Math.abs(r.x-x)<1.5&&Math.abs(r.y-y)<1.5);}
 reserved(t){return t.river||this.regionAt(t.x,t.y)!==-1||this.treeAt(t)||t.path;}
 treeAt(t){return !t.river&&!t.path&&this.regionAt(t.x,t.y)===-1&&t.n>.72;}
 pick(e){const r=this.canvas.getBoundingClientRect();const px=e.clientX-r.left,py=e.clientY-r.top;for(let i=this.hits.length-1;i>=0;i--){const t=this.hits[i],p=this.project(t.x+.5,t.y+.5,t.river?-7:0);if(Math.abs((px-p.x)/(28*this.scale))+Math.abs((py-p.y)/(14*this.scale))<=1)return t;}return null;}
 walk(x,y){const passable=t=>t&&!t.river&&!this.treeAt(t)&&!this.hooks.blocks()[`${t.x},${t.y}`]?.length;const dest=this.tiles.find(t=>t.x===x&&t.y===y);if(!passable(dest))return false;const start={x:Math.round(this.player.x),y:Math.round(this.player.y)},key=p=>`${p.x},${p.y}`,queue=[start],parents=new Map([[key(start),null]]);let found=false;while(queue.length){const p=queue.shift();if(p.x===x&&p.y===y){found=true;break;}for(const [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1]]){const n={x:p.x+dx,y:p.y+dy};if(parents.has(key(n)))continue;const tile=this.tiles.find(t=>t.x===n.x&&t.y===n.y);if(!passable(tile))continue;parents.set(key(n),p);queue.push(n);}}if(!found)return false;const route=[];let p={x,y};while(parents.get(key(p))!==null){route.unshift(p);p=parents.get(key(p));}this.route=route;this.target=this.route.shift()||start;this.hooks.step?.();return true;}
 move(dx,dy){return this.walk(Math.round(this.target.x)+dx,Math.round(this.target.y)+dy);}
 focusRegion(i){const r=REGIONS[i];this.walk(r.x+1,r.y);}
 burst(x,y){for(let i=0;i<32;i++)this.particles.push({x,y,z:15,vx:(Math.random()-.5)*.07,vy:(Math.random()-.5)*.07,vz:Math.random()*2+1,life:90,color:['#dbb955','#a8ce71','#f0e6a5','#8cbdad'][i%4]});}
 tree(t){const {x,y,n}=t;this.cube(x+.36,y+.36,27,.22,.22,27,['#b19360','#806846','#96754d']);const colors=n>.87?['#7ea15a','#456f4a','#5b874d']:['#92b16b','#567f4e','#70985b'];this.cube(x+.06,y+.06,54,.85,.85,26,colors);this.cube(x+.18,y+.18,72,.62,.62,22,colors);this.cube(x+.32,y+.32,83,.34,.34,14,colors);}
 landmark(i){const r=REGIONS[i],done=this.hooks.completed(i),unlocked=this.hooks.unlocked(i),x=r.x,y=r.y;const stone=['#d5d5be','#929e90','#abb3a1'];this.cube(x-.25,y-.25,5,1.5,1.5,7,['#d8c69b','#afa078','#c1b287']);
  if(i===0){this.cube(x,y,done?43:24,1,1,done?43:24,['#d1b17b','#a98052','#b99461']);this.cube(x-.1,y-.1,done?55:31,1.2,1.2,12,['#76966b','#496c51','#61845c']);if(done)this.cube(x+.16,y+1.01,25,.32,.02,25,['#715639','#715639','#715639']);}
  if(i===1){this.cube(x+.05,y+.05,done?90:39,.9,.9,done?90:39,stone);this.cube(x-.12,y-.12,done?99:46,1.24,1.24,10,['#a8b0a0','#6c7b70','#899486']);if(done)this.cube(x+.25,y+.25,118,.5,.5,20,['#d2b679','#978154','#b39b65']);}
  if(i===2){for(let j=0;j<4;j++)this.cube(x-1+j*.6,y,done?19:7,.53,1,9,['#c2a172','#8b7151','#aa8a61']);if(done){for(let j=0;j<4;j++){this.cube(x-1+j*.6,y,39,.1,.1,23,stone);this.cube(x-1+j*.6,y+.9,39,.1,.1,23,stone);}}}
  if(i===3){this.cube(x-.15,y,27,1.3,1,27,['#989998','#636e71','#7c8382']);for(let j=0;j<3;j++)this.cube(x+.1+j*.28,y+.25,done?48+j*10:34+j*4,.23,.28,done?34:18,[done?'#cbb5ed':'#a7a1b7','#827099','#a690bc']);}
  if(i===4){this.cube(x-.15,y-.1,done?50:23,1.3,1.2,done?50:23,stone);this.cube(x-.3,y-.25,done?64:30,1.6,1.5,14,['#749d9b','#477574','#5a8584']);if(done)for(let j=0;j<3;j++)this.cube(x+.12+j*.3,y+1.11,35,.17,.01,16,['#f9daa0','#d7b97c','#d7b97c']);}
  if(i===5){this.cube(x,y,done?105:50,.9,.9,done?105:50,stone);this.cube(x-.12,y-.12,done?117:60,1.14,1.14,12,['#c4a36b','#8d7554','#ac8d5e']);if(done){this.cube(x+.16,y+.16,138,.58,.58,22,['#ffeaa1','#dcbb5a','#f4d97a']);const p=this.project(x+.5,y+.5,128);const c=this.ctx;let g=c.createRadialGradient(p.x,p.y,0,p.x,p.y,90*this.scale);g.addColorStop(0,'#fff1a6a0');g.addColorStop(1,'#ffde7100');c.fillStyle=g;c.fillRect(p.x-100*this.scale,p.y-100*this.scale,200*this.scale,200*this.scale);}}
  const pos=this.project(x+.5,y+.5,i===1?135:i===5?155:92);const c=this.ctx;c.save();c.globalAlpha=unlocked?1:.55;c.fillStyle=unlocked?'#fbfcef':'#d9e1d6';c.beginPath();c.arc(pos.x,pos.y,13*this.scale,0,Math.PI*2);c.fill();c.fillStyle=unlocked?'#355e46':'#7b8d7d';c.font=`bold ${11*this.scale}px Segoe UI`;c.textAlign='center';c.fillText(done?'✓':String(i+1),pos.x,pos.y+4*this.scale);c.restore();
 }
 drawPlayer(){const {x,y}=this.player;const bounce=this.reduced?0:Math.sin(this.time*.003)*1.3;const z=28+bounce;this.cube(x+.22,y+.22,13,.2,.23,13,['#665b4b','#50473f','#615345']);this.cube(x+.56,y+.3,13,.2,.23,13,['#665b4b','#50473f','#615345']);this.cube(x+.2,y+.17,z,.57,.53,20,['#70a69a','#36675d','#528c7b']);this.cube(x+.19,y+.16,z+21,.57,.55,22,['#e0bb85','#b99568','#d5ad76']);this.cube(x+.12,y+.1,z+27,.7,.65,8,['#736447','#514a37','#62573f']);const p=this.project(x+.76,y+.53,z+13);this.ctx.fillStyle='#35453d';this.ctx.fillRect(p.x-3*this.scale,p.y,3*this.scale,4*this.scale);}
 draw(){const c=this.ctx,s=this.scale;if(!s)return;c.clearRect(0,0,this.width,this.height);const center=this.project(7.5,7.5,-45);c.save();c.translate(center.x,center.y);c.scale(1,.4);const shadow=c.createRadialGradient(0,0,80*s,0,0,390*s);shadow.addColorStop(0,'#3a60412b');shadow.addColorStop(1,'#3a604100');c.fillStyle=shadow;c.beginPath();c.ellipse(0,0,420*s,350*s,0,0,Math.PI*2);c.fill();c.restore();
  const tiles=[...this.tiles].sort((a,b)=>(a.x+a.y)-(b.x+b.y));this.hits=tiles;
  for(const t of tiles){const {x,y,n,river,path}=t;const colors=river?['#87bbc0','#649ba6','#70a9ae']:path?['#d3c599','#9b956c','#b1a67b']:[n>.5?'#a2b97b':'#aec487','#7d8b57','#91a16a'];this.cube(x,y,river?-7:0,1,1,river?29:36,colors);
   if(river){const p=this.project(x+.3,y+.4,-7);c.strokeStyle='#c5e0d488';c.lineWidth=1;c.beginPath();c.moveTo(p.x,p.y);c.lineTo(p.x+12*s,p.y-5*s);c.stroke();}else if(n<.15&&!path){const p=this.project(x+.4,y+.4,1);c.fillStyle='#789553';c.fillRect(p.x,p.y,3*s,3*s);}}
  const objects=[];for(const t of tiles){if(this.treeAt(t))objects.push({depth:t.x+t.y+.5,draw:()=>{const near=Math.hypot(t.x-this.player.x,t.y-this.player.y)<1.8;c.globalAlpha=near?.35:1;this.tree(t);c.globalAlpha=1;}});if(!t.river&&t.n<.065&&!t.path&&this.regionAt(t.x,t.y)===-1)objects.push({depth:t.x+t.y+.6,draw:()=>this.cube(t.x+.3,t.y+.3,8,.35,.4,8,['#b7bea6','#8a9787','#a1ad97'])});}
  REGIONS.forEach((r,i)=>objects.push({depth:r.x+r.y+1,draw:()=>this.landmark(i)}));
  const palette={wood:['#c79c63','#927044','#ae8654'],stone:['#bac5bd','#7a928c','#96ada2'],crystal:['#d0b9f0','#8d77b7','#aa95d2']};
  for(const [key,stack] of Object.entries(this.hooks.blocks())){const [x,y]=key.split(',').map(Number);objects.push({depth:x+y+.8,draw:()=>stack.forEach((m,i)=>this.cube(x+.05,y+.05,(i+1)*18,.9,.9,18,palette[m]))});}
  objects.push({depth:this.player.x+this.player.y+.9,draw:()=>this.drawPlayer()});
  if(this.companionImage.complete&&this.companionImage.naturalWidth){objects.push({depth:this.player.x+this.player.y+1.8,draw:()=>{const p=this.project(this.player.x+.9,this.player.y+.6,4);c.drawImage(this.companionImage,p.x-18*s,p.y-45*s,39*s,45*s);}});}
  objects.sort((a,b)=>a.depth-b.depth).forEach(o=>o.draw());
  const playerLabel=this.project(this.player.x+.5,this.player.y+.5,75);c.font=`600 ${10*s}px Segoe UI`;c.textAlign='center';c.fillStyle='#2b614c';c.fillText('VOCÊ',playerLabel.x,playerLabel.y);c.fillStyle='#2b614c';c.beginPath();c.moveTo(playerLabel.x-3*s,playerLabel.y+4*s);c.lineTo(playerLabel.x+3*s,playerLabel.y+4*s);c.lineTo(playerLabel.x,playerLabel.y+8*s);c.fill();
  if(this.hover){const t=this.hover;const z=(this.hooks.blocks()[`${t.x},${t.y}`]?.length||0)*18+1;const p=[this.project(t.x,t.y,z),this.project(t.x+1,t.y,z),this.project(t.x+1,t.y+1,z),this.project(t.x,t.y+1,z)];this.poly(p,this.hooks.building()?(this.reserved(t)?'#dca67370':'#ffffd480'):'#ffffd433','#fffde2');}
  // Mist stays over later chapters; the terrain remains visible as an invitation.
  for(let i=1;i<REGIONS.length;i++)if(!this.hooks.unlocked(i)){const r=REGIONS[i],p=this.project(r.x+.5,r.y+.5,25);const g=c.createRadialGradient(p.x,p.y,5*s,p.x,p.y,85*s);g.addColorStop(0,'#edf2e19c');g.addColorStop(1,'#edf2e100');c.fillStyle=g;c.fillRect(p.x-90*s,p.y-90*s,180*s,180*s);}
  for(const p of this.particles){const pt=this.project(p.x,p.y,p.z);c.globalAlpha=p.life/90;c.fillStyle=p.color;c.fillRect(pt.x,pt.y,4*s,4*s);}c.globalAlpha=1;
  if(!this.reduced)for(let i=0;i<10;i++){const x=(Math.sin(this.time*.0002+i*9)*.5+.5)*this.width,y=(Math.cos(this.time*.00015+i*7)*.5+.5)*(this.height-250)+80;c.fillStyle='#f7f6cb99';c.fillRect(x,y,2,2);}
 }
 frame(t){const dt=Math.min(t-(this.time||t),40);this.time=t;if(!this.canvas.closest('[hidden]')&&!document.hidden){const f=this.reduced?1:Math.min(1,dt*.016);this.player.x+=(this.target.x-this.player.x)*f;this.player.y+=(this.target.y-this.player.y)*f;if(Math.hypot(this.target.x-this.player.x,this.target.y-this.player.y)<.08&&this.route?.length){this.target=this.route.shift();this.hooks.step?.();}for(const p of this.particles){p.x+=p.vx;p.y+=p.vy;p.z+=p.vz;p.vz-=.035;p.life--;}this.particles=this.particles.filter(p=>p.life>0);this.draw();}requestAnimationFrame(this.frame);}
}
