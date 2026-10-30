const {chromium}=require('playwright');
(async()=>{
  const b=await chromium.launch({channel:'chrome',args:['--use-gl=angle','--use-angle=swiftshader','--ignore-gpu-blocklist']});
  const p=await b.newPage({viewport:{width:900,height:1000},deviceScaleFactor:1.6});
  await p.goto('http://localhost:8777/viewer/index.html',{waitUntil:'load'});
  await p.waitForSelector('#load.hide',{timeout:30000});
  await p.waitForTimeout(1500);
  const g=await p.$$('.blk');
  // gilet group index 1 -> set to Vert anglais(6th) for contrast; veste gris(2nd) to see vest in V
  await (await g[1].$$('.sw button'))[5].click(); // gilet vert
  await (await g[0].$$('.sw button'))[1].click(); // veste gris
  await p.waitForTimeout(1000);
  await p.screenshot({path:'assets/shots/GILET_chk.png',clip:{x:300,y:120,width:320,height:360}});
  await b.close();console.log('ok');
})().catch(e=>{console.error(e);process.exit(1)});
