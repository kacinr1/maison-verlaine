const {chromium}=require('playwright');
(async()=>{
  const b=await chromium.launch({channel:'chrome'});
  const p=await b.newPage({viewport:{width:1500,height:1100},deviceScaleFactor:2});
  const url='file:///'+__dirname.replace(/\\/g,'/').replace('/build','')+'/index.html';
  await p.goto(url,{waitUntil:'networkidle'});
  await p.evaluate(()=>document.getElementById('configurateur').scrollIntoView());
  await p.waitForTimeout(500);
  const inner=await p.$('.stage-inner');
  await inner.screenshot({path:'assets/shots/S0_white.png'});
  await p.click('[data-group="shirt"] .swatch:nth-child(2)'); await p.waitForTimeout(500);
  await inner.screenshot({path:'assets/shots/S1_sky.png'});
  await p.click('[data-group="shirt"] .swatch:nth-child(3)'); await p.waitForTimeout(500);
  await inner.screenshot({path:'assets/shots/S2_rose.png'});
  await b.close();console.log('ok');
})().catch(e=>{console.error(e);process.exit(1)});
