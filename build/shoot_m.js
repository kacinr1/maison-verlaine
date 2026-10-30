const {chromium}=require('playwright');
(async()=>{
  const b=await chromium.launch({channel:'chrome'});
  const m=await b.newPage({viewport:{width:390,height:844},deviceScaleFactor:2,isMobile:true});
  const url='file:///'+__dirname.replace(/\\/g,'/')+'/index.html';
  await m.goto(url,{waitUntil:'networkidle'});
  await m.evaluate(()=>document.querySelector('.stage-frame').scrollIntoView({block:'center'}));
  await m.waitForTimeout(700);
  await m.screenshot({path:'assets/shots/M_stage.png'});
  await b.close();console.log('ok');
})().catch(e=>{console.error(e);process.exit(1)});
