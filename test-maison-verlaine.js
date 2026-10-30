const { test, expect } = require('@playwright/test');

const BASE_URL = 'http://localhost:8000';

test.describe('Maison Verlaine - Full Site Validation', () => {

  // ==================== SPLASH SCREEN TESTS ====================
  test('Splash screen appears and animates correctly (desktop)', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(BASE_URL);

    const splash = page.locator('.splash-screen');
    await expect(splash).toBeVisible();

    // Check logo is present
    const logo = page.locator('.splash-logo');
    await expect(logo).toBeVisible();
    await expect(logo).toContainText('MV');

    // Wait for splash to disappear (4 seconds)
    await page.waitForTimeout(4100);
    await expect(splash).not.toBeVisible();
  });

  test('Splash screen appears and animates correctly (mobile)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(BASE_URL);

    const splash = page.locator('.splash-screen');
    await expect(splash).toBeVisible();

    await page.waitForTimeout(4100);
    await expect(splash).not.toBeVisible();
  });

  // ==================== HERO SECTION TESTS ====================
  test('Hero section loads with video and content (desktop)', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(BASE_URL);
    await page.waitForTimeout(4500); // Wait for splash

    const hero = page.locator('.hero');
    await expect(hero).toBeVisible();

    const heroVideo = page.locator('.hero-video');
    await expect(heroVideo).toBeVisible();

    const heroContent = page.locator('.hero-content');
    await expect(heroContent).toBeVisible();
    await expect(heroContent.locator('h1')).toContainText('Élégance Sur Mesure');

    const heroButton = page.locator('.hero-cta');
    await expect(heroButton).toBeVisible();
  });

  test('Hero section responsive layout (mobile)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(BASE_URL);
    await page.waitForTimeout(4500);

    const heroContent = page.locator('.hero-content');
    await expect(heroContent).toBeVisible();

    const heroH1 = page.locator('.hero-content h1');
    const fontSize = await heroH1.evaluate(el => window.getComputedStyle(el).fontSize);
    // Font size should be clamped between 24px and 48px, on mobile should be closer to 20-24px
    const sizeNum = parseFloat(fontSize);
    expect(sizeNum).toBeGreaterThanOrEqual(20);
    expect(sizeNum).toBeLessThanOrEqual(48);
  });

  test('Scroll cue animation is visible', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(BASE_URL);
    await page.waitForTimeout(4500);

    const scrollCue = page.locator('.scroll-cue');
    await expect(scrollCue).toBeVisible();
  });

  // ==================== NAVIGATION & ANCHOR LINKS ====================
  test('Anchor links scroll smoothly to sections', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(BASE_URL);
    await page.waitForTimeout(4500);

    // Click on savoir-faire link
    const footer = page.locator('footer');
    const savoirFaireLink = footer.locator('a:has-text("Savoir-Faire")');

    await savoirFaireLink.click();
    await page.waitForTimeout(1000);

    const savoirFaireSection = page.locator('#savoirFaire');
    const boundingBox = await savoirFaireSection.boundingBox();
    expect(boundingBox).toBeTruthy();

    const viewportSize = page.viewportSize();
    // Check that section is in viewport
    expect(boundingBox.y).toBeLessThan(viewportSize.height);
  });

  // ==================== SAVOIR-FAIRE SECTION ====================
  test('Savoir-faire section structure and content (desktop)', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(BASE_URL);
    await page.waitForTimeout(4500);

    const savoirFaire = page.locator('.savoir-faire');
    await savoirFaire.scrollIntoViewIfNeeded();

    const title = page.locator('.savoir-faire-content h2');
    await expect(title).toContainText('Notre Savoir-Faire');

    const pillars = page.locator('.pillar');
    await expect(pillars).toHaveCount(3);

    // Check grid items
    const gridItems = page.locator('.savoir-faire-grid-item');
    await expect(gridItems).toHaveCount(4);

    // All images should be loaded
    const images = page.locator('.savoir-faire-grid-item img');
    for (let i = 0; i < 4; i++) {
      const img = images.nth(i);
      await expect(img).toHaveAttribute('src', /K[1-4]\.png/);
    }
  });

  test('Savoir-faire grid responsive (tablet)', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto(BASE_URL);
    await page.waitForTimeout(4500);

    const container = page.locator('.savoir-faire-container');
    const style = await container.evaluate(el => {
      const computed = window.getComputedStyle(el);
      return computed.gridTemplateColumns;
    });

    // On tablet (768px), should be 1fr (single column)
    expect(style).toBe('1fr');
  });

  test('Savoir-faire grid responsive (mobile)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(BASE_URL);
    await page.waitForTimeout(4500);

    const gridItems = page.locator('.savoir-faire-grid');
    const style = await gridItems.evaluate(el => {
      const computed = window.getComputedStyle(el);
      return computed.gridTemplateColumns;
    });

    // On mobile, should be single column
    expect(style).toBe('1fr');
  });

  // ==================== ÉTOFFES SECTION ====================
  test('Étoffes masonry grid loads (desktop)', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(BASE_URL);
    await page.waitForTimeout(4500);

    const etoffesSection = page.locator('.etoffes');
    await etoffesSection.scrollIntoViewIfNeeded();

    const gridItems = page.locator('.etoffes-grid-item');
    await expect(gridItems).toHaveCount(6);

    // First item should span 2 columns
    const firstItem = gridItems.first();
    const gridColumn = await firstItem.evaluate(el => {
      const computed = window.getComputedStyle(el);
      return computed.gridColumn;
    });

    expect(gridColumn).toContain('span 2');
  });

  test('Étoffes grid hover effects (desktop)', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(BASE_URL);
    await page.waitForTimeout(4500);

    const etoffesItem = page.locator('.etoffes-grid-item').nth(1);
    await etoffesItem.scrollIntoViewIfNeeded();

    // Hover and check transform
    await etoffesItem.hover();
    await page.waitForTimeout(300);

    const transform = await etoffesItem.evaluate(el => {
      const computed = window.getComputedStyle(el);
      return computed.transform;
    });

    expect(transform).toContain('scale');
  });

  test('Étoffes grid responsive (tablet)', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto(BASE_URL);
    await page.waitForTimeout(4500);

    const grid = page.locator('.etoffes-grid');
    const columns = await grid.evaluate(el => {
      const computed = window.getComputedStyle(el);
      return computed.gridTemplateColumns;
    });

    // On tablet, should be 2 columns
    const colArray = columns.split(' ');
    expect(colArray.length).toBe(2);
  });

  // ==================== DÉTAILS VIDEO SECTION ====================
  test('Details video section loads (desktop)', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(BASE_URL);
    await page.waitForTimeout(4500);

    const detailsSection = page.locator('.details-video');
    await detailsSection.scrollIntoViewIfNeeded();

    const heroContainer = page.locator('.hero-video-container');
    await expect(heroContainer).toBeVisible();

    const gridItems = page.locator('.details-grid-item');
    await expect(gridItems).toHaveCount(6);

    // Check play icons
    const playIcons = page.locator('.play-icon');
    await expect(playIcons).toHaveCount(6);
  });

  test('Play icon appears on hover (desktop)', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(BASE_URL);
    await page.waitForTimeout(4500);

    const detailsItem = page.locator('.details-grid-item').first();
    await detailsItem.scrollIntoViewIfNeeded();

    const playIcon = detailsItem.locator('.play-icon');

    // Initially hidden
    const initialOpacity = await playIcon.evaluate(el => {
      return window.getComputedStyle(el).opacity;
    });
    expect(initialOpacity).toBe('0');

    // Hover to show
    await detailsItem.hover();
    await page.waitForTimeout(300);

    const hoverOpacity = await playIcon.evaluate(el => {
      return window.getComputedStyle(el).opacity;
    });
    expect(hoverOpacity).toBe('1');
  });

  // ==================== CONFIGURATEUR SECTION ====================
  test('Configurateur 3D section loads (desktop)', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(BASE_URL);
    await page.waitForTimeout(4500);

    const configurateur = page.locator('.configurateur');
    await configurateur.scrollIntoViewIfNeeded();

    const title = page.locator('.configurateur-title h2');
    await expect(title).toContainText('Configurateur 3D');

    // Check form controls
    const tissusSelect = page.locator('#tissus');
    await expect(tissusSelect).toBeVisible();
    await expect(tissusSelect).toContainText('Laine Mérinos Bleu Marine');

    const styleSelect = page.locator('#style');
    await expect(styleSelect).toBeVisible();

    const couleurInput = page.locator('#couleur');
    await expect(couleurInput).toBeVisible();

    const boutonsSelect = page.locator('#boutons');
    await expect(boutonsSelect).toBeVisible();

    const configButton = page.locator('.config-button');
    await expect(configButton).toBeVisible();
    await expect(configButton).toContainText('Demander Rendez-vous');
  });

  test('Configurateur controls trigger config updates (desktop)', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(BASE_URL);
    await page.waitForTimeout(4500);

    const tissusSelect = page.locator('#tissus');
    await tissusSelect.scrollIntoViewIfNeeded();

    // Change tissue
    await tissusSelect.selectOption('laine-tweed');

    // Check localStorage
    const config = await page.evaluate(() => {
      return JSON.parse(localStorage.getItem('costumeConfig') || '{}');
    });

    expect(config.tissu).toBe('laine-tweed');
  });

  test('Configurateur responsive (mobile)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(BASE_URL);
    await page.waitForTimeout(4500);

    const configurateur = page.locator('.configurateur');
    await configurateur.scrollIntoViewIfNeeded();

    const grid = page.locator('.configurateur-grid');
    const columns = await grid.evaluate(el => {
      const computed = window.getComputedStyle(el);
      return computed.gridTemplateColumns;
    });

    // On mobile, should be single column
    expect(columns).toBe('1fr');
  });

  // ==================== LOOKBOOK SECTION ====================
  test('Lookbook section loads (desktop)', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(BASE_URL);
    await page.waitForTimeout(4500);

    const lookbook = page.locator('.lookbook');
    await lookbook.scrollIntoViewIfNeeded();

    const title = page.locator('.lookbook-title h2');
    await expect(title).toContainText('Lookbook');

    const cards = page.locator('.lookbook-card');
    await expect(cards).toHaveCount(4);
  });

  test('Lookbook card overlay appears on hover (desktop)', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(BASE_URL);
    await page.waitForTimeout(4500);

    const card = page.locator('.lookbook-card').first();
    await card.scrollIntoViewIfNeeded();

    const overlay = card.locator('.lookbook-card-overlay');

    // Check initial transform
    const initialTransform = await overlay.evaluate(el => {
      return window.getComputedStyle(el).transform;
    });
    expect(initialTransform).toContain('translateY(100px)');

    // Hover
    await card.hover();
    await page.waitForTimeout(400);

    const hoverTransform = await overlay.evaluate(el => {
      return window.getComputedStyle(el).transform;
    });
    expect(hoverTransform).toContain('translateY(0)');
  });

  // ==================== PARCOURS SECTION ====================
  test('Parcours timeline loads (desktop)', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(BASE_URL);
    await page.waitForTimeout(4500);

    const parcours = page.locator('.parcours');
    await parcours.scrollIntoViewIfNeeded();

    const title = page.locator('.parcours-title h2');
    await expect(title).toContainText('Notre Parcours');

    const items = page.locator('.timeline-item');
    await expect(items).toHaveCount(4);

    // Check timeline dots
    const dots = page.locator('.timeline-dot');
    await expect(dots).toHaveCount(4);

    // Check content
    const firstItem = items.first();
    await expect(firstItem.locator('.timeline-content h3')).toContainText('1985 - Fondation');
  });

  // ==================== CONTACT SECTION ====================
  test('Contact form loads (desktop)', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(BASE_URL);
    await page.waitForTimeout(4500);

    const contact = page.locator('.contact');
    await contact.scrollIntoViewIfNeeded();

    const form = page.locator('#contactForm');
    await expect(form).toBeVisible();

    // Check form fields
    const nomInput = page.locator('#nom');
    const emailInput = page.locator('#email');
    const telInput = page.locator('#telephone');
    const messageInput = page.locator('#message');

    await expect(nomInput).toBeVisible();
    await expect(emailInput).toBeVisible();
    await expect(telInput).toBeVisible();
    await expect(messageInput).toBeVisible();

    // Check contact info
    const address = page.locator('.contact-info-item');
    await expect(address).toContainText('12 rue de Grenelle');
  });

  test('Contact form submission (desktop)', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(BASE_URL);
    await page.waitForTimeout(4500);

    const form = page.locator('#contactForm');
    await form.scrollIntoViewIfNeeded();

    // Fill form
    await page.locator('#nom').fill('Jean Dupont');
    await page.locator('#email').fill('jean@example.com');
    await page.locator('#telephone').fill('+33612345678');
    await page.locator('#message').fill('Je souhaite une consultation');

    // Submit
    const submitButton = page.locator('.submit-button');
    await submitButton.click();

    await page.waitForTimeout(500);

    // Check success message
    await expect(submitButton).toContainText('Merci!');

    // Form should be reset after 3s
    await page.waitForTimeout(3100);
    const nomValue = await page.locator('#nom').inputValue();
    expect(nomValue).toBe('');
  });

  test('Contact form responsive (mobile)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(BASE_URL);
    await page.waitForTimeout(4500);

    const contact = page.locator('.contact');
    await contact.scrollIntoViewIfNeeded();

    const contentGrid = page.locator('.contact-content');
    const columns = await contentGrid.evaluate(el => {
      const computed = window.getComputedStyle(el);
      return computed.gridTemplateColumns;
    });

    // On mobile, should be single column
    expect(columns).toBe('1fr');
  });

  // ==================== FOOTER ====================
  test('Footer displays correctly', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(BASE_URL);

    const footer = page.locator('footer');
    await footer.scrollIntoViewIfNeeded();

    await expect(footer).toContainText('Maison Verlaine');

    const links = page.locator('footer a');
    const count = await links.count();
    expect(count).toBeGreaterThanOrEqual(6);
  });

  // ==================== RESPONSIVE BREAKPOINTS ====================
  test('Mobile viewport (375px) - full navigation', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(BASE_URL);
    await page.waitForTimeout(4500);

    // Hero should be visible
    const hero = page.locator('.hero');
    await expect(hero).toBeVisible();

    // Scroll through sections
    const sections = ['.savoir-faire', '.etoffes', '.details-video', '.configurateur', '.lookbook', '.parcours', '.contact'];

    for (const section of sections) {
      const sectionEl = page.locator(section);
      await sectionEl.scrollIntoViewIfNeeded();
      await expect(sectionEl).toBeVisible();
    }
  });

  test('Tablet viewport (768px) - layout adjustments', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto(BASE_URL);
    await page.waitForTimeout(4500);

    const savoirFaire = page.locator('.savoir-faire-container');
    const columns = await savoirFaire.evaluate(el => {
      const computed = window.getComputedStyle(el);
      return computed.gridTemplateColumns;
    });

    // On tablet should be 1 column
    expect(columns).toBe('1fr');
  });

  test('Desktop viewport (1920px) - full layout', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(BASE_URL);
    await page.waitForTimeout(4500);

    const savoirFaire = page.locator('.savoir-faire-container');
    const columns = await savoirFaire.evaluate(el => {
      const computed = window.getComputedStyle(el);
      return computed.gridTemplateColumns;
    });

    // On desktop should be 2 columns
    expect(columns).toBe('1fr 1fr');
  });

  // ==================== PERFORMANCE ====================
  test('Page loads in under 5 seconds (excluding splash)', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });

    const startTime = Date.now();
    await page.goto(BASE_URL);
    await page.waitForTimeout(4500); // Wait for splash

    const loadTime = Date.now() - startTime;
    expect(loadTime).toBeLessThan(5000 + 4500); // 5 seconds for page + 4.5s splash
  });

  test('No console errors on page load', async ({ page }) => {
    const errors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await page.goto(BASE_URL);
    await page.waitForTimeout(4500);

    expect(errors).toEqual([]);
  });

  // ==================== ACCESSIBILITY ====================
  test('Form inputs have proper labels (a11y)', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(BASE_URL);
    await page.waitForTimeout(4500);

    const form = page.locator('#contactForm');
    await form.scrollIntoViewIfNeeded();

    const labels = page.locator('.form-group label');
    const count = await labels.count();
    expect(count).toBeGreaterThan(0);

    // Check label associations
    for (let i = 0; i < count; i++) {
      const label = labels.nth(i);
      const labelFor = await label.getAttribute('for');
      expect(labelFor).toBeTruthy();
    }
  });

  test('Anchor links have proper href (a11y)', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(BASE_URL);

    const links = page.locator('a[href^="#"]');
    const count = await links.count();

    for (let i = 0; i < count; i++) {
      const link = links.nth(i);
      const href = await link.getAttribute('href');
      expect(href).toMatch(/^#[a-zA-Z]/);
    }
  });

});
