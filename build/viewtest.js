const {chromium}=require('playwright');
(async()=>{
  const b=await chromium.launch({channel:'chrome',args:['--use-gl=angle','--use-angle=swiftshader','--ignore-gpu-blocklist']});
  const p=await b.newPage({viewport:{width:1200,height:850},deviceScaleFactor:1.5});
  const log=[];
  p.on('console',m=>log.push(m.type()+': '+m.text()));
  p.on('pageerror',e=>log.push('PAGEERR: '+e.message));
  p.on('requestfailed',r=>log.push('REQFAIL: '+r.url()+' '+(r.failure()&&r.failure().errorText)));
  const url='file:///'+__dirname.replace(/\\/g,'/').replace('/build','')+'/viewer/index.html';
  await p.goto(url,{waitUntil:'load'});
  await p.waitForTimeout(12000);
  const loaded=await p.evaluate(()=>document.getElementById('load').classList.contains('hide'));
  const webgl=await p.evaluate(()=>{try{const c=document.createElement('canvas');return !!(c.getContext('webgl2')||c.getContext('webgl'));}catch(e){return 'ERR '+e.message;}});
  console.log('MODEL LOADED:',loaded,'| WEBGL:',webgl);
  console.log(log.join('\n'));
  await p.screenshot({path:'assets/shots/VIEW_front.png'});
  await b.close();
})().catch(e=>{console.error(e);process.exit(1)});
