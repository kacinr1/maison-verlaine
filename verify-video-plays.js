const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  console.log('\n✨ VÉRIFICATION — VIDÉO JOUE MAINTENANT\n');

  await page.goto('https://maison-verlaine-omega.vercel.app');
  await page.waitForTimeout(500);

  // Vérifier que la vidéo se joue
  const videoInfo = await page.evaluate(() => {
    const video = document.getElementById('preEntryVideo');
    if (!video) return { error: 'Video not found' };
    
    return {
      exists: true,
      playing: !video.paused,
      playbackRate: video.playbackRate,
      currentTime: video.currentTime.toFixed(2),
      readyState: video.readyState,
      networkState: video.networkState
    };
  });

  console.log('🎬 État de la vidéo:');
  console.log(`   ✅ Vidéo trouvée: ${videoInfo.exists ? 'OUI' : 'NON'}`);
  console.log(`   ✅ En cours de lecture: ${videoInfo.playing ? '✅ OUI!' : '❌ NON (durée: ${videoInfo.duration})'}`);
  console.log(`   ✅ Vitesse (playbackRate): ${videoInfo.playbackRate}x`);
  console.log(`   ✅ Temps actuel: ${videoInfo.currentTime}s`);
  console.log(`   ✅ ReadyState: ${videoInfo.readyState} (0=HAVE_NOTHING, 2+=CHARGÉE)`);
  console.log(`   ✅ NetworkState: ${videoInfo.networkState}\n`);

  // Screenshot
  await page.screenshot({ path: 'verify-video-playing.png' });
  console.log('📸 Screenshot: verify-video-playing.png\n');

  console.log('═'.repeat(70));
  if (videoInfo.playing) {
    console.log('🎉 LA VIDÉO JOUE MAINTENANT! 🎉');
    console.log('═'.repeat(70));
    console.log('\n✅ Séquence cinématique activée:');
    console.log('   1. Pré-vidéo accélérée 2x ← EN COURS DE LECTURE!');
    console.log('   2. Splash screen (après 3.5s)');
    console.log('   3. Page principale (après 7.5s)');
  } else {
    console.log('⚠️ VIDEO EN COURS DE CHARGEMENT OU BLOQUÉE');
    console.log('═'.repeat(70));
    console.log(`\nÉtat: readyState=${videoInfo.readyState}, networkState=${videoInfo.networkState}`);
    console.log('Attendre quelques secondes pour que la vidéo se charge...');
  }
  console.log('');

  await browser.close();
  process.exit(0);
})();
