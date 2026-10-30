const {chromium}=require('playwright');
(async()=>{
  const file=process.argv[2]||'ensemble.glb';
  const tag=process.argv[3]||'ens';
  const b=await chromium.launch({channel:'chrome',args:['--use-gl=angle','--use-angle=swiftshader','--ignore-gpu-blocklist']});
  const p=await b.newPage({viewport:{width:900,height:1000},deviceScaleFactor:1.5});
  const log=[];p.on('pageerror',e=>log.push('ERR '+e.message));
  await p.goto('http://localhost:8777/viewer/dev.html?f='+file,{waitUntil:'load'});
  try{await p.waitForFunction('window.__ready===true',{timeout:25000});}catch(e){log.push('NOT READY');}
  await p.waitForTimeout(1200);
  const bbox=await p.evaluate(()=>window.__bbox);
  console.log(file,'bbox',JSON.stringify(bbox),'errs',log.join('|'));
  for(const [az,name] of [[0,'front'],[Math.PI/2,'side'],[Math.PI*0.25,'q']]){
    await p.evaluate(a=>window.setView(a),az);await p.waitForTimeout(500);
    await p.screenshot({path:`assets/shots/R_${tag}_${name}.png`});
  }
  await b.close();console.log('done');
})().catch(e=>{console.error(e);process.exit(1)});
