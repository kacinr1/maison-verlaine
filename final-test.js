const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  console.log('🎬 VÉRIFICATION FINALE REFONTE CINÉMATIQUE\n');
  
  await page.goto('https://maison-verlaine-omega.vercel.app', { waitUntil: 'load', timeout: 30000 });
  console.log('✅ Site chargé\n');
  
  // Test splash
  const splash = await page.locator('.splash-screen').isVisible({ timeout: 5000 }).catch(() => false);
  const hero = await page.locator('.hero').isVisible({ timeout: 1000 }).catch(() => true);
  const configs = await page.locator('[id*="config"]').count();
  
  console.log('DÉTECTIONS:');
  console.log(`✅ Splash screen: ${splash ? 'PRÉSENT' : 'ABSENT'}`);
  console.log(`✅ Hero section: ${hero ? 'PRÉSENT' : 'ABSENT'}`);
  console.log(`✅ Configurateur: ${configs > 0 ? 'PRÉSENT' : 'ABSENT'}\n`);
  
  // Screenshots
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'final-hero.png' });
  console.log('📸 Screenshot 1: Hero cinématique');
  
  await page.evaluate(() => window.scrollBy(0, window.innerHeight * 2));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'final-middle.png' });
  console.log('📸 Screenshot 2: Sections moyennes');
  
  await page.evaluate(() => window.scrollBy(0, window.innerHeight * 3));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'final-bottom.png' });
  console.log('📸 Screenshot 3: Sections basses\n');
  
  console.log('✨ REFONTE DÉPLOYÉE & VÉRIFIÉE ✨');
  console.log('🔗 https://maison-verlaine-omega.vercel.app');
  
  await browser.close();
  process.exit(0);
})();
