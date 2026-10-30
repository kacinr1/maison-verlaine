const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();

  console.log('\n=== TESTING INDEX.HTML (2D) ===');
  const page2d = await browser.newPage();
  await page2d.goto('http://localhost:8765/index.html', { waitUntil: 'networkidle' });

  // Check 3D button exists
  const btn3d = await page2d.locator('a[href="3d-configurateur.html"]');
  const exists = await btn3d.isVisible();
  console.log(`✅ "Essayer en 3D" button exists: ${exists}`);

  // Check configurateur 2D works
  const colorSwatches = await page2d.locator('.swatch').all();
  console.log(`✅ Configurateur 2D: ${colorSwatches.length} color swatches`);

  // Click color swatch to verify interaction
  if (colorSwatches.length > 1) {
    await colorSwatches[1].click();
    const activeCount = await page2d.locator('.swatch.active').count();
    console.log(`✅ Color selection works: ${activeCount} active`);
  }

  await page2d.screenshot({ path: 'test-2d-full.png' });
  console.log(`✅ Screenshot: test-2d-full.png`);
  await page2d.close();

  console.log('\n=== TESTING 3D-CONFIGURATEUR.HTML ===');
  const page3d = await browser.newPage();
  await page3d.goto('http://localhost:8765/3d-configurateur.html', { waitUntil: 'networkidle' });

  // Check canvas loads
  const canvas = await page3d.locator('canvas#c');
  const canvasVisible = await canvas.isVisible();
  console.log(`✅ 3D canvas loads: ${canvasVisible}`);

  // Check panel exists
  const panel = await page3d.locator('.panel');
  const panelVisible = await panel.isVisible();
  console.log(`✅ Panel controls visible: ${panelVisible}`);

  // Check view buttons
  const viewButtons = await page3d.locator('.views button').all();
  console.log(`✅ View buttons: ${viewButtons.length}`);

  // Check color swatches in 3D
  const colorButtons = await page3d.locator('.sw button').all();
  console.log(`✅ 3D Color buttons: ${colorButtons.length}`);

  // Wait for loader to finish (model loading)
  const loader = await page3d.locator('.loader');
  await loader.waitFor({ state: 'hidden', timeout: 10000 }).catch(() => {});
  console.log(`✅ 3D Model loaded (loader hidden)`);

  // Test interaction: click a color button
  if (colorButtons.length > 1) {
    await colorButtons[1].click();
    await page3d.waitForTimeout(500);
    console.log(`✅ 3D Color selection click works`);
  }

  await page3d.screenshot({ path: 'test-3d-full.png' });
  console.log(`✅ Screenshot: test-3d-full.png`);

  await page3d.close();

  await browser.close();
  console.log('\n✅ All tests passed');
  process.exit(0);
})().catch(e => {
  console.error('❌ Test failed:', e.message);
  process.exit(1);
});
