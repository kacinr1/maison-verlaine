const {chromium}=require('playwright');
(async()=>{
  const b=await chromium.launch({channel:'chrome',args:['--use-gl=angle','--use-angle=swiftshader','--ignore-gpu-blocklist']});
  const p=await b.newPage({viewport:{width:800,height:980},deviceScaleFactor:1.5});
  const log=[];
  p.on('console',m=>{if(m.type()==='error')log.push('C:'+m.text());});
  p.on('pageerror',e=>log.push('P:'+e.message));
  await p.goto('http://localhost:8777/viewer/dev2.html?dbg=1',{waitUntil:'load'});
  try{await p.waitForFunction('window.__ready===true',{timeout:20000});}catch(e){log.push('NOTREADY');}
  await p.waitForTimeout(800);
  console.log('counts:',await p.evaluate(()=>window.__counts));
  console.log('LOG:\n'+log.join('\n'));
  await p.screenshot({path:'assets/shots/SEG_front.png'});
  await b.close();
})().catch(e=>{console.error(e);process.exit(1)});
