const {chromium}=require('playwright');
(async()=>{
  const b=await chromium.launch({channel:'chrome'});
  const base='file:///'+__dirname.replace(/\\/g,'/').replace('/build','')+'/index.html';
  // desktop configurator default
  const p=await b.newPage({viewport:{width:1440,height:900},deviceScaleFactor:1.25});
  await p.goto(base,{waitUntil:'networkidle'});
  await p.evaluate(()=>document.getElementById('configurateur').scrollIntoView());
  await p.waitForTimeout(700);
  await p.screenshot({path:'assets/shots/FINAL_cfg.png'});
  // a styled state: navy + bordeaux tie + sky shirt + velours
  await p.click('[data-group="tie"] .chip:nth-child(2)');
  await p.click('[data-group="shirt"] .swatch:nth-child(2)');
  await p.click('[data-group="fabric"] .chip:nth-child(5)');
  await p.waitForTimeout(700);
  await p.screenshot({path:'assets/shots/FINAL_cfg_styled.png'});
  // mobile
  const m=await b.newPage({viewport:{width:390,height:844},deviceScaleFactor:2,isMobile:true});
  await m.goto(base,{waitUntil:'networkidle'});
  await m.evaluate(()=>document.querySelector('.stage-frame').scrollIntoView({block:'center'}));
  await m.waitForTimeout(700);
  await m.screenshot({path:'assets/shots/FINAL_mobile.png'});
  await b.close();console.log('ok');
})().catch(e=>{console.error(e);process.exit(1)});
