const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  console.log('\n🔍 DEBUG VIDÉO — Vérification approfondie\n');

  await page.goto('https://maison-verlaine-omega.vercel.app', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Vérifier l'élément vidéo en détail
  const videoDebug = await page.evaluate(() => {
    const video = document.getElementById('preEntryVideo');
    if (!video) return { error: 'Video element not found' };
    
    const sources = Array.from(video.querySelectorAll('source')).map(s => ({
      src: s.src,
      type: s.type
    }));

    return {
      videoFound: true,
      sources: sources,
      paused: video.paused,
      playing: !video.paused,
      currentTime: video.currentTime,
      duration: video.duration,
      readyState: video.readyState, // 0=NOTHING, 1=METADATA, 2=CURRENT, 3=FUTURE, 4=ENOUGH
      networkState: video.networkState, // 0=EMPTY, 1=IDLE, 2=LOADING, 3=NO_SOURCE
      autoplay: video.autoplay,
      muted: video.muted,
      playbackRate: video.playbackRate,
      volume: video.volume,
      canPlay: video.canPlayType('video/mp4'),
      error: video.error ? video.error.message : null,
      networkError: video.networkState === 3 ? 'NO_SOURCE or NETWORK_ERROR' : 'OK',
      buffered: `${video.buffered.length} ranges`,
      played: `${video.played.length} ranges`
    };
  });

  console.log('🎬 ÉTAT DE LA VIDÉO:');
  console.log(JSON.stringify(videoDebug, null, 2));

  // Vérifier que la source vidéo est accessible
  if (videoDebug.sources && videoDebug.sources.length > 0) {
    console.log('\n🌐 VÉRIFICATION DES SOURCES:');
    for (const src of videoDebug.sources) {
      console.log(`  URL: ${src.src}`);
      
      // Vérifier que le fichier existe
      try {
        const response = await page.request.head(src.src);
        console.log(`  Status: ${response.status()} ${response.status() === 200 ? '✅' : '❌'}`);
        console.log(`  Content-Type: ${response.headers()['content-type']}`);
        console.log(`  Content-Length: ${response.headers()['content-length']} bytes`);
      } catch (e) {
        console.log(`  ❌ ERREUR: ${e.message}`);
      }
    }
  }

  // Forcer la lecture et voir ce qui se passe
  console.log('\n⏯️  TENTATIVE DE FORCER LA LECTURE:');
  const playResult = await page.evaluate(async () => {
    const video = document.getElementById('preEntryVideo');
    if (!video) return { error: 'Video not found' };
    
    try {
      const playPromise = video.play();
      if (playPromise) {
        await playPromise;
        return { 
          success: true, 
          playing: !video.paused,
          currentTime: video.currentTime
        };
      }
    } catch (e) {
      return { 
        error: e.name, 
        message: e.message 
      };
    }
  });

  console.log(playResult);

  // Screenshot
  await page.screenshot({ path: 'debug-video-actual.png' });
  console.log('\n📸 Screenshot: debug-video-actual.png');

  // Afficher l'HTML de la vidéo
  console.log('\n📝 HTML DE LA VIDÉO:');
  const videoHTML = await page.locator('#preEntry').innerHTML();
  console.log(videoHTML.substring(0, 500));

  await browser.close();
})();
