// Copyright (c) 2026 Ana Carla Saraiva Piquet. Elementos próprios: LICENSE.txt; componentes de terceiros: DIREITOS_E_CREDITOS.md.
'use strict';
class GameAudio {
 constructor(settings,onChange){this.settings=settings;this.onChange=onChange;this.ready=false;this.reading=false;this.region=0;this.activeSounds=new Set();this.last={};this.errorShown=false;
  this.tracks=['sunset-plains','peaceful-forest'].map(name=>{const a=new Audio(`assets/audio/${name}.mp3`);a.preload='none';a.loop=true;a.volume=0;return a;});
  this.sources={click:'click',page:'page',step:'step',build:'build',remove:'remove',crystal:'crystal',clue:'clue',hint:'hint',retry:'retry',success:'success',restore:'restore'};
  document.addEventListener('pointerdown',()=>this.unlock(),{once:true});document.addEventListener('keydown',()=>this.unlock(),{once:true});
 }
 unlock(){this.ready=true;this.syncMusic();}
 targetTrack(){return this.region===3||this.region===4?1:0;}
 setRegion(r){this.region=r;this.syncMusic();}
 setReading(v){this.reading=v;this.syncMusic();}
 syncMusic(){clearInterval(this.fade);const target=this.targetTrack(),enabled=this.settings.music&&this.ready&&!document.hidden;
  if(enabled){const a=this.tracks[target];a.play().catch(()=>{if(!this.errorShown){this.errorShown=true;const s=document.getElementById('now-playing');if(s)s.textContent='Não foi possível tocar a música. Ative novamente após uma interação.';}});}
  const volumes=this.tracks.map((a,i)=>enabled&&i===target?this.settings.musicVolume*(this.reading?.3:1):0);let steps=0;
  this.fade=setInterval(()=>{steps++;this.tracks.forEach((a,i)=>{a.volume=Math.max(0,Math.min(1,a.volume+(volumes[i]-a.volume)*.18));if(steps>=24){a.volume=volumes[i];if(!volumes[i])a.pause();}});if(steps>=24)clearInterval(this.fade);},35);
  const s=document.getElementById('now-playing');if(s)s.textContent=enabled?`Trilha: ${target?'Peaceful Forest · Samza':'Sunset Plains · Yoiyami'}${this.reading?' · volume de leitura':''}`:'Música desligada';
 }
 play(name){if(!this.settings.effects||document.hidden)return;const now=performance.now();if(now-(this.last[name]||-999)<(name==='step'?170:70))return;this.last[name]=now;if(this.activeSounds.size>=6){const first=this.activeSounds.values().next().value;first.pause();this.activeSounds.delete(first);}const a=new Audio(`assets/audio/${this.sources[name]||'click'}.mp3`);a.volume=this.settings.effectsVolume*({step:.4,click:.45,page:.55,retry:.4,restore:.65}[name]||.65);this.activeSounds.add(a);const remove=()=>this.activeSounds.delete(a);a.onended=remove;a.onerror=remove;a.play().catch(remove);}
 visibility(){if(document.hidden){clearInterval(this.fade);this.tracks.forEach(a=>{a.pause();a.volume=0;});this.activeSounds.forEach(a=>a.pause());this.activeSounds.clear();}else this.syncMusic();}
 update(){if(!this.settings.effects){this.activeSounds.forEach(a=>a.pause());this.activeSounds.clear();}this.syncMusic();this.onChange();}
}
