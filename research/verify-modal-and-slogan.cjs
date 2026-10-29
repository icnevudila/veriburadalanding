const fs = require('fs');
const assert = require('node:assert/strict');
const { chromium } = require('C:/Users/TP2/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');

(async () => {
  const b = await chromium.launch({ headless: true, executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  
  await p.goto('http://127.0.0.1:4173/');

  // 1. Verify Slogan Headroom
  await p.waitForFunction(() => document.querySelector('.slogan-first')?.textContent.includes('İşletmeler orada'));
  await p.locator('.hero-copy h1.hero-slogan').screenshot({ path: 'research/slogan-fixed.png' });
  
  const sloganStyles = await p.evaluate(() => {
    const el = document.querySelector('h1.hero-slogan');
    const s = getComputedStyle(el);
    return {
      overflow: s.overflow,
      paddingTop: s.paddingTop,
      lineHeight: s.lineHeight
    };
  });
  console.log('Slogan styles:', sloganStyles);
  assert.equal(sloganStyles.overflow, 'visible', 'Slogan must have overflow: visible');

  // 2. Open Modal via #hesap (or data-auth-open)
  await p.locator('#hesap').click();
  await p.waitForSelector('.account-dialog[open]');
  
  // Verify .account-location does NOT exist in dialog
  const hasLocation = await p.evaluate(() => !!document.querySelector('.account-dialog .account-location'));
  console.log('Has account-location:', hasLocation);
  assert.equal(hasLocation, false, 'The .account-location search bar must be removed');

  // Verify target="_blank" and rel="noopener noreferrer"
  const links = await p.evaluate(() => {
    return Array.from(document.querySelectorAll('.account-dialog [data-account-option]')).map(a => ({
      text: a.textContent.trim(),
      target: a.getAttribute('target'),
      rel: a.getAttribute('rel'),
      href: a.getAttribute('href')
    }));
  });
  console.log('Account dialog links:', links);
  assert.equal(links.length, 2);
  for (const l of links) {
    assert.equal(l.target, '_blank', `${l.text} must have target="_blank"`);
    assert.ok(l.rel?.includes('noopener'), `${l.text} must have rel including noopener`);
  }

  // Screenshot of the modified modal
  await p.locator('.account-dialog').screenshot({ path: 'research/account-modal-fixed.png' });

  // Mobile viewport test (390px)
  await p.setViewportSize({ width: 390, height: 844 });
  await p.locator('.account-dialog').screenshot({ path: 'research/account-modal-fixed-mobile.png' });

  console.log('ALL VERIFICATIONS PASSED SUCCESSFULLY!');
  await b.close();
})();
