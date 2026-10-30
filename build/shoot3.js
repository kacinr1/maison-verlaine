const {chromium}=require('playwright');
(async()=>{
  const b=await chromium.launch({channel:'chrome'});
  // desktop full page
  const p=await b.newPage({viewport:{width:1440,height:900},deviceScaleFactor:1});
  const url='file:///'+__dirname.replace(/\\/g,'/')+'/index.html';
  await p.goto(url,{waitUntil:'networkidle'});
  await p.evaluate(async()=>{ // trigger all reveals
    for(let y=0;y<document.body.scrollHeight;y+=600){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,120));}
    window.scrollTo(0,0);
  });
  await p.waitForTimeout(500);
  await p.screenshot({path:'assets/shots/FULL.png',fullPage:true});
  for(const [id,name] of [['hero','s_hero'],['maison','s_maison'],['etoffes','s_etoffes'],['parcours','s_parcours'],['lookbook','s_lookbook'],['contact','s_contact']]){
    await p.evaluate(i=>document.getElementById(i).scrollIntoView(),id);
    await p.waitForTimeout(400);
    await p.screenshot({path:`assets/shots/${name}.png`});
  }
  // mobile
  const m=await b.newPage({viewport:{width:390,height:844},deviceScaleFactor:2,isMobile:true});
  await m.goto(url,{waitUntil:'networkidle'});
  await m.waitForTimeout(400);
  await m.screenshot({path:'assets/shots/M_hero.png'});
  await m.evaluate(()=>document.getElementById('configurateur').scrollIntoView());
  await m.waitForTimeout(600);
  await m.screenshot({path:'assets/shots/M_cfg.png'});
  await b.close();console.log('ok');
})().catch(e=>{console.error(e);process.exit(1)});
