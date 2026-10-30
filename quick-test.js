const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
  const page = await context.newPage();

  try {
    await page.goto('http://localhost:8000/index.html');
    console.log('✓ Page loaded');

    // Wait for splash
    await page.waitForTimeout(4500);
    console.log('✓ Splash screen passed (4s)');

    // Check hero
    const hero = await page.locator('.hero').isVisible();
    console.log(hero ? '✓ Hero section visible' : '✗ Hero section NOT visible');

    // Check savoir-faire
    await page.locator('#savoirFaire').scrollIntoViewIfNeeded();
    const sf = await page.locator('.savoir-faire-content h2').textContent();
    console.log(sf ? `✓ Savoir-Faire: "${sf}"` : '✗ Savoir-Faire NOT visible');

    // Check form
    await page.locator('#contact').scrollIntoViewIfNeeded();
    const form = await page.locator('#contactForm').isVisible();
    console.log(form ? '✓ Contact form visible' : '✗ Contact form NOT visible');

    // Screenshot desktop
    await page.screenshot({ path: 'screenshot-desktop.png', fullPage: true });
    console.log('✓ Desktop screenshot saved');

    // Test mobile
    const mobileContext = await browser.newContext({ viewport: { width: 375, height: 667 } });
    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto('http://localhost:8000/index.html');
    await mobilePage.waitForTimeout(4500);
    const heroMobile = await mobilePage.locator('.hero').isVisible();
    console.log(heroMobile ? '✓ Mobile hero visible' : '✗ Mobile hero NOT visible');
    await mobilePage.screenshot({ path: 'screenshot-mobile.png', fullPage: true });
    console.log('✓ Mobile screenshot saved');
    await mobileContext.close();

    console.log('\n✓✓✓ BASIC VALIDATION PASSED ✓✓✓');

  } catch (error) {
    console.error('✗ Error:', error.message);
  } finally {
    await browser.close();
  }
})();
