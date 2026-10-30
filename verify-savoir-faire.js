const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Aller sur le site
  await page.goto('https://maison-verlaine-omega.vercel.app', { waitUntil: 'load', timeout: 30000 });
  
  // Attendre un peu
  await page.waitForTimeout(2000);
  
  // Scroller jusqu'à la section "La Maison"
  await page.locator('#maison').scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);
  
  // Vérifier la vidéo savoir-faire
  const videoExists = await page.locator('#maison video').count() > 0;
  const videoSrc = await page.locator('#maison video source').getAttribute('src');
  const capText = await page.locator('#maison .cap').textContent();
  
  // Vérifier Genaro Balbini
  const signText = await page.locator('#maison .sign').textContent();
  
  console.log('✓ Vidéo savoir-faire existe:', videoExists);
  console.log('✓ Source vidéo:', videoSrc);
  console.log('✓ Label section:', capText);
  console.log('✓ Signature artisan:', signText);
  
  // Prendre screenshot de la section
  await page.screenshot({ path: 'savoir-faire-section.png' });
  console.log('✓ Screenshot sauvegardée: savoir-faire-section.png');
  
  await browser.close();
  process.exit(0);
})();
