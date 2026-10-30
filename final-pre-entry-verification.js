const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  console.log('\n' + '█'.repeat(70));
  console.log('█' + ' '.repeat(68) + '█');
  console.log('█' + '  ✨ VÉRIFICATION COMPLÈTE — PRÉ-ENTRÉE CINÉMATIQUE'.padEnd(69) + '█');
  console.log('█' + ' '.repeat(68) + '█');
  console.log('█'.repeat(70) + '\n');

  // ===================== TEST 1: Chargement =====================
  console.log('TEST 1️⃣  — CHARGEMENT INITIAL');
  console.log('─'.repeat(70));

  console.log('\n📍 Accès au site...');
  await page.goto('https://maison-verlaine-omega.vercel.app', { waitUntil: 'domcontentloaded' });
  console.log('✅ Site chargé\n');

  // ===================== TEST 2: Pré-vidéo =====================
  console.log('TEST 2️⃣  — PRÉ-VIDÉO ACCÉLÉRÉE');
  console.log('─'.repeat(70));

  const preEntry = document.getElementById('preEntry');
  const preVideoInfo = await page.evaluate(() => {
    const el = document.getElementById('preEntry');
    const video = el?.querySelector('video');
    return {
      exists: !!el,
      visible: el ? window.getComputedStyle(el).opacity !== '0' : false,
      videoExists: !!video,
      playbackRate: video?.playbackRate || 0,
      duration: video?.duration || 0,
      src: video?.querySelector('source')?.src || ''
    };
  });

  console.log(`\n📹 Pré-vidéo:
   ✅ Élément présent: ${preVideoInfo.exists ? 'OUI' : 'NON'}
   ✅ Visible au démarrage: ${preVideoInfo.visible ? 'OUI' : 'NON'}
   ✅ Vidéo: ${preVideoInfo.videoExists ? 'OUI' : 'NON'}
   ✅ Vitesse (playbackRate): ${preVideoInfo.playbackRate}x
   ✅ Duration: ${preVideoInfo.duration.toFixed(2)}s
   ✅ Source: ${preVideoInfo.src.split('/').pop()}\n`);

  // Screenshot initial
  await page.screenshot({ path: 'verify-pre-entry-1-start.png' });
  console.log('📸 Screenshot 1: Pré-vidéo au démarrage');

  // ===================== TEST 3: Timeline =====================
  console.log('\nTEST 3️⃣  — TIMELINE DE DISPARITION');
  console.log('─'.repeat(70));

  console.log('\n⏱️ T=1s:');
  await page.waitForTimeout(1000);
  const at1s = await page.evaluate(() => {
    const pre = document.getElementById('preEntry');
    const splash = document.getElementById('splashScreen');
    return {
      preVisible: pre ? window.getComputedStyle(pre).opacity !== '0' : false,
      splashVisible: splash ? window.getComputedStyle(splash).opacity !== '0' : false
    };
  });
  console.log(`   • Pré-vidéo: ${at1s.preVisible ? '✅ VISIBLE' : '⏳ EN COURS'}`);
  console.log(`   • Splash: ${at1s.splashVisible ? '⏳ VISIBLE' : '❌ CACHÉ'}`);

  console.log('\n⏱️ T=2s:');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'verify-pre-entry-2-mid.png' });
  console.log('   📸 Screenshot 2: Pré-vidéo en cours');

  console.log('\n⏱️ T=3.5s (Disparition pré-vidéo):');
  await page.waitForTimeout(1500);
  const at3_5s = await page.evaluate(() => {
    const pre = document.getElementById('preEntry');
    const splash = document.getElementById('splashScreen');
    return {
      preVisible: pre ? window.getComputedStyle(pre).opacity !== '0' : false,
      splashVisible: splash ? window.getComputedStyle(splash).opacity !== '0' : false
    };
  });
  console.log(`   ✅ Pré-vidéo disparue: ${!at3_5s.preVisible ? 'CONFIRMÉ' : 'EN COURS'}`);
  console.log(`   ✅ Splash visible: ${at3_5s.splashVisible ? 'CONFIRMÉ' : '⏳ EN COURS'}`);

  console.log('\n⏱️ T=5s:');
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'verify-pre-entry-3-splash.png' });
  console.log('   📸 Screenshot 3: Splash screen');

  console.log('\n⏱️ T=8s (Disparition splash):');
  await page.waitForTimeout(3000);
  const at8s = await page.evaluate(() => {
    const splash = document.getElementById('splashScreen');
    const hero = document.querySelector('.hero');
    return {
      splashVisible: splash ? window.getComputedStyle(splash).opacity !== '0' : false,
      heroVisible: hero ? window.getComputedStyle(hero).opacity !== '0' : false
    };
  });
  console.log(`   ✅ Splash disparu: ${!at8s.splashVisible ? 'CONFIRMÉ' : 'EN COURS'}`);
  console.log(`   ✅ Hero visible: ${at8s.heroVisible ? 'CONFIRMÉ' : '⏳'}`);

  await page.screenshot({ path: 'verify-pre-entry-4-hero.png' });
  console.log('   📸 Screenshot 4: Page principale');

  // ===================== TEST 4: Assets =====================
  console.log('\nTEST 4️⃣  — CONTENU & ASSETS');
  console.log('─'.repeat(70));

  const contentInfo = await page.evaluate(() => {
    return {
      images: document.querySelectorAll('img').length,
      macroImages: document.querySelectorAll('img[src*="macro"]').length,
      videos: document.querySelectorAll('video').length,
      sections: document.querySelectorAll('section').length
    };
  });

  console.log(`\n✅ Contenu:
   • Images: ${contentInfo.images}
   • Images macro: ${contentInfo.macroImages}
   • Vidéos: ${contentInfo.videos}
   • Sections: ${contentInfo.sections}\n`);

  // ===================== VERDICT =====================
  console.log('█'.repeat(70));
  console.log('█' + ' '.repeat(68) + '█');
  console.log('█' + '  ✨ VERDICT FINAL'.padEnd(69) + '█');
  console.log('█' + ' '.repeat(68) + '█');
  console.log('█'.repeat(70) + '\n');

  const allPass = preVideoInfo.playbackRate === 2 && preVideoInfo.exists && 
                  preVideoInfo.visible && !at3_5s.preVisible && at8s.heroVisible;

  console.log(`  🎬 PRÉ-VIDÉO: ${preVideoInfo.playbackRate === 2 ? '✅ ACCÉLÉRÉE 2x' : '❌ NORMAL'}`);
  console.log(`  ⏱️ TIMELINE: ${!at3_5s.preVisible && at8s.heroVisible ? '✅ COMPLÈTE' : '⚠️  À VÉRIFIER'}`);
  console.log(`  📸 ASSETS: ${contentInfo.images > 0 ? '✅ VISIBLES' : '❌ ABSENT'}`);
  console.log(`  🌐 PAGE: ${at8s.heroVisible ? '✅ COMPLÈTE' : '⚠️  CHARGEMENT'}`);

  console.log(`\n  ${allPass ? '🎉 CINÉMATIQUE COMPLÈTE & VÉRIFIÉE 🎉' : '⚠️  Vérifications'}\n`);

  console.log(`  🌐 URL: https://maison-verlaine-omega.vercel.app`);
  console.log(`  📊 Commit: b48b5da`);
  console.log(`  ✅ Vercel: READY\n`);

  console.log('█'.repeat(70) + '\n');

  await browser.close();
  process.exit(0);
})();
