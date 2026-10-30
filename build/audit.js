const {chromium}=require('playwright');
const fs=require('fs');
(async()=>{
  const b=await chromium.launch({channel:'chrome'});
  const p=await b.newPage({viewport:{width:1500,height:1100},deviceScaleFactor:2});
  const errs=[],failed=[];
  p.on('console',m=>{if(m.type()==='error')errs.push(m.text());});
  p.on('pageerror',e=>errs.push('PAGEERROR: '+e.message));
  p.on('requestfailed',r=>failed.push(r.url()+' :: '+(r.failure()&&r.failure().errorText)));
  const url='file:///'+__dirname.replace(/\\/g,'/').replace('/build','')+'/index.html';
  await p.goto(url,{waitUntil:'networkidle'});
  await p.evaluate(()=>document.getElementById('configurateur').scrollIntoView());
  await p.waitForTimeout(600);
  const inner=await p.$('.stage-inner');

  async function cycle(group,sel,names,label,clipChest){
    const items=await p.$$(`[data-group="${group}"] ${sel}`);
    const shots=[];
    for(let i=0;i<items.length;i++){
      await items[i].click(); await p.waitForTimeout(650);
      const f=`assets/shots/A_${label}_${i}.png`;
      if(clipChest){const bb=await inner.boundingBox();
        await p.screenshot({path:f,clip:{x:bb.x+bb.width*0.28,y:bb.y+bb.height*0.14,width:bb.width*0.46,height:bb.height*0.34}});
      } else await inner.screenshot({path:f});
      shots.push(f);
    }
    return shots;
  }
  // reset tie off / pocket on for clean color/fabric views
  await cycle('color','.swatch',null,'color',false);
  await cycle('shirt','.swatch',null,'shirt',true);
  await cycle('fabric','.chip',null,'fabric',true);
  // put a suit color with contrast for ties (grey) then cycle ties
  await p.click('[data-group="color"] .swatch:nth-child(2)'); await p.waitForTimeout(500);
  await cycle('tie','.chip',null,'tie',true);
  await cycle('pocket','.chip',null,'pocket',true);

  // check assets loaded
  const assets=await p.evaluate(()=>{
    const bad=[];
    document.querySelectorAll('img').forEach(im=>{if(!im.complete||im.naturalWidth===0)bad.push(im.src);});
    return bad;
  });
  fs.writeFileSync('assets/shots/_audit.json',JSON.stringify({errs,failed,badImgs:assets},null,1));
  console.log('CONSOLE ERRORS:',errs.length,'| FAILED REQ:',failed.length,'| BAD IMGS:',assets.length);
  if(errs.length)console.log(errs.join('\n'));
  if(failed.length)console.log('FAILED:\n'+failed.join('\n'));
  await b.close();console.log('audit done');
})().catch(e=>{console.error(e);process.exit(1)});
