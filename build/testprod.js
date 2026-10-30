const {chromium}=require('playwright');
(async()=>{
  const b=await chromium.launch({channel:'chrome',args:['--use-gl=angle','--use-angle=swiftshader','--ignore-gpu-blocklist']});
  const p=await b.newPage({viewport:{width:1280,height:900},deviceScaleFactor:1.4});
  const log=[];p.on('pageerror',e=>log.push('P'+e.message));p.on('console',m=>{if(m.type()==='error'&&!m.text().includes('404'))log.push('C'+m.text());});
  await p.goto('http://localhost:8777/viewer/index.html',{waitUntil:'load'});
  try{await p.waitForSelector('#load.hide',{timeout:30000});}catch(e){log.push('NOLOAD');}
  await p.waitForTimeout(2000);
  await p.screenshot({path:'assets/shots/PROD_default.png'});
  const g=await p.$$('.blk');
  await (await g[0].$$('.sw button'))[6].click(); // veste sable
  await (await g[2].$$('.sw button'))[6].click(); // pantalon sable
  await (await g[4].$$('.sw button'))[2].click(); // cravate or
  await (await g[3].$$('.sw button'))[1].click(); // chemise bleu ciel
  await p.waitForTimeout(1200);
  await p.screenshot({path:'assets/shots/PROD_recolor.png'});
  console.log('LOG',log.join('|')||'clean');
  await b.close();
})().catch(e=>{console.error(e);process.exit(1)});
