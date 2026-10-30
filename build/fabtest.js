const {chromium}=require('playwright');
(async()=>{
  const b=await chromium.launch({channel:'chrome'});
  const p=await b.newPage({viewport:{width:1500,height:1100},deviceScaleFactor:2});
  const url='file:///'+__dirname.replace(/\\/g,'/').replace('/build','')+'/index.html';
  await p.goto(url,{waitUntil:'networkidle'});
  await p.evaluate(()=>document.getElementById('configurateur').scrollIntoView());
  await p.waitForTimeout(500);
  const inner=await p.$('.stage-inner');
  const fabs=['twill','herring','flannel','linen','velours'];
  for(let i=0;i<5;i++){
    await p.click(`[data-group="fabric"] .chip:nth-child(${i+1})`);
    await p.waitForTimeout(500);
    await inner.screenshot({path:`assets/shots/F_${fabs[i]}.png`});
  }
  await b.close();console.log('ok');
})().catch(e=>{console.error(e);process.exit(1)});
