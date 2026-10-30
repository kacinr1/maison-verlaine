const {chromium}=require('playwright');
(async()=>{
  const b=await chromium.launch({channel:'chrome',args:['--use-gl=angle','--use-angle=swiftshader','--ignore-gpu-blocklist']});
  const p=await b.newPage({viewport:{width:1280,height:900},deviceScaleFactor:1.5});
  const log=[];p.on('console',m=>{if(m.type()==='error')log.push('C:'+m.text());});p.on('pageerror',e=>log.push('P:'+e.message));
  await p.goto('http://localhost:8777/viewer/index.html',{waitUntil:'load'});
  try{await p.waitForSelector('#load.hide',{timeout:25000});}catch(e){log.push('NOLOAD');}
  await p.waitForTimeout(2500);
  await p.screenshot({path:'assets/shots/CFG3D_default.png'});
  const groups=await p.$$('.blk');
  // Costume=Camel(8th), Cravate=Or(3rd), Chemise=Rosé(3rd), Souliers=Cognac(4th)
  await (await groups[0].$$('.sw button'))[7].click(); // camel
  await (await groups[1].$$('.sw button'))[2].click(); // cravate or
  await (await groups[2].$$('.sw button'))[2].click(); // chemise rosé
  await (await groups[3].$$('.sw button'))[3].click(); // souliers cognac
  await p.waitForTimeout(1500);
  // front close + zoom to chest via camera? just front
  await p.screenshot({path:'assets/shots/CFG3D_recolor.png'});
  // zoom chest crop
  await p.screenshot({path:'assets/shots/CFG3D_chest.png',clip:{x:430,y:120,width:430,height:420}});
  console.log('LOG:',log.join(' | ')||'clean');
  await b.close();console.log('done');
})().catch(e=>{console.error(e);process.exit(1)});
