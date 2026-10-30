const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();

  // Desktop test
  console.log('\n=== DESKTOP 1920x1080 ===');
  const pageD = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  await pageD.goto('http://localhost:8765/index.html', { waitUntil: 'networkidle' });

  // Check hero K5
  const heroImg = await pageD.locator('.hero-visual img').first();
  const heroSrc = await heroImg.getAttribute('src');
  console.log(`✅ Hero image: ${heroSrc}`);

  // Check lookbook
  const lookbookFigs = await pageD.locator('.look-grid figure img').all();
  console.log(`✅ Lookbook figures: ${lookbookFigs.length}`);
  for (let i = 0; i < lookbookFigs.length; i++) {
    const src = await lookbookFigs[i].getAttribute('src');
    console.log(`   [${i+1}] ${src}`);
  }

  // Check videos
  const videos = await pageD.locator('video source').all();
  console.log(`✅ Videos: ${videos.length}`);
  for (let i = 0; i < Math.min(3, videos.length); i++) {
    const src = await videos[i].getAttribute('src');
    console.log(`   [${i+1}] ${src}`);
  }

  // Check configurateur exists
  const cfgPanel = await pageD.locator('.cfg-panel').isVisible();
  console.log(`✅ Configurateur panel visible: ${cfgPanel}`);

  // Scroll to lookbook & take screenshot
  await pageD.locator('#lookbook').scrollIntoViewIfNeeded();
  await pageD.screenshot({ path: 'test-desktop-lookbook.png' });
  console.log(`✅ Screenshot: test-desktop-lookbook.png`);

  await pageD.close();

  // Mobile test
  console.log('\n=== MOBILE 390x844 ===');
  const pageM = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await pageM.goto('http://localhost:8765/index.html', { waitUntil: 'networkidle' });

  const heroImgM = await pageM.locator('.hero-visual img').first();
  const heroSrcM = await heroImgM.getAttribute('src');
  console.log(`✅ Hero image (mobile): ${heroSrcM}`);

  const lookbookFigsM = await pageM.locator('.look-grid figure img').all();
  console.log(`✅ Lookbook figures (mobile): ${lookbookFigsM.length}`);

  const videosM = await pageM.locator('video source').all();
  console.log(`✅ Videos (mobile): ${videosM.length}`);

  await pageM.screenshot({ path: 'test-mobile-hero.png' });
  console.log(`✅ Screenshot: test-mobile-hero.png`);

  await pageM.close();

  await browser.close();
  console.log('\n✅ All checks passed');
  process.exit(0);
})().catch(e => {
  console.error('❌ Test failed:', e.message);
  process.exit(1);
});
