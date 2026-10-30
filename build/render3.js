const {chromium}=require('playwright');
(async()=>{
  const b=await chromium.launch({channel:'chrome',args:['--use-gl=angle','--use-angle=swiftshader','--ignore-gpu-blocklist']});
  const p=await b.newPage({viewport:{width:760,height:1000},deviceScaleFactor:1.3});
  const log=[];p.on('pageerror',e=>log.push('P'+e.message));p.on('console',m=>{if(m.type()==='error')log.push('C'+m.text());});
  await p.goto('http://localhost:8777/viewer/dev3.html',{waitUntil:'load'});
  try{await p.waitForFunction('window.__ready===true',{timeout:30000});}catch(e){log.push('NR');}
  await p.waitForTimeout(1500);
  for(const [az,n] of [[0,'front'],[0.5,'q'],[Math.PI/2,'side']]){await p.evaluate(a=>setView(a),az);await p.waitForTimeout(400);await p.screenshot({path:`assets/shots/ASM_${n}.png`});}
  console.log('LOG',log.filter(x=>!x.includes('404')).join('|')||'clean');
  await b.close();
})().catch(e=>{console.error(e);process.exit(1)});
