const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  console.log('\n✅ TEST — La vidéo joue maintenant?\n');

  await page.goto('https://maison-verlaine-omega.vercel.app', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  const videoDebug = await page.evaluate(() => {
    const video = document.getElementById('preEntryVideo');
    const sources = Array.from(video.querySelectorAll('source')).map(s => s.src);
    
    return {
      sources: sources,
      playing: !video.paused,
      readyState: video.readyState,
      networkState: video.networkState,
      currentTime: video.currentTime,
      buffered: video.buffered.length > 0
    };
  });

  console.log('🎬 VIDEO STATUS:');
  console.log(`   Source: ${videoDebug.sources[0]}`);
  console.log(`   Playing: ${videoDebug.playing ? '✅ OUI!' : '❌ NON'}`);
  console.log(`   ReadyState: ${videoDebug.readyState}`);
  console.log(`   NetworkState: ${videoDebug.networkState}`);
  console.log(`   Buffered: ${videoDebug.buffered ? '✅' : '❌'}`);

  // Vérifier que le fichier existe
  const srcUrl = videoDebug.sources[0];
  const response = await page.request.head(srcUrl);
  console.log(`   File Status: ${response.status()} ${response.status() === 200 ? '✅ EXISTE!' : '❌ 404'}`);

  await page.screenshot({ path: 'test-video-final.png' });

  await browser.close();
  
  if (videoDebug.playing && response.status() === 200) {
    console.log('\n🎉 LA VIDÉO JOUE MAINTENANT!\n');
  }
})();
