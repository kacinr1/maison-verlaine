const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto('https://maison-verlaine-omega.vercel.app', { waitUntil: 'domcontentloaded' });

  // Vérifier la structure HTML
  const preEntryExists = await page.locator('#preEntry').count();
  const preVideoElement = await page.locator('#preEntry video').count();
  const preVideoSource = await page.locator('#preEntry video source').getAttribute('src').catch(() => 'NOT FOUND');
  
  console.log('\n🔍 DEBUG PRÉ-ENTRÉE:');
  console.log('─'.repeat(70));
  console.log(`\n✅ Élément #preEntry existe: ${preEntryExists > 0 ? 'OUI' : 'NON'}`);
  console.log(`✅ Vidéo dans #preEntry: ${preVideoElement > 0 ? 'OUI' : 'NON'}`);
  console.log(`✅ Source vidéo: ${preVideoSource.split('/').pop()}\n`);

  // Vérifier les styles
  const preEntryStyle = await page.evaluate(() => {
    const el = document.getElementById('preEntry');
    if (!el) return 'NOT FOUND';
    const style = window.getComputedStyle(el);
    return {
      display: style.display,
      opacity: style.opacity,
      position: style.position,
      zIndex: style.zIndex,
      width: style.width,
      height: style.height
    };
  });

  console.log('🎨 STYLES:');
  console.log(JSON.stringify(preEntryStyle, null, 2));

  // Vérifier si la vidéo se joue
  const videoPlayback = await page.evaluate(() => {
    const video = document.querySelector('#preEntry video');
    if (!video) return 'NOT FOUND';
    return {
      paused: video.paused,
      currentTime: video.currentTime,
      playbackRate: video.playbackRate,
      duration: video.duration,
      readyState: video.readyState
    };
  });

  console.log('\n🎬 LECTEUR VIDÉO:');
  console.log(JSON.stringify(videoPlayback, null, 2));

  // Screenshot
  await page.screenshot({ path: 'debug-pre-entry.png' });
  console.log('\n📸 Screenshot sauvegardé: debug-pre-entry.png\n');

  await browser.close();
  process.exit(0);
})();
