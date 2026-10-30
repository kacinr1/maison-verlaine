const {chromium}=require('playwright');
(async()=>{
  const b=await chromium.launch({channel:'chrome'});
  const p=await b.newPage({viewport:{width:1500,height:1000},deviceScaleFactor:2});
  const url='file:///'+__dirname.replace(/\\/g,'/').replace('/build','')+'/index.html';
  await p.goto(url,{waitUntil:'networkidle'});
  await p.evaluate(()=>document.getElementById('configurateur').scrollIntoView());
  await p.waitForTimeout(600);
  const inner=await p.$('.stage-inner');
  await inner.screenshot({path:'assets/shots/V1_default.png'});           // navy, no tie, pocket on
  // velours fabric on navy + bordeaux tie + flower
  await p.click('[data-group="fabric"] .chip:nth-child(5)');  // velours
  await p.click('[data-group="tie"] .chip:nth-child(2)');     // bordeaux tie
  await p.click('[data-group="flower"] .chip:nth-child(2)');  // flower
  await p.waitForTimeout(700);
  await inner.screenshot({path:'assets/shots/V2_velours_tie.png'});
  // color sable + shirt bleu ciel + flannel
  await p.click('[data-group="color"] .swatch:nth-child(7)'); // sable
  await p.click('[data-group="shirt"] .swatch:nth-child(2)'); // bleu ciel
  await p.click('[data-group="fabric"] .chip:nth-child(3)');  // flannel
  await p.waitForTimeout(900);
  await inner.screenshot({path:'assets/shots/V3_sable_sky_flannel.png'});
  // chest closeup of V2 state redo: bordeaux suit + or tie
  await p.click('[data-group="color"] .swatch:nth-child(5)'); // bordeaux
  await p.click('[data-group="shirt"] .swatch:nth-child(1)'); // blanc
  await p.click('[data-group="tie"] .chip:nth-child(4)');     // or tie
  await p.waitForTimeout(700);
  const bb=await inner.boundingBox();
  await p.screenshot({path:'assets/shots/V4_chest.png',clip:{x:bb.x+bb.width*0.33,y:bb.y+bb.height*0.12,width:bb.width*0.42,height:bb.height*0.30}});
  await b.close();console.log('ok');
})().catch(e=>{console.error(e);process.exit(1)});
