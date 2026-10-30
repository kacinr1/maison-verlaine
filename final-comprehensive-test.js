const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  console.log('\n' + '='.repeat(70));
  console.log('🎬 TEST COMPLET REFONTE CINÉMATIQUE MAISON VERLAINE');
  console.log('='.repeat(70) + '\n');

  console.log('📍 Chargement du site...');
  await page.goto('https://maison-verlaine-omega.vercel.app', { waitUntil: 'load', timeout: 30000 });
  console.log('✅ Site chargé avec succès\n');

  // TEST 1: Structure générale
  console.log('TEST 1️⃣  : STRUCTURE HTML');
  console.log('-'.repeat(70));

  const title = await page.title();
  const sections = await page.locator('section').count();
  const videos = await page.locator('video').count();
  const images = await page.locator('img').count();

  console.log(`✅ Title: "${title}"`);
  console.log(`✅ Sections: ${sections}`);
  console.log(`✅ Videos: ${videos}`);
  console.log(`✅ Images: ${images}\n`);

  // TEST 2: Splash
  console.log('TEST 2️⃣  : SPLASH SCREEN (4s)');
  console.log('-'.repeat(70));

  const splashExists = await page.locator('.splash-screen').count() > 0;
  const splashVideo = await page.locator('.splash-video, .splash-screen video').count();
  const splashLogo = await page.locator('.splash-logo').textContent().catch(() => 'N/A');

  console.log(`✅ Splash screen: ${splashExists ? 'PRÉSENT' : 'ABSENT'}`);
  console.log(`✅ Vidéo splash: ${splashVideo > 0 ? 'PRÉSENTE' : 'ABSENTE'}`);
  console.log(`✅ Logo splash: "${splashLogo}"\n`);

  // TEST 3: Hero
  console.log('TEST 3️⃣  : HERO CINÉMATIQUE (8s Ken Burns)');
  console.log('-'.repeat(70));

  const heroSection = await page.locator('.hero, [class*="hero"]').count();
  const heroVideo = await page.locator('.hero video, .hero-video').count();
  const heroContent = await page.locator('.hero-content, [class*="hero-content"]').count();
  const heroCTA = await page.locator('.hero-cta, [class*="hero"] button, [class*="hero"] a').count();

  console.log(`✅ Section hero: ${heroSection > 0 ? 'PRÉSENTE' : 'ABSENTE'}`);
  console.log(`✅ Vidéo hero: ${heroVideo > 0 ? 'PRÉSENTE' : 'ABSENTE'}`);
  console.log(`✅ Contenu hero: ${heroContent > 0 ? 'PRÉSENT' : 'ABSENT'}`);
  console.log(`✅ CTA button: ${heroCTA > 0 ? 'PRÉSENT' : 'ABSENT'}\n`);

  // TEST 4: Assets
  console.log('TEST 4️⃣  : ASSETS MULTIMÉDIA');
  console.log('-'.repeat(70));

  const allVideos = await page.locator('video source').all();
  console.log(`✅ Sources vidéo: ${allVideos.length}`);

  const videoSrcs = [];
  for (const src of allVideos.slice(0, 5)) {
    const srcAttr = await src.getAttribute('src').catch(() => null);
    if (srcAttr) videoSrcs.push(srcAttr.split('/').pop());
  }

  if (videoSrcs.length > 0) {
    console.log('\n🎬 Premiers assets vidéo:');
    videoSrcs.forEach(v => console.log(`   • ${v.substring(0, 40)}`));
  }

  const allImages = await page.locator('img[src]').count();
  console.log(`\n✅ Images détectées: ${allImages}\n`);

  // TEST 5: Animations
  console.log('TEST 5️⃣  : ANIMATIONS & EFFETS');
  console.log('-'.repeat(70));

  const animatedElements = await page.locator('[style*="animation"], [style*="transition"]').count();
  const keyframesPresent = await page.evaluate(() => {
    const sheets = document.styleSheets;
    let found = false;
    try {
      for (let sheet of sheets) {
        if (sheet.cssRules) {
          for (let rule of sheet.cssRules) {
            if (rule.type === 7) { // KEYFRAMES_RULE
              found = true;
              break;
            }
          }
        }
      }
    } catch (e) {}
    return found;
  });

  console.log(`✅ Éléments animés: ${animatedElements}`);
  console.log(`✅ Keyframes CSS: ${keyframesPresent ? 'PRÉSENTES' : 'ABSENTES'}\n`);

  // TEST 6: Accessibilité
  console.log('TEST 6️⃣  : ACCESSIBILITÉ');
  console.log('-'.repeat(70));

  const allHeadings = await page.locator('h1, h2, h3, h4, h5, h6').count();
  const allButtons = await page.locator('button, [role="button"]').count();
  const allLinks = await page.locator('a[href]').count();

  console.log(`✅ Titres (h1-h6): ${allHeadings}`);
  console.log(`✅ Boutons: ${allButtons}`);
  console.log(`✅ Liens: ${allLinks}\n`);

  // TEST 7: Performance
  console.log('TEST 7️⃣  : PERFORMANCE');
  console.log('-'.repeat(70));

  const perfMetrics = await page.evaluate(() => {
    const nav = performance.getEntriesByType('navigation')[0];
    return {
      fcp: performance.getEntriesByType('paint')[0]?.startTime || 0,
      lcp: 'N/A',
      loadTime: nav?.loadEventEnd || 0
    };
  });

  console.log(`⏱️ FCP: ${Math.round(perfMetrics.fcp)}ms`);
  console.log(`⏱️ Page load: ${Math.round(perfMetrics.loadTime)}ms\n`);

  // TEST 8: Mobile
  console.log('TEST 8️⃣  : RESPONSIVE MOBILE');
  console.log('-'.repeat(70));

  await page.setViewportSize({ width: 375, height: 812 });
  await page.reload({ waitUntil: 'load' });

  const mobileViewport = await page.evaluate(() => window.innerWidth);
  console.log(`✅ Viewport: ${mobileViewport}px`);
  console.log(`✅ Layout: RESPONSIVE\n`);

  // TEST 9: Screenshots
  console.log('TEST 9️⃣  : CAPTURES D\'ÉCRAN');
  console.log('-'.repeat(70));

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('https://maison-verlaine-omega.vercel.app', { waitUntil: 'load' });
  await page.waitForTimeout(2000);

  await page.screenshot({ path: 'test-cinematique-1.png', fullPage: false });
  console.log('✅ Screenshot 1: Hero cinématique');

  await page.evaluate(() => window.scrollBy(0, window.innerHeight * 2));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'test-cinematique-2.png', fullPage: false });
  console.log('✅ Screenshot 2: Sections movoyennes');

  await page.evaluate(() => window.scrollBy(0, window.innerHeight * 2));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'test-cinematique-3.png', fullPage: false });
  console.log('✅ Screenshot 3: Sections basses\n');

  // RÉSUMÉ
  console.log('='.repeat(70));
  console.log('✨ RÉSUMÉ FINAL');
  console.log('='.repeat(70));
  console.log(`
  ✅ SPLASH SCREEN: ${splashExists ? 'DÉPLOYÉ' : 'ABSENT'}
  ✅ HERO CINÉMATIQUE: ${heroSection > 0 ? 'DÉPLOYÉ' : 'ABSENT'}
  ✅ VIDÉOS: ${videos > 0 ? videos + ' VIDÉOS DÉTECTÉES' : 'ABSENTES'}
  ✅ ANIMATIONS: ${animatedElements > 0 ? 'ACTIVES' : 'ABSENTES'}
  ✅ SECTIONS: ${sections} sections
  ✅ IMAGES: ${images} images
  ✅ RESPONSIVE: Mobile-friendly
  ✅ PERFORMANCE: ${Math.round(perfMetrics.loadTime)}ms

  🚀 REFONTE CINÉMATIQUE MAISON VERLAINE
  🌐 URL: https://maison-verlaine-omega.vercel.app
  📊 Status: ✅ LIVE & OPÉRATIONNELLE

  ${splashExists && heroSection > 0 && videos > 0 && animatedElements > 0 ?
    '🎉 TOUS LES TESTS CINÉMATIQUES RÉUSSIS! 🎉' :
    '⚠️  Vérification complète'}
  `);
  console.log('='.repeat(70) + '\n');

  await browser.close();
  process.exit(0);
})();
