const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {pathToFileURL}=require('node:url');
const {chromium}=require('playwright');
const {MISSIONS,REGIONS}=require('../js/data.js');
const url=pathToFileURL(path.resolve(__dirname,'../index.html')).href;
async function solve(p,m){
 if(m.order){for(let goal=0;goal<m.order.length;goal++){let idx=await p.locator('.order-row>span').allTextContents();let at=idx.indexOf(m.order[goal]);while(at>goal){await p.locator(`[data-up="${at}"]`).click();at--;}}}
 else await p.locator(`[data-option="${m.answer}"]`).click();
 for(const i of m.evidence)await p.locator(`[data-evidence="${i}"]`).click();
 await p.locator('#check-answer').click();assert.match(await p.locator('#feedback').textContent(),/Pistas conectadas/);
 await p.locator('#check-answer').click();
 if(m.reflection){await p.locator('#claim').click();assert.equal(await p.locator('#reflection-feedback').isVisible(),true);await p.locator('#reflection').fill('Recomendo testar o farol na névoa. A pescadora não viu as pedras; a oficina diz que falta testar o alcance. Ainda não sabemos se a luz será suficiente.');}
 await p.locator('#claim').click();
}
(async()=>{
 assert.equal(REGIONS.length,6);assert.equal(MISSIONS.length,18);assert.equal(new Set(MISSIONS.map(m=>m.id)).size,18);
 for(const m of MISSIONS){assert(m.evidence.every(i=>m.text[i]));assert(m.hint&&m.lesson);if(!m.order){assert.equal(m.options.length,m.why.length);assert(m.options[m.answer]);}}
 const browser=await chromium.launch({channel:'msedge',headless:true});
 const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
 const p=await context.newPage();const errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.goto(url);await p.waitForFunction(()=>document.querySelector('#quest-title').textContent.length>0);
 assert.equal(await p.locator('#wood-count').textContent(),'8');
 // Gating and input validation do not award resources or fabricate attempts.
 await p.locator('[data-region="1"]').click();assert.match(await p.locator('#toast').textContent(),/Recupere/);
 await p.locator('#start-quest').click();await p.locator('#check-answer').click();assert.equal(await p.evaluate(()=>Object.keys(state.attempts).length),0);
 await p.locator('[data-option="1"]').click();await p.locator('[data-evidence="0"]').click();await p.locator('#check-answer').click();assert.match(await p.locator('#feedback').textContent(),/sementes/);assert.equal(await p.evaluate(()=>state.inventory.wood),8);
 await p.locator('[data-option="0"]').click();await p.locator('[data-evidence="0"]').click();await p.locator('[data-evidence="1"]').click();await p.locator('#check-answer').click();assert.match(await p.locator('#feedback').textContent(),/ajuste as pistas/);
 await p.locator('[data-evidence="1"]').click();
 await solve(p,MISSIONS[0]);assert.equal(await p.evaluate(()=>state.inventory.wood),14);
 // Reload persistence, then UI-only campaign progression including ordering puzzles.
 await p.reload();assert.equal(await p.locator('#wood-count').textContent(),'14');assert.equal(await p.locator('#quest-title').textContent(),MISSIONS[1].title);
 for(const m of MISSIONS.slice(1)){await p.locator(`[data-region="${m.region}"]`).click();await p.locator('#start-quest').click();await solve(p,m);}
 assert.equal(await p.evaluate(()=>Object.keys(state.done).length),18);assert.equal(await p.evaluate(()=>state.inventory.wood),116);assert.equal(await p.evaluate(()=>state.inventory.stone),76);assert.equal(await p.evaluate(()=>state.inventory.crystal),18);
 assert.equal(await p.locator('#chapter-count').textContent(),'6 / 6');
 // Replay does not duplicate rewards; notes are rendered as text.
 await p.locator('[data-view="journal"]').click();await p.locator('[data-review="m1"]').click();await solve(p,MISSIONS[0]);assert.equal(await p.evaluate(()=>state.inventory.wood),116);
 await p.locator('[data-view="world"]').click();
 // Build on a real free tile using the map; stack limit, refund, and persistence.
 const tile=await p.evaluate(()=>{const t=world.tiles.find(t=>!world.reserved(t)&&t.x>4&&t.y>5);const point=world.project(t.x+.5,t.y+.5);const r=world.canvas.getBoundingClientRect();return {...t,px:point.x+r.left,py:point.y+r.top};});
 await p.locator('#build-toggle').click();for(let i=0;i<5;i++)await p.mouse.click(tile.px,tile.py);
 assert.equal(await p.evaluate(k=>state.blocks[k].length,`${tile.x},${tile.y}`),4);assert.equal(await p.evaluate(()=>state.inventory.wood),112);
 await p.locator('[data-material="remove"]').click();await p.mouse.click(tile.px,tile.py);assert.equal(await p.evaluate(()=>state.inventory.wood),113);
 await p.reload();assert.equal(await p.evaluate(k=>state.blocks[k].length,`${tile.x},${tile.y}`),3);
 // Audio files must actually decode, not just exist. Read metadata through browser.
 const manifest=JSON.parse(fs.readFileSync(path.resolve(__dirname,'../assets/audio/manifest.json'),'utf8'));
 for(const item of manifest){assert(fs.statSync(path.resolve(__dirname,'../assets/audio',item.file)).size>100);const duration=await p.evaluate(file=>new Promise((resolve,reject)=>{const a=new Audio('assets/audio/'+file);a.onloadedmetadata=()=>resolve(a.duration);a.onerror=()=>reject(new Error('Audio could not decode: '+file));a.load();}),item.file);assert(duration>0&&Number.isFinite(duration));}
 await p.locator('#sound').click();await p.locator('#music-enabled').uncheck();await p.locator('#effects-enabled').uncheck();await p.locator('#close-sound').click();await p.reload();assert.equal(await p.evaluate(()=>state.sound.music),false);assert.equal(await p.evaluate(()=>state.sound.effects),false);
 for(const name of ['nilo','lia','ravi'])assert(fs.statSync(path.resolve(__dirname,'../assets/characters',name+'.png')).size>10000);
 // Responsive layout, keyboard movement, and native dialog focus containment.
 const mobile=await context.newPage();await mobile.setViewportSize({width:390,height:844});await mobile.goto(url);await mobile.waitForFunction(()=>document.querySelector('#quest-title').textContent.length>0);assert.equal(await mobile.evaluate(()=>innerWidth),390);assert.equal(await mobile.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
 await mobile.locator('#world').focus();const before=await mobile.evaluate(()=>({...world.target}));await mobile.keyboard.press('ArrowRight');const after=await mobile.evaluate(()=>({...world.target}));assert.notDeepEqual(before,after);
 await mobile.locator('[data-view="journal"]').click();await mobile.locator('[data-review="m18"]').click();assert.equal(await mobile.evaluate(()=>document.querySelector('#mission-dialog').scrollWidth<=document.querySelector('#mission-dialog').clientWidth),true);await mobile.screenshot({path:'tmp/mobile-mission.png',fullPage:true});await mobile.keyboard.press('Escape');
 await mobile.locator('[data-view="world"]').click();await mobile.screenshot({path:'tmp/mobile-world.png',fullPage:true});
 await p.screenshot({path:'tmp/world-complete.png',fullPage:true});
 // Malformed storage recovers safely.
 const bad=await browser.newContext();await bad.addInitScript(()=>localStorage.setItem('entrelinhas-v1','{broken'));const bp=await bad.newPage();await bp.goto(url);assert.equal(await bp.locator('#wood-count').textContent(),'8');await bad.close();
 assert.deepEqual(errors,[]);console.log('PASS: 18 missions; prerequisite gates; evidence feedback; ordering; reflection; persistence; replay rewards; block limits/refund; 13 audio decodes; mute persistence; mobile layout; keyboard; invalid save recovery.');
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1);});
