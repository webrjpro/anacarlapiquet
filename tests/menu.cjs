const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const {pathToFileURL}=require('node:url');
const path=require('node:path');
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});const errors=[];
 for(const [width,height] of [[320,700],[390,844],[768,800],[1364,635],[1920,1080]]){
  const page=await browser.newPage({viewport:{width,height},reducedMotion:'reduce'});page.on('pageerror',e=>errors.push(e.message));await page.goto(pathToFileURL(path.resolve('index.html')).href);await page.waitForFunction(()=>gameReady);
  assert(await page.locator('#menu-toggle').isVisible());assert(!await page.locator('#game-menu').isVisible());assert(!await page.locator('#chapters').isVisible());assert(await page.locator('.footer-score').isVisible());
  assert(await page.locator('#character-balloon').isVisible());const shortcut=await page.locator('#character-balloon').boundingBox(),menu=await page.locator('#menu-toggle').boundingBox();assert(menu.x+menu.width<shortcut.x);assert(shortcut.y+shortcut.height<64);await page.locator('#character-balloon').click();assert(await page.locator('#player-name').isVisible());assert(await page.locator('.character-picker').isVisible());assert(await page.locator('#player-photo').isVisible());await page.locator('#close-profile').click();
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  const footer=await page.evaluate(()=>{const q=document.querySelector('.quest-card').getBoundingClientRect(),s=document.querySelector('.footer-score').getBoundingClientRect();return {qRight:q.right,sLeft:s.left,qTop:q.top,sTop:s.top};});assert(footer.qRight<=footer.sLeft);assert.equal(footer.qTop,footer.sTop);
  await page.screenshot({path:`tmp/menu-board-${width}.png`,fullPage:true});
  await page.locator('#menu-toggle').click();assert.equal(await page.locator('#menu-toggle').getAttribute('aria-expanded'),'true');assert(await page.locator('#sound').isVisible());assert(await page.locator('#profile').isVisible());assert.equal(await page.locator('#chapters button').count(),40);
  await page.keyboard.press('Tab');assert(await page.evaluate(()=>document.activeElement.closest('#game-menu')!==null));await page.keyboard.press('Escape');await page.waitForFunction(()=>document.querySelector('#menu-toggle').getAttribute('aria-expanded')==='false');assert(!await page.locator('#game-menu').isVisible());assert.equal(await page.locator('#menu-toggle').evaluate(e=>e===document.activeElement),true);
  await page.locator('#menu-toggle').click();await page.screenshot({path:`tmp/menu-open-${width}.png`});await page.locator('[data-region="39"]').click();assert(await page.locator('#game-menu').isVisible());assert.match(await page.locator('#menu-message').textContent(),/cinco casas/);assert.equal(await page.evaluate(()=>frontier()),0);
  await page.locator('[data-region="0"]').click();assert(!await page.locator('#game-menu').isVisible());
  await page.locator('#menu-toggle').click();await page.locator('[data-view="guide"]').first().click();assert(!await page.locator('#game-menu').isVisible());assert(await page.locator('#guide-view').isVisible());
  await page.locator('#menu-toggle').click();await page.locator('[data-view="dedication"]').click();assert(await page.locator('#dedication-view').isVisible());assert.match(await page.locator('.dedication-card').textContent(),/Carlos Antonio de Oliveira Piquet/);assert.match(await page.locator('.dedication-card blockquote').textContent(),/Filha, seu pai te ama muito/);await page.screenshot({path:`tmp/dedication-${width}.png`,fullPage:true});
  await page.locator('#menu-toggle').click();await page.locator('#recenter').click();assert(await page.locator('#world-view').isVisible());
  await page.locator('#menu-toggle').click();await page.locator('#sound').click();assert(!await page.locator('#game-menu').isVisible());assert(await page.locator('#sound-dialog').isVisible());await page.locator('#close-sound').click();
  await page.locator('#menu-toggle').click();await page.locator('#profile').click();assert(await page.locator('#profile-dialog').isVisible());await page.keyboard.press('Escape');
  if(width>430){await page.locator('#menu-toggle').click();await page.mouse.click(width-10,50);assert(!await page.locator('#game-menu').isVisible());}
  await page.close();
 }
 assert.deepEqual(errors,[]);await browser.close();console.log('PASS: hamburger at five viewport sizes; compact quest with adjacent score; phases; navigation; audio/profile; keyboard focus, Escape and backdrop.');
})().catch(e=>{console.error(e);process.exit(1);});
