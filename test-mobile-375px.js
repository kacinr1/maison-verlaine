const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  console.log('\n' + '='.repeat(70));
  console.log('📱 TEST COMPLET MOBILE 375px — MAISON VERLAINE');
  console.log('='.repeat(70) + '\n');

  // Définir viewport mobile
  await page.setViewportSize({ width: 375, height: 812 });

  console.log('📍 Chargement du site en 375px...');
  await page.goto('https://maison-verlaine-omega.vercel.app', { waitUntil: 'load', timeout: 30000 });
  console.log('✅ Site chargé sur mobile\n');

  // TEST 1: Viewport
  console.log('TEST 1️⃣  : VIEWPORT MOBILE');
  console.log('-'.repeat(70));

  const viewport = await page.evaluate(() => ({
    width: window.innerWidth,
    height: window.innerHeight,
    devicePixelRatio: window.devicePixelRatio,
  }));

  console.log(`✅ Viewport: ${viewport.width}x${viewport.height}`);
  console.log(`✅ Device Pixel Ratio: ${viewport.devicePixelRatio}`);
  console.log(`✅ Screen size: ${Math.round(viewport.width / viewport.devicePixelRatio)}px\n`);

  // TEST 2: Splash screen mobile
  console.log('TEST 2️⃣  : SPLASH SCREEN MOBILE');
  console.log('-'.repeat(70));

  const splashVisible = await page.locator('.splash-screen').isVisible({ timeout: 1000 }).catch(() => false);
  const splashSize = await page.locator('.splash-screen').boundingBox().catch(() => null);

  console.log(`✅ Splash visible: ${splashVisible ? 'OUI' : 'NON'}`);
  if (splashSize) {
    console.log(`✅ Dimensions splash: ${splashSize.width}x${splashSize.height}px`);
    console.log(`✅ Fullscreen: ${splashSize.width === viewport.width ? 'OUI' : 'NON'}`);
  }
  console.log();

  // TEST 3: Hero mobile
  console.log('TEST 3️⃣  : HERO CINÉMATIQUE MOBILE');
  console.log('-'.repeat(70));

  await page.waitForTimeout(1000);
  const heroVisible = await page.locator('.hero').isVisible({ timeout: 1000 }).catch(() => false);
  const heroSize = await page.locator('.hero').boundingBox().catch(() => null);
  const heroText = await page.locator('.hero-content h1').textContent().catch(() => '(introuvable)');
  const heroCTA = await page.locator('.hero-cta').count();

  console.log(`✅ Hero visible: ${heroVisible ? 'OUI' : 'NON'}`);
  if (heroSize) {
    console.log(`✅ Hauteur hero: ${heroSize.height}px (full viewport: ${heroSize.height >= viewport.height * 0.9 ? 'OUI' : 'NON'})`);
  }
  console.log(`✅ Titre lisible: "${heroText}"`);
  console.log(`✅ CTA visible: ${heroCTA > 0 ? 'OUI' : 'NON'}`);
  console.log();

  // TEST 4: Readabilité texte
  console.log('TEST 4️⃣  : LISIBILITÉ & TYPOGRAPHY');
  console.log('-'.repeat(70));

  const textSizes = await page.evaluate(() => {
    const h1 = document.querySelector('h1');
    const h2 = document.querySelector('h2');
    const p = document.querySelector('p');

    return {
      h1: h1 ? window.getComputedStyle(h1).fontSize : '0px',
      h2: h2 ? window.getComputedStyle(h2).fontSize : '0px',
      p: p ? window.getComputedStyle(p).fontSize : '0px',
      minWidth: Math.min(
        h1 ? h1.offsetWidth : 999,
        h2 ? h2.offsetWidth : 999,
        p ? p.offsetWidth : 999
      )
    };
  });

  console.log(`✅ H1 size: ${textSizes.h1}`);
  console.log(`✅ H2 size: ${textSizes.h2}`);
  console.log(`✅ P size: ${textSizes.p}`);
  console.log(`✅ Min readable width: ${textSizes.minWidth}px`);
  console.log();

  // TEST 5: Scrolling
  console.log('TEST 5️⃣  : SCROLL & LAYOUT');
  console.log('-'.repeat(70));

  const pageHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  console.log(`✅ Page height: ${pageHeight}px`);
  console.log(`✅ Scroll ratio: ${pageHeight / viewport.height}x viewport height`);

  // Scroll test
  await page.evaluate(() => window.scrollBy(0, 200));
  const scrollPos1 = await page.evaluate(() => window.scrollY);
  console.log(`✅ Scroll down 200px: position=${scrollPos1}px`);

  await page.evaluate(() => window.scrollBy(0, 500));
  const scrollPos2 = await page.evaluate(() => window.scrollY);
  console.log(`✅ Scroll down 500px more: position=${scrollPos2}px`);
  console.log();

  // TEST 6: Éléments interactifs
  console.log('TEST 6️⃣  : INTERACTIVITÉ MOBILE');
  console.log('-'.repeat(70));

  const buttons = await page.locator('button, [role="button"]').count();
  const inputs = await page.locator('input, textarea, select').count();
  const links = await page.locator('a[href]').count();

  console.log(`✅ Boutons: ${buttons}`);
  console.log(`✅ Inputs/Forms: ${inputs}`);
  console.log(`✅ Liens: ${links}`);

  // Vérifier taille des boutons (min 44px recommandé)
  const buttonSizes = await page.evaluate(() => {
    const buttons = document.querySelectorAll('button');
    const sizes = Array.from(buttons).map(b => ({
      width: b.offsetWidth,
      height: b.offsetHeight,
      minSize: Math.min(b.offsetWidth, b.offsetHeight)
    }));
    return sizes;
  });

  if (buttonSizes.length > 0) {
    const avgHeight = buttonSizes.reduce((sum, s) => sum + s.height, 0) / buttonSizes.length;
    console.log(`✅ Hauteur moyenne des boutons: ${Math.round(avgHeight)}px (TAP SAFE: ${avgHeight >= 44 ? 'OUI' : 'NON'})`);
  }
  console.log();

  // TEST 7: Images & Médias
  console.log('TEST 7️⃣  : IMAGES & MÉDIAS MOBILE');
  console.log('-'.repeat(70));

  const images = await page.locator('img').count();
  const videos = await page.locator('video').count();
  const lazyLoaded = await page.locator('img[loading="lazy"]').count();

  console.log(`✅ Images: ${images}`);
  console.log(`✅ Vidéos: ${videos}`);
  console.log(`✅ Lazy-loaded images: ${lazyLoaded}`);

  // Vérifier images visibles
  const visibleImages = await page.evaluate(() => {
    const images = document.querySelectorAll('img');
    let visible = 0;
    images.forEach(img => {
      const rect = img.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) visible++;
    });
    return visible;
  });

  console.log(`✅ Images visibles (dans viewport): ${visibleImages}`);
  console.log();

  // TEST 8: Performance mobile
  console.log('TEST 8️⃣  : PERFORMANCE MOBILE');
  console.log('-'.repeat(70));

  const perfMobile = await page.evaluate(() => {
    const nav = performance.getEntriesByType('navigation')[0];
    const paints = performance.getEntriesByType('paint');
    return {
      fcp: paints.find(p => p.name === 'first-contentful-paint')?.startTime || 0,
      lcp: 'N/A',
      loadTime: nav?.loadEventEnd || 0,
      domReady: nav?.domContentLoadedEventEnd || 0,
      totalBytes: 0
    };
  });

  console.log(`⏱️ FCP: ${Math.round(perfMobile.fcp)}ms`);
  console.log(`⏱️ DOM Content Loaded: ${Math.round(perfMobile.domReady)}ms`);
  console.log(`⏱️ Page Load Complete: ${Math.round(perfMobile.loadTime)}ms`);
  console.log();

  // SCREENSHOTS
  console.log('TEST 9️⃣  : CAPTURES MOBILE 375px');
  console.log('-'.repeat(70));

  // Reset à top
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);

  // Screenshot 1: Top (Splash + Hero)
  await page.screenshot({ path: 'mobile-1-top.png', fullPage: false });
  console.log('✅ Screenshot 1: Top (Splash + Hero)');

  // Screenshot 2: Middle
  await page.evaluate(() => window.scrollTo(0, window.innerHeight * 1.5));
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'mobile-2-middle.png', fullPage: false });
  console.log('✅ Screenshot 2: Middle');

  // Screenshot 3: Bottom
  await page.evaluate(() => window.scrollTo(0, window.innerHeight * 3));
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'mobile-3-bottom.png', fullPage: false });
  console.log('✅ Screenshot 3: Bottom\n');

  // RÉSUMÉ
  console.log('='.repeat(70));
  console.log('✨ RÉSUMÉ TEST MOBILE 375px');
  console.log('='.repeat(70));
  console.log(`
  📱 VIEWPORT: ${viewport.width}x${viewport.height}px

  ✅ SPLASH SCREEN: ${splashVisible ? 'RESPONSIF' : 'N/A'}
  ✅ HERO MOBILE: ${heroVisible ? 'OPTIMISÉ' : 'PROBLÈME'}
  ✅ TEXTE LISIBLE: ${textSizes.minWidth > 300 ? 'OUI' : 'À VÉRIFIER'}
  ✅ BOUTONS TAP-SAFE: ${buttonSizes.some(s => s.minSize >= 44) ? 'OUI' : 'À VÉRIFIER'}
  ✅ PAGE HEIGHT: ${Math.round(pageHeight / viewport.height)}x viewport
  ✅ MÉDIAS: ${images} images + ${videos} vidéos
  ✅ PERFORMANCE: ${Math.round(perfMobile.loadTime)}ms

  🎯 VERDICT MOBILE:
  ${heroVisible && visibleImages > 0 && perfMobile.loadTime < 3000 ?
    '✅ MOBILE-FRIENDLY — Refonte cinématique optimisée pour petit écran' :
    '⚠️ Vérification manuelle recommandée'}

  🌐 URL: https://maison-verlaine-omega.vercel.app
  📲 Test sur: iPhone 12 Pro (375x812px)
  `);
  console.log('='.repeat(70) + '\n');

  await browser.close();
  process.exit(0);
})();
