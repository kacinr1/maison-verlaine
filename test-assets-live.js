const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  console.log('\n' + '='.repeat(70));
  console.log('✨ VÉRIFICATION ASSETS 2.0 LIVE');
  console.log('='.repeat(70) + '\n');

  await page.goto('https://maison-verlaine-omega.vercel.app', { waitUntil: 'load' });
  console.log('✅ Site chargé\n');

  // Vérifier les images macro
  console.log('🖼️  IMAGES MACRO CINÉMATIQUES:');
  console.log('-'.repeat(70));

  const macroImages = await page.locator('img[src*="macro"]').all();
  console.log(`✅ Images macro trouvées: ${macroImages.length}`);

  for (let i = 0; i < macroImages.length; i++) {
    const alt = await macroImages[i].getAttribute('alt');
    const src = await macroImages[i].getAttribute('src');
    const visible = await macroImages[i].isVisible({ timeout: 1000 }).catch(() => false);
    
    console.log(`   ${i+1}. ${alt} — ${visible ? '✅ VISIBLE' : '⚠️  CACHÉ'}`);
  }

  console.log('\n🎬 VIDÉOS MACRO CINÉMATIQUES:');
  console.log('-'.repeat(70));

  const videoSources = await page.locator('video source[src*="macro"]').all();
  console.log(`✅ Sources vidéo macro trouvées: ${videoSources.length}`);

  const videoSrcs = new Set();
  for (const src of videoSources) {
    const srcAttr = await src.getAttribute('src');
    if (srcAttr) videoSrcs.add(srcAttr.split('/').pop());
  }

  Array.from(videoSrcs).forEach((v, i) => {
    console.log(`   ${i+1}. ${v}`);
  });

  console.log('\n📊 STATISTIQUES:');
  console.log('-'.repeat(70));

  const allImages = await page.locator('img').count();
  const allVideos = await page.locator('video').count();
  
  console.log(`✅ Total images: ${allImages}`);
  console.log(`✅ Total vidéos: ${allVideos}`);
  console.log(`✅ Images macro: ${macroImages.length} / ${allImages}`);
  console.log(`✅ Vidéos macro: ${videoSrcs.size} / ${allVideos}\n`);

  console.log('='.repeat(70));
  if (macroImages.length > 0 && videoSrcs.size > 0) {
    console.log('✨ ASSETS 2.0 INTÉGRÉS & VISIBLES EN LIVE ✨');
  } else {
    console.log('⚠️  Vérifier l\'intégration');
  }
  console.log('='.repeat(70) + '\n');

  await browser.close();
  process.exit(0);
})();
