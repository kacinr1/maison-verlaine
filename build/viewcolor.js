const {chromium}=require('playwright');
(async()=>{
  const b=await chromium.launch({channel:'chrome',args:['--use-gl=angle','--use-angle=swiftshader','--ignore-gpu-blocklist']});
  const p=await b.newPage({viewport:{width:1200,height:850},deviceScaleFactor:1.5});
  const url='file:///'+__dirname.replace(/\\/g,'/').replace('/build','')+'/viewer/index.html';
  await p.goto(url,{waitUntil:'load'});
  await p.waitForSelector('#load.hide',{timeout:25000});
  await p.waitForTimeout(1500);
  await p.click('#colors button:nth-child(5)');
  await p.waitForTimeout(800);
  await p.screenshot({path:'assets/shots/VIEW_recolor.png'});
  await b.close();console.log('ok');
})().catch(e=>{console.error(e);process.exit(1)});
