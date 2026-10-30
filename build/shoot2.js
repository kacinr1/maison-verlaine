const {chromium}=require('playwright');
(async()=>{
  const b=await chromium.launch({channel:'chrome'});
  const p=await b.newPage({viewport:{width:1500,height:1000},deviceScaleFactor:2});
  const url='file:///'+__dirname.replace(/\\/g,'/')+'/index.html';
  await p.goto(url,{waitUntil:'networkidle'});
  await p.evaluate(()=>document.getElementById('configurateur').scrollIntoView());
  await p.waitForTimeout(600);
  // navy + bordeaux tie + bordeaux pocket + flower + white shirt
  await p.click('[data-group="tie"] .chip:nth-child(2)');
  await p.click('[data-group="flower"] .chip:nth-child(2)');
  await p.waitForTimeout(500);
  const inner=await p.$('.stage-inner');
  const bb=await inner.boundingBox();
  // close-up of chest: top 42%
  await p.screenshot({path:'assets/shots/07_chest.png',clip:{x:bb.x,y:bb.y,width:bb.width,height:bb.height*0.46}});
  await inner.screenshot({path:'assets/shots/08_full_navy_tie.png'});
  await b.close();
  console.log('ok');
})().catch(e=>{console.error(e);process.exit(1)});
