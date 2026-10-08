// Copyright (c) 2026 Ana Carla Saraiva Piquet. Elementos próprios: LICENSE.txt.
'use strict';
// Small inhabitants use the same block style as the board. Their paths stay off its houses.
class IslandLife {
 constructor(world){this.world=world;this.species=['sheep','pig','chicken','rabbit','cow'];}
 clock(r){return this.world.reduced?0:this.world.time/1000+r*7.3;}
 animalPose(r,i){const t=this.clock(r),phase=t*(.22+i*.025)+r+i*2.1;return {x:i===0?-197+12*Math.sin(phase):i===1?-12+15*Math.sin(phase):197+12*Math.sin(phase),y:i===0?73+5*Math.cos(phase):i===1?98+2*Math.cos(phase):73+5*Math.cos(phase),face:Math.cos(phase)>=0?1:-1,gait:this.world.reduced?0:Math.sin(t*7+i)*2,grazing:Math.sin(t*.65+i)> .72};}
 farmPose(r,i){const t=this.clock(r)+i*4;return {cycle:t%18,growth:this.world.reduced?.7:(t%18)/18,watering:t%18>5&&t%18<11,harvesting:t%18>14};}
 draw(r){const w=this.world;if(w.scale<.34)return;const p=w.centers[r],c=w.ctx;const poses=[this.animalPose(r,0),this.animalPose(r,1),this.animalPose(r,2)];
  for(let i=0;i<2;i++)this.farm(r,p.x+(i?103:-99),p.y+(i?73:68),i);
  const actors=poses.map((pose,i)=>({y:pose.y,paint:()=>this.animal(p.x+pose.x,p.y+pose.y,this.species[(r+i*2)%5],pose)}));
  for(let i=0;i<2;i++)actors.push({y:89+i*10,paint:()=>this.worker(r,p.x+(i?45:-163),p.y+89+i*10,i)});
  actors.sort((a,b)=>a.y-b.y).forEach(a=>a.paint());
 }
 farm(r,x,y,i){const w=this.world,c=w.ctx,pose=this.farmPose(r,i);w.block(x,y,59,18,4,['#89543a','#593b30','#704331']);
  for(let row=0;row<3;row++){c.strokeStyle='#482e28';c.lineWidth=3;c.beginPath();c.moveTo(x-43+row*5,y-8+row*8);c.lineTo(x+40+row*5,y-8+row*8);c.stroke();
   for(let col=0;col<5;col++){const xx=x-39+col*19+row*4,yy=y-10+row*8,g=Math.max(.15,Math.min(1,pose.growth+(col%2)*.12)),h=4+g*12;
    w.block(xx,yy,2.8,1.8,h,['#b7ed5b','#37964d','#6bc44b']);w.block(xx-3,yy-2,3,1.5,h*.65,['#91da54','#278447','#51b047']);
    if(g>.48){if((r+i)%3===0){w.block(xx,yy-h+2,3.5,2,5,['#ffe66b','#bf902a','#f4bc38']);}else if((r+i)%3===1){w.ellipse(xx+2,yy-h+3,3,3,'#ff784d');}else{w.ellipse(xx,yy-h+3,5,3,'#c1f368');}}
   }
  }
  // Wooden borders and a basket make every miniature plot legible at normal zoom.
  w.block(x-57,y+1,3,2,8,['#efc08a','#926344','#bd885c']);w.block(x+57,y+1,3,2,8,['#efc08a','#926344','#bd885c']);
  w.block(x+54,y+17,8,5,9,['#eabc6b','#96652d','#c99043']);if(pose.harvesting)for(let k=0;k<3;k++)w.ellipse(x+49+k*4,y+8,2.5,2.5,(r+i)%3===1?'#ff784d':'#ffe66b');
 }
 animal(x,y,s,pose){const w=this.world,c=w.ctx;w.ellipse(x,y+2,s==='chicken'?10:18,5,'#073c4938');c.save();c.translate(x,y);c.scale(pose.face,1);const g=pose.gait;
  const colors=s==='pig'?['#ffb5cc','#d77d9d','#ec96b1']:s==='rabbit'?['#cedce8','#8196b0','#a7bacd']:['#fff6da','#b8c3b7','#e0e6d3'];
  if(s==='chicken'){
   w.block(-2,-3,10,6,13,colors);w.block(7,-10,5,3,9,colors);w.block(8,-19,3,2,4,['#ff6972','#b73349','#e24b56']);w.block(13,-11,4,2,3,['#ffc257','#c67e25','#eea23b']);
   c.strokeStyle='#edaa43';c.lineWidth=2;for(const dx of [-5,4]){c.beginPath();c.moveTo(dx,-3);c.lineTo(dx+g*(dx<0?1:-1),3);c.stroke();}w.block(-11,-8,4,2,8,colors);
  }else{
   for(const dx of [-10,8])for(const dy of [-3,3])w.block(dx+g*(dx<0?1:-1),dy,2.2,1.5,10,s==='pig'?colors:['#77675a','#504b46','#635b51']);
   w.block(-1,-8,17,8,s==='rabbit'?12:17,colors);const hy=pose.grazing?-7:-17;w.block(14,hy,7,5,11,colors);
   if(s==='sheep'){for(const dx of [-10,0,9])w.block(dx,-19,6,4,8,['#ffffff','#dbe6de','#f2f4e9']);w.block(19,hy,5,3,7,['#6e6b69','#44494b','#585b5d']);}
   if(s==='pig'){w.block(21,hy+2,4,3,5,['#ff87b0','#cc6088','#ec719a']);for(const dx of [10,17])w.block(dx,hy-9,2.5,2,5,colors);c.strokeStyle='#d77d9d';c.lineWidth=2;c.beginPath();c.arc(-20,-15,3,.5,Math.PI*2);c.stroke();}
   if(s==='rabbit'){for(const dx of [10,16])w.block(dx,hy-9,2.5,2,16,colors);w.ellipse(-18,-14,5,5,'#f8fbff');}
   if(s==='cow'){w.block(-8,-24,5,3,3,['#574846','#352d30','#443b40']);w.block(7,-17,4,2,9,['#574846','#352d30','#443b40']);for(const dx of [10,19])w.block(dx,hy-10,2,1.5,5,['#ffdf91','#c39451','#e7bd6d']);w.block(20,hy+2,4,3,5,['#ffb2ba','#c7818c','#e797a2']);}
  }
  c.fillStyle='#163552';c.fillRect(s==='chicken'?9:17,(s==='chicken'?-18:(pose.grazing?-15:-25)),2,2);c.restore();
 }
 worker(r,x,y,i){const w=this.world,c=w.ctx,pose=this.farmPose(r,i),t=this.clock(r),swing=w.reduced?0:Math.sin(t*3.5+i),skin=['#efba87','#75452f','#c9885a'][(r+i)%3],shirt=i?['#fd9567','#b75246','#db7152']:['#7dd6ff','#287fbb','#4aa6d6'];
  w.ellipse(x,y+3,12,4,'#073c4940');for(const dx of [-4,4])w.block(x+dx,y,3,2,12,['#425879','#23394f','#324968']);w.block(x,y-10,8,4,14,shirt);w.block(x,y-25,6,4,10,[skin,skin,skin]);
  w.block(x,y-33,11,6,3,['#ffe093','#b58d44','#e2b969']);w.block(x,y-36,7,4,6,['#ffebaa','#c79d54','#eacb7a']);c.fillStyle='#173c56';c.fillRect(x+2,y-31,2,2);
  const handY=y-16+swing*2;w.block(x+10,handY,3,2,8,[skin,skin,skin]);
  if(pose.watering){w.block(x+15,handY+1,7,4,8,['#7fe8f4','#218dba','#38b8d0']);c.strokeStyle='#9ef7ff';c.lineWidth=2;c.beginPath();c.moveTo(x+20,handY-5);c.lineTo(x+28,handY-2);c.stroke();for(let j=0;j<4;j++)w.ellipse(x+28+j*3,handY+1+j*4+(w.reduced?0:(t*12)%4),1.4,2,'#b9faff');}
  else{c.save();c.translate(x+12,handY);c.rotate(-.2+swing*.18);c.strokeStyle='#bd824d';c.lineWidth=3;c.beginPath();c.moveTo(0,-10);c.lineTo(2,15);c.stroke();w.block(3,15,5,2,5,['#c5e8ec','#6b98ad','#94bdcd']);c.restore();}
  if(pose.harvesting){w.block(x-13,y-4,7,4,9,['#ecc071','#956632','#c58c45']);w.ellipse(x-13,y-12,4,3,'#ffe170');}
 }
}
