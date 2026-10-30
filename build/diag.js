const {chromium}=require('playwright');
(async()=>{
  const b=await chromium.launch({channel:'chrome'});
  const p=await b.newPage({viewport:{width:1500,height:1000},deviceScaleFactor:3});
  const url='file:///'+__dirname.replace(/\\/g,'/').replace('/build','')+'/index.html';
  await p.goto(url,{waitUntil:'networkidle'});
  await p.evaluate(()=>document.getElementById('configurateur').scrollIntoView());
  await p.waitForTimeout(500);
  await p.click('[data-group="tie"] .chip:nth-child(3)'); // bleu nuit tie on navy -> contrast: use bordeaux instead
  await p.click('[data-group="tie"] .chip:nth-child(2)'); // bordeaux
  await p.waitForTimeout(500);
  const inner=await p.$('.stage-inner');
  const bb=await inner.boundingBox();
  // tight collar/knot crop: x 40-64%, y 14-40%
  await p.screenshot({path:'assets/shots/D_collar.png',clip:{
    x:bb.x+bb.width*0.38, y:bb.y+bb.height*0.13,
    width:bb.width*0.30, height:bb.height*0.28}});
  // pocket crop
  await p.screenshot({path:'assets/shots/D_pocket.png',clip:{
    x:bb.x+bb.width*0.52, y:bb.y+bb.height*0.20,
    width:bb.width*0.22, height:bb.height*0.14}});
  await b.close();console.log('ok');
})().catch(e=>{console.error(e);process.exit(1)});
