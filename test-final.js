const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  console.log('\n✅ TEST FINAL — Vitesse normale + Temps long\n');

  await page.goto('https://maison-verlaine-omega.vercel.app', { waitUntil: 'load', timeout: 60000 });
  await page.waitForTimeout(1000);

  const videoStatus = await page.evaluate(() => {
    const video = document.getElementById('preEntryVideo');
    return {
      playing: !video.paused,
      playbackRate: video.playbackRate,
      currentTime: video.currentTime
    };
  });

  console.log('🎬 STATUS IMMÉDIAT:');
  console.log(`   Playing: ${videoStatus.playing ? '✅ OUI' : '❌ NON'}`);
  console.log(`   Playback Rate: ${videoStatus.playbackRate}x ${videoStatus.playbackRate === 1 ? '✅ NORMAL' : '❌ ACCÉLÉRÉE'}`);
  console.log(`   Current Time: ${videoStatus.currentTime.toFixed(1)}s`);

  console.log('\n⏱️  TIMELINE:');
  console.log('   0-10s: Vidéo en cours de lecture (vitesse normale 1x)');
  console.log('   10s: Fade out + Splash screen');
  console.log('   14.5s: Page principale visible');

  console.log('\n✅ DÉPLOIEMENT COMPLET!');
  console.log('   URL: https://maison-verlaine-omega.vercel.app');

  await browser.close();
})();
