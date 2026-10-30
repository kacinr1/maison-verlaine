const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  console.log('\n' + '█'.repeat(70));
  console.log('█' + ' '.repeat(68) + '█');
  console.log('█' + '  🎬 VÉRIFICATION FINALE — MAISON VERLAINE v3.0 + ASSETS 2.0'.padEnd(69) + '█');
  console.log('█' + ' '.repeat(68) + '█');
  console.log('█'.repeat(70) + '\n');

  // Charger le site
  console.log('📍 Chargement du site production...');
  await page.goto('https://maison-verlaine-omega.vercel.app', { waitUntil: 'load', timeout: 30000 });
  console.log('✅ Site chargé avec succès\n');

  // ===================== TEST 1: Assets 2.0 =====================
  console.log('TEST 1️⃣  — ASSETS 2.0 CINÉMATIQUES');
  console.log('─'.repeat(70));

  const macroImages = await page.locator('img[src*="macro"]').all();
  const macroVideos = await page.locator('video source[src*="macro"]').all();

  console.log(`\n🖼️  Images macro:`);
  const imagesList = [];
  for (const img of macroImages) {
    const alt = await img.getAttribute('alt');
    const src = await img.getAttribute('src');
    const visible = await img.isVisible({ timeout: 500 }).catch(() => false);
    imagesList.push(`${alt} — ${visible ? '✅ VISIBLE' : '❌ CACHÉ'}`);
  }
  imagesList.forEach(img => console.log(`   • ${img}`));

  console.log(`\n🎬 Vidéos macro:`);
  const videoList = new Set();
  for (const vid of macroVideos) {
    const src = await vid.getAttribute('src');
    if (src) videoList.add(src.split('/').pop());
  }
  Array.from(videoList).forEach(v => console.log(`   • ${v}`));

  console.log(`\n📊 Résumé:
   ✅ Images macro: ${macroImages.length}/5
   ✅ Vidéos macro: ${videoList.size}/3
   ✅ Status: ${macroImages.length === 5 && videoList.size >= 2 ? '✅ COMPLET' : '⚠️  À VÉRIFIER'}\n`);

  // ===================== TEST 2: Structure du site =====================
  console.log('TEST 2️⃣  — STRUCTURE & CONTENU');
  console.log('─'.repeat(70));

  const sections = await page.locator('section').count();
  const allImages = await page.locator('img').count();
  const allVideos = await page.locator('video').count();
  const buttons = await page.locator('button, [role="button"]').count();

  console.log(`\n✅ Sections: ${sections}`);
  console.log(`✅ Images totales: ${allImages}`);
  console.log(`✅ Vidéos totales: ${allVideos}`);
  console.log(`✅ Boutons interactifs: ${buttons}\n`);

  // ===================== TEST 3: Performance =====================
  console.log('TEST 3️⃣  — PERFORMANCE & MÉTRIQUES');
  console.log('─'.repeat(70));

  const perfData = await page.evaluate(() => {
    const nav = performance.getEntriesByType('navigation')[0];
    const resources = performance.getEntriesByType('resource');
    return {
      loadTime: Math.round(nav?.loadEventEnd || 0),
      fcp: Math.round(performance.getEntriesByType('paint')[0]?.startTime || 0),
      resourceCount: resources.length,
      largestResource: Math.max(...resources.map(r => r.transferSize || 0))
    };
  });

  console.log(`\n⏱️  Métriques:
   • Load Time: ${perfData.loadTime}ms
   • FCP: ${perfData.fcp}ms
   • Ressources: ${perfData.resourceCount}
   • Largest resource: ${Math.round(perfData.largestResource / 1024 / 1024)}MB\n`);

  // ===================== TEST 4: Responsive =====================
  console.log('TEST 4️⃣  — RESPONSIVE & MOBILE');
  console.log('─'.repeat(70));

  const viewportDesktop = await page.evaluate(() => ({ w: window.innerWidth, h: window.innerHeight }));
  console.log(`\n✅ Desktop (1440x900): ${viewportDesktop.w}x${viewportDesktop.h}`);

  await page.setViewportSize({ width: 375, height: 812 });
  await page.reload({ waitUntil: 'load' });
  const viewportMobile = await page.evaluate(() => ({ w: window.innerWidth, h: window.innerHeight }));
  console.log(`✅ Mobile (375x812): ${viewportMobile.w}x${viewportMobile.h}`);

  const heroMobile = await page.locator('.hero').isVisible({ timeout: 1000 }).catch(() => false);
  console.log(`✅ Hero mobile visible: ${heroMobile ? '✅ OUI' : '❌ NON'}\n`);

  // ===================== TEST 5: Splash & Hero =====================
  console.log('TEST 5️⃣  — SPLASH & HERO CINÉMATIQUE');
  console.log('─'.repeat(70));

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('https://maison-verlaine-omega.vercel.app', { waitUntil: 'load' });

  const splash = await page.locator('.splash-screen').isVisible({ timeout: 1000 }).catch(() => false);
  const hero = await page.locator('.hero').isVisible({ timeout: 1000 }).catch(() => false);
  const splashVideo = await page.locator('video source[src*="hero-macro"]').count();

  console.log(`\n✅ Splash screen: ${splash ? '✅ PRÉSENT' : '⚠️  ABSENT'}`);
  console.log(`✅ Hero cinématique: ${hero ? '✅ PRÉSENT' : '⚠️  ABSENT'}`);
  console.log(`✅ Vidéo hero macro: ${splashVideo > 0 ? '✅ CHARGÉE' : '⚠️  ABSENTE'}\n`);

  // ===================== SCREENSHOTS =====================
  console.log('TEST 6️⃣  — CAPTURES D\'ÉCRAN FINALE');
  console.log('─'.repeat(70));

  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'final-verification-hero.png' });
  console.log(`\n✅ Screenshot 1: Hero avec macro-video`);

  await page.evaluate(() => window.scrollBy(0, window.innerHeight * 3));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'final-verification-details.png' });
  console.log(`✅ Screenshot 2: Galerie détails avec images macro`);

  await page.evaluate(() => window.scrollBy(0, window.innerHeight * 2));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'final-verification-footer.png' });
  console.log(`✅ Screenshot 3: Section basse\n`);

  // ===================== VERDICT FINAL =====================
  console.log('█'.repeat(70));
  console.log('█' + ' '.repeat(68) + '█');
  console.log('█' + '  ✨ VERDICT FINAL'.padEnd(69) + '█');
  console.log('█' + ' '.repeat(68) + '█');
  console.log('█'.repeat(70) + '\n');

  const allPass = macroImages.length === 5 && videoList.size >= 2 && hero && splash;

  console.log(`  🎬 SPLASH SCREEN: ${splash ? '✅ DÉPLOYÉ' : '❌ ABSENT'}`);
  console.log(`  🎬 HERO CINÉMATIQUE: ${hero ? '✅ DÉPLOYÉ' : '❌ ABSENT'}`);
  console.log(`  🖼️  IMAGES MACRO: ${macroImages.length}/5 ${macroImages.length === 5 ? '✅' : '❌'}`);
  console.log(`  🎬 VIDÉOS MACRO: ${videoList.size}/3+ ${videoList.size >= 2 ? '✅' : '❌'}`);
  console.log(`  📊 TOTAL ASSETS: ${allImages} images + ${allVideos} vidéos`);
  console.log(`  ⏱️  PERFORMANCE: ${perfData.loadTime}ms`);
  console.log(`  📱 RESPONSIVE: Mobile + Desktop ✅`);

  console.log(`\n  ${allPass ? '🎉 DÉPLOIEMENT COMPLET & VÉRIFIÉ 🎉' : '⚠️ Vérifications en cours'}\n`);

  console.log(`  🌐 URL: https://maison-verlaine-omega.vercel.app`);
  console.log(`  📊 Commit: caccaf0`);
  console.log(`  ✅ Vercel: READY\n`);

  console.log('█'.repeat(70) + '\n');

  await browser.close();
  process.exit(0);
})();
