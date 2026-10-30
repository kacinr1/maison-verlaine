const {chromium}=require('playwright');
(async()=>{
  const b=await chromium.launch({channel:'chrome',args:['--use-gl=angle','--use-angle=swiftshader','--ignore-gpu-blocklist']});
  const p=await b.newPage({viewport:{width:1100,height:1100},deviceScaleFactor:2.2});
  await p.goto('http://localhost:8777/viewer/index.html',{waitUntil:'load'});
  await p.waitForSelector('#load.hide',{timeout:30000});
  await p.waitForTimeout(1500);
  // zoom in with wheel over canvas
  const c=await p.$('#c');const box=await c.boundingBox();
  for(let i=0;i<7;i++){await p.mouse.move(box.x+box.width/2,box.y+box.height*0.38);await p.mouse.wheel(0,-240);await p.waitForTimeout(80);}
  await p.waitForTimeout(800);
  await p.screenshot({path:'assets/shots/ZOOM_fabric.png',clip:{x:300,y:250,width:900,height:900}});
  await b.close();console.log('ok');
})().catch(e=>{console.error(e);process.exit(1)});
