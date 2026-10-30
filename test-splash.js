const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Aller sur le site
  await page.goto('https://maison-verlaine-omega.vercel.app', { waitUntil: 'load', timeout: 30000 });
  
  // Attendre un peu pour que la page se charge
  await page.waitForTimeout(2000);
  
  // Vérifier que le splash screen existe et est visible
  const splashVisible = await page.locator('#splash').isVisible();
  const videoExists = await page.locator('#splash video').count() > 0;
  const videoSrc = await page.locator('#splash video source').getAttribute('src');
  
  console.log('✓ Splash screen visible au démarrage:', splashVisible);
  console.log('✓ Vidéo élément existe:', videoExists);
  console.log('✓ Source vidéo:', videoSrc);
  
  // Prendre une screenshot
  await page.screenshot({ path: 'splash-screenshot.png' });
  console.log('✓ Screenshot sauvegardée: splash-screenshot.png');
  
  // Attendre que le splash disparaisse
  await page.waitForTimeout(5000);
  const splashAfter = await page.locator('#splash').isVisible({ timeout: 1000 }).catch(() => false);
  console.log('✓ Splash disparaît après vidéo:', !splashAfter);
  
  // Screenshot après disparition
  await page.screenshot({ path: 'site-after-splash.png' });
  console.log('✓ Screenshot du site après splash: site-after-splash.png');
  
  await browser.close();
  process.exit(0);
})();
