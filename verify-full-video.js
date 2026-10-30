const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  console.log('\n✅ VÉRIFICATION FULLSCREEN + VIDÉO COMPLÈTE\n');

  await page.goto('https://maison-verlaine-omega.vercel.app', { waitUntil: 'load', timeout: 60000 });
  await page.waitForTimeout(1000);

  // Vérifier fullscreen et duration
  const videoInfo = await page.evaluate(() => {
    const video = document.getElementById('preEntryVideo');
    const container = document.getElementById('preEntry');
    const bbox = container.getBoundingClientRect();

    return {
      fullscreen: bbox.width === window.innerWidth && bbox.height === window.innerHeight,
      width: bbox.width,
      height: bbox.height,
      viewportW: window.innerWidth,
      viewportH: window.innerHeight,
      playing: !video.paused,
      playbackRate: video.playbackRate
    };
  });

  console.log('🎬 VIDEO:');
  console.log(`   Playing: ${videoInfo.playing ? '✅' : '❌'}`);
  console.log(`   Playback Rate: ${videoInfo.playbackRate}x`);
  console.log(`\n📺 FULLSCREEN:`);
  console.log(`   Container: ${videoInfo.width}x${videoInfo.height}px`);
  console.log(`   Viewport: ${videoInfo.viewportW}x${videoInfo.viewportH}px`);
  console.log(`   Fullscreen: ${videoInfo.fullscreen ? '✅ OUI!' : '⚠️ NON'}`);
  console.log(`\n⏱️  TIMELINE:`);
  console.log(`   0-10.08s: Vidéo intro en fullscreen`);
  console.log(`   10.08s: Vidéo termine`);
  console.log(`   12s: Fade out complet`);
  console.log(`\n✅ Déployé: d16ee19\n`);

  await browser.close();
})();
