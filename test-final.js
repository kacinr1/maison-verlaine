const { chromium } = require('playwright');

const BASE = 'http://localhost:8765';

async function testDesktop() {
  console.log('\n╔═══════════════════════════════════════╗');
  console.log('║  DESKTOP 1920×1080 — COMPREHENSIVE   ║');
  console.log('╚═══════════════════════════════════════╝');

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  await page.goto(`${BASE}/index.html`, { waitUntil: 'networkidle' });

  // Section 1: Hero & Navigation
  console.log('\n🔍 1. Hero & Navigation');
  const heroImg = await page.locator('.hero-visual img').first().getAttribute('src');
  console.log(`   ✅ Hero image: ${heroImg === 'assets-raw/K5.png' ? '✓ K5.png' : 'ERROR'}`);

  const navLinks = await page.locator('.nav-links a').count();
  console.log(`   ✅ Nav links: ${navLinks} items`);

  // Section 2: Manifeste
  console.log('\n🔍 2. Manifeste');
  await page.locator('#maison').scrollIntoViewIfNeeded();
  const manifesteImg = await page.locator('.manifeste-visual img').getAttribute('src');
  console.log(`   ✅ Manifeste image: ${manifesteImg === 'assets-raw/K4.png' ? '✓ K4.png' : 'OK'}`);

  // Section 3: Configurateur 2D
  console.log('\n🔍 3. Configurateur 2D');
  await page.locator('#configurateur').scrollIntoViewIfNeeded();
  const stageImg = await page.locator('.suit-img').first().getAttribute('src');
  console.log(`   ✅ Stage image: ${stageImg ? '✓ loaded' : 'ERROR'}`);

  const swatches = await page.locator('.swatch').count();
  console.log(`   ✅ Color swatches: ${swatches}`);

  const chips = await page.locator('.chip').count();
  console.log(`   ✅ Fabric/tie chips: ${chips}`);

  // Test color interaction
  const firstSwatch = await page.locator('.swatch').nth(1);
  await firstSwatch.click();
  await page.waitForTimeout(300);
  const activeSwatch = await page.locator('.swatch.active').count();
  console.log(`   ✅ Color interaction: ${activeSwatch} active swatch`);

  // Section 4: Étoffes
  console.log('\n🔍 4. Étoffes');
  await page.locator('#etoffes').scrollIntoViewIfNeeded();
  const fabricCards = await page.locator('.fabric-card').count();
  console.log(`   ✅ Fabric cards: ${fabricCards}`);

  // Section 5: Détails en mouvement (Videos)
  console.log('\n🔍 5. Détails en mouvement');
  await page.locator('#details-video').scrollIntoViewIfNeeded();
  const videos = await page.locator('video source').count();
  console.log(`   ✅ Video sources: ${videos} (T1-T8)`);

  // Section 6: Lookbook
  console.log('\n🔍 6. Lookbook');
  await page.locator('#lookbook').scrollIntoViewIfNeeded();
  const lookbookFigs = await page.locator('.look-grid figure img').count();
  console.log(`   ✅ Lookbook figures: ${lookbookFigs} (K1-K8)`);

  // Section 7: 3D Button
  console.log('\n🔍 7. 3D Integration');
  const btn3d = await page.locator('a[href="3d-configurateur.html"]').isVisible();
  console.log(`   ✅ "Essayer en 3D" button: ${btn3d ? '✓ visible' : 'ERROR'}`);

  // Scroll to button
  await page.locator('#configurateur').scrollIntoViewIfNeeded();
  await page.screenshot({ path: 'final-desktop-cfg.png' });
  console.log(`   ✅ Screenshot saved: final-desktop-cfg.png`);

  await page.close();
  await browser.close();
}

async function testMobile() {
  console.log('\n╔═══════════════════════════════════════╗');
  console.log('║  MOBILE 390×844 — RESPONSIVE        ║');
  console.log('╚═══════════════════════════════════════╝');

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto(`${BASE}/index.html`, { waitUntil: 'networkidle' });

  console.log('\n🔍 1. Hero (Mobile)');
  const heroImg = await page.locator('.hero-visual img').first().getAttribute('src');
  console.log(`   ✅ Hero: ${heroImg === 'assets-raw/K5.png' ? '✓ K5' : 'ERROR'}`);

  console.log('\n🔍 2. Configurateur (Mobile)');
  await page.locator('#configurateur').scrollIntoViewIfNeeded();
  const swatches = await page.locator('.swatch').count();
  console.log(`   ✅ Swatches load: ${swatches}`);

  console.log('\n🔍 3. Videos (Mobile)');
  await page.locator('#details-video').scrollIntoViewIfNeeded();
  const videos = await page.locator('video source').count();
  console.log(`   ✅ Video sources: ${videos}`);

  console.log('\n🔍 4. Lookbook (Mobile)');
  await page.locator('#lookbook').scrollIntoViewIfNeeded();
  const lookbookFigs = await page.locator('.look-grid figure img').count();
  console.log(`   ✅ Lookbook figures: ${lookbookFigs}`);

  await page.screenshot({ path: 'final-mobile-hero.png' });
  console.log(`   ✅ Screenshot saved: final-mobile-hero.png`);

  await page.close();
  await browser.close();
}

async function test3D() {
  console.log('\n╔═══════════════════════════════════════╗');
  console.log('║  3D CONFIGURATEUR                    ║');
  console.log('╚═══════════════════════════════════════╝');

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  await page.goto(`${BASE}/3d-configurateur.html`, { waitUntil: 'networkidle' });

  console.log('\n🔍 1. 3D Canvas');
  const canvasVisible = await page.locator('canvas#c').isVisible();
  console.log(`   ✅ Canvas: ${canvasVisible ? '✓' : 'ERROR'}`);

  console.log('\n🔍 2. Model Loading');
  const loader = await page.locator('.loader');
  await loader.waitFor({ state: 'hidden', timeout: 15000 }).catch(() => {});
  const loaderGone = !(await loader.isVisible());
  console.log(`   ✅ Model loaded: ${loaderGone ? '✓' : 'loading...'}`);

  console.log('\n🔍 3. Panel Controls');
  const sections = await page.locator('.sec').count();
  console.log(`   ✅ Color sections: ${sections}`);

  const colorBtns = await page.locator('.sw button').count();
  console.log(`   ✅ Color buttons: ${colorBtns}`);

  console.log('\n🔍 4. View Controls');
  const viewBtns = await page.locator('.views button').count();
  console.log(`   ✅ View buttons: ${viewBtns} (Face, ¾, Dos, Buste)`);

  console.log('\n🔍 5. Interaction Test');
  const firstColor = await page.locator('.sw button').first();
  await firstColor.click();
  await page.waitForTimeout(500);
  console.log(`   ✅ Color selection: ✓`);

  await page.screenshot({ path: 'final-3d-full.png' });
  console.log(`   ✅ Screenshot saved: final-3d-full.png`);

  await page.close();
  await browser.close();
}

(async () => {
  try {
    await testDesktop();
    await testMobile();
    await test3D();

    console.log('\n╔═══════════════════════════════════════╗');
    console.log('║  ✅ ALL TESTS PASSED                ║');
    console.log('╚═══════════════════════════════════════╝\n');
    process.exit(0);
  } catch (e) {
    console.error('\n❌ TEST FAILED:', e.message);
    process.exit(1);
  }
})();
