const {chromium}=require('playwright');
(async()=>{
  const b=await chromium.launch({channel:'chrome'});
  const p=await b.newPage({viewport:{width:1440,height:920},deviceScaleFactor:1.25});
  const url='file:///'+__dirname.replace(/\\/g,'/')+'/index.html';
  await p.goto(url,{waitUntil:'networkidle'});
  await p.waitForTimeout(800);
  await p.screenshot({path:'assets/shots/01_hero.png'});

  // configurator
  await p.evaluate(()=>document.getElementById('configurateur').scrollIntoView());
  await p.waitForTimeout(900);
  await p.screenshot({path:'assets/shots/02_cfg_default.png'});

  // isolate the stage element for close inspection
  const stage=await p.$('.stage-frame');
  await stage.screenshot({path:'assets/shots/03_stage_navy.png'});

  // add a tie (Bordeaux), pocket Blanc, flower on
  await p.click('[data-group="tie"] .chip:nth-child(2)');
  await p.click('[data-group="pocket"] .chip:nth-child(2)');
  await p.click('[data-group="flower"] .chip:nth-child(2)');
  await p.waitForTimeout(500);
  await stage.screenshot({path:'assets/shots/04_stage_tie.png'});

  // change color to bordeaux, shirt bleu ciel
  await p.click('[data-group="color"] .swatch:nth-child(5)');
  await p.click('[data-group="shirt"] .swatch:nth-child(2)');
  await p.waitForTimeout(900);
  await stage.screenshot({path:'assets/shots/05_stage_bordeaux.png'});

  // full configurator panel view
  await p.screenshot({path:'assets/shots/06_cfg_full.png'});

  await b.close();
  console.log('shots done');
})().catch(e=>{console.error(e);process.exit(1)});
