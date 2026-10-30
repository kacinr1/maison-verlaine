const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  console.log('\n🎬 TEST COMPLET — Vidéo du début à la fin\n');

  await page.goto('https://maison-verlaine-omega.vercel.app', { waitUntil: 'networkidle', timeout: 60000 });

  // Vérifier immédiatement
  console.log('T=0s: Chargement page...');
  let status = await page.evaluate(() => {
    const video = document.getElementById('preEntryVideo');
    const preEntry = document.getElementById('preEntry');
    return {
      videoExists: !!video,
      preEntryVisible: preEntry?.offsetHeight > 0,
      playing: !video?.paused,
      currentTime: video?.currentTime || 0,
      duration: video?.duration || 0
    };
  });
  console.log(`   Vidéo visible: ${status.preEntryVisible ? '✅' : '❌'}`);
  console.log(`   En cours: ${status.playing ? '✅' : '❌'}`);
  console.log(`   Temps: ${status.currentTime.toFixed(2)}s / ${status.duration.toFixed(2)}s`);

  // Attendre 5s
  await page.waitForTimeout(5000);
  console.log('\nT=5s: Milieu de la vidéo...');
  status = await page.evaluate(() => {
    const video = document.getElementById('preEntryVideo');
    return {
      playing: !video?.paused,
      currentTime: video?.currentTime || 0,
      duration: video?.duration || 0,
      progress: video ? (video.currentTime / video.duration * 100).toFixed(0) : 0
    };
  });
  console.log(`   En cours: ${status.playing ? '✅' : '❌'}`);
  console.log(`   Temps: ${status.currentTime.toFixed(2)}s / ${status.duration.toFixed(2)}s (${status.progress}%)`);

  // Attendre jusqu'à la fin
  await page.waitForTimeout(8000);
  console.log('\nT=13s: Après fin vidéo...');
  status = await page.evaluate(() => {
    const video = document.getElementById('preEntryVideo');
    const preEntry = document.getElementById('preEntry');
    const mainContent = document.querySelector('.hero');
    return {
      videoVisible: preEntry?.offsetHeight > 0,
      mainVisible: mainContent?.offsetHeight > 0,
      currentTime: video?.currentTime || 0,
      duration: video?.duration || 0
    };
  });
  console.log(`   Vidéo visible: ${status.videoVisible ? '✅' : '❌'}`);
  console.log(`   Page principale visible: ${status.mainVisible ? '✅' : '❌'}`);
  console.log(`   Vidéo fini: ${status.currentTime >= (status.duration - 0.5) ? '✅' : '⚠️'}`);

  console.log('\n✅ TEST COMPLET TERMINÉ\n');

  await browser.close();
})();
