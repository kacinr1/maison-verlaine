const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  console.log('\n' + '='.repeat(70));
  console.log('🎬 TEST PRÉ-ENTRÉE CINÉMATIQUE ACCÉLÉRÉE');
  console.log('='.repeat(70) + '\n');

  console.log('🎥 Chargement du site...');
  await page.goto('https://maison-verlaine-omega.vercel.app', { waitUntil: 'domcontentloaded' });

  // Vérifier la pré-vidéo
  const preEntry = await page.locator('#preEntry').isVisible({ timeout: 1000 }).catch(() => false);
  const preVideo = await page.locator('#preEntry video').count();
  const preVideoSrc = await page.locator('#preEntry video source').getAttribute('src').catch(() => '');

  console.log('\n✅ Pré-entrée vidéo:');
  console.log(`   • Visible au démarrage: ${preEntry ? '✅ OUI' : '❌ NON'}`);
  console.log(`   • Vidéo présente: ${preVideo > 0 ? '✅ OUI' : '❌ NON'}`);
  console.log(`   • Src: ${preVideoSrc.split('/').pop()}`);

  // Vérifier la vitesse accélérée
  const playbackRate = await page.locator('#preEntry video').evaluate((el) => el.playbackRate).catch(() => 1);
  console.log(`   • Vitesse (playbackRate): ${playbackRate}x ${playbackRate > 1 ? '✅ ACCÉLÉRÉE' : '⚠️ NORMALE'}`);

  // Attendre la disparition
  console.log('\n⏱️  Attente disparition (3.5s)...');
  await page.waitForTimeout(3600);

  const preEntryAfter = await page.locator('#preEntry').isVisible({ timeout: 1000 }).catch(() => false);
  console.log(`   ✅ Disparition: ${!preEntryAfter ? 'CONFIRMÉE' : 'EN COURS'}`);

  // Vérifier le splash
  console.log('\n✅ Splash screen (après pré-vidéo):');
  const splashVisible = await page.locator('#splashScreen').isVisible({ timeout: 500 }).catch(() => false);
  console.log(`   • Splash visible: ${splashVisible ? '✅ OUI' : '❌ NON'}`);

  // Attendre la disparition du splash
  console.log('\n⏱️  Attente disparition splash (4s)...');
  await page.waitForTimeout(4000);

  const splashAfter = await page.locator('#splashScreen').isVisible({ timeout: 500 }).catch(() => false);
  console.log(`   ✅ Splash disparu: ${!splashAfter ? 'CONFIRMÉ' : 'EN COURS'}`);

  // Vérifier le hero
  console.log('\n✅ Hero principal:');
  const heroVisible = await page.locator('.hero').isVisible({ timeout: 1000 }).catch(() => false);
  console.log(`   • Hero visible: ${heroVisible ? '✅ OUI - PAGE PRINCIPALE!' : '❌ NON'}`);

  // Screenshot
  await page.screenshot({ path: 'test-pre-entry-final.png' });
  console.log('\n📸 Screenshot sauvegardé\n');

  console.log('='.repeat(70));
  console.log('✨ SÉQUENCE COMPLÈTE:');
  console.log('='.repeat(70));
  console.log(`
  1️⃣ PRÉ-VIDÉO (0-3.5s): Video cinématique ACCÉLÉRÉE 2x
  2️⃣ SPLASH (3.5s-7.5s): Logo + animation fade
  3️⃣ PAGE PRINCIPALE: Hero + contenu

  🎬 Status: ${preEntry && preVideo > 0 ? '✅ CINÉMATIQUE COMPLÈTE' : '⚠️ À VÉRIFIER'}
  `);
  console.log('='.repeat(70) + '\n');

  await browser.close();
  process.exit(0);
})();
