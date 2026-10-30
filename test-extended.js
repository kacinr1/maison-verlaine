const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  console.log('\n🎬 TEST ÉTENDU — 25s pour vidéo complète\n');

  await page.goto('https://maison-verlaine-omega.vercel.app', { waitUntil: 'load', timeout: 60000 });

  // T=0
  console.log('T=0s: Début');
  let status = await page.evaluate(() => {
    const video = document.getElementById('preEntryVideo');
    return {
      playing: !video?.paused,
      time: (video?.currentTime || 0).toFixed(1),
      duration: (video?.duration || 0).toFixed(1)
    };
  });
  console.log(`   Playing: ${status.playing ? '✅' : '❌'} | ${status.time}s / ${status.duration}s`);

  // T=8
  await page.waitForTimeout(8000);
  console.log('\nT=8s: Milieu');
  status = await page.evaluate(() => {
    const video = document.getElementById('preEntryVideo');
    return {
      playing: !video?.paused,
      time: (video?.currentTime || 0).toFixed(1),
      duration: (video?.duration || 0).toFixed(1),
      pct: video ? Math.round((video.currentTime / video.duration) * 100) : 0
    };
  });
  console.log(`   Playing: ${status.playing ? '✅' : '❌'} | ${status.time}s / ${status.duration}s (${status.pct}%)`);

  // T=16
  await page.waitForTimeout(8000);
  console.log('\nT=16s: Presque fini');
  status = await page.evaluate(() => {
    const video = document.getElementById('preEntryVideo');
    return {
      playing: !video?.paused,
      time: (video?.currentTime || 0).toFixed(1),
      duration: (video?.duration || 0).toFixed(1),
      pct: video ? Math.round((video.currentTime / video.duration) * 100) : 0
    };
  });
  console.log(`   Playing: ${status.playing ? '✅' : '❌'} | ${status.time}s / ${status.duration}s (${status.pct}%)`);

  // T=26
  await page.waitForTimeout(10000);
  console.log('\nT=26s: Après timeout (page doit être visible)');
  status = await page.evaluate(() => {
    const preEntry = document.getElementById('preEntry');
    const hero = document.querySelector('.hero');
    const video = document.getElementById('preEntryVideo');
    return {
      preEntryVisible: preEntry?.offsetHeight > 0,
      heroVisible: hero?.offsetHeight > 0,
      time: (video?.currentTime || 0).toFixed(1),
      duration: (video?.duration || 0).toFixed(1)
    };
  });
  console.log(`   Pré-vidéo visible: ${status.preEntryVisible ? '❌' : '✅ (cachée)'}`);
  console.log(`   Page principale visible: ${status.heroVisible ? '✅' : '❌'}`);
  console.log(`   Vidéo stoppée à: ${status.time}s (fini à ${status.duration}s)`);

  console.log('\n✅ DÉPLOYÉ: d01cf3e\n');

  await browser.close();
})();
