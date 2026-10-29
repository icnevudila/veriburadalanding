const fs = require('fs');
const { chromium } = require('C:/Users/TP2/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');

(async () => {
  const b = await chromium.launch({ headless: true, executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
  fs.mkdirSync('research/slogan-proof', { recursive: true });

  for (const width of [1440, 768, 390, 320]) {
    const p = await b.newPage({ viewport: { width, height: 900 } });
    await p.goto('http://127.0.0.1:4173/');

    // 1. Wait for phrase 1: 'İşletmeleri bulun.'
    await p.waitForFunction(() => document.querySelector('.slogan-first')?.textContent.includes('İşletmeleri'));
    await p.locator('.hero-copy h1.hero-slogan').screenshot({ path: `research/slogan-proof/slogan-isletmeleri-${width}.png` });

    // 2. Wait for phrase 2: 'İşletmeler orada.'
    await p.waitForFunction(() => document.querySelector('.slogan-first')?.textContent.includes('İşletmeler orada'));
    await p.locator('.hero-copy h1.hero-slogan').screenshot({ path: `research/slogan-proof/slogan-isletmeler-${width}.png` });

    // Also take a full hero screenshot at 1440 & 390 to verify harmony
    if (width === 1440 || width === 390) {
      await p.locator('.hero').screenshot({ path: `research/slogan-proof/hero-${width}.png` });
    }

    await p.close();
  }

  await b.close();
  console.log('All slogan proof screenshots saved successfully!');
})();
