const { chromium } = require('C:/Users/TP2/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');

(async () => {
  const b = await chromium.launch({ headless: true, executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto('http://127.0.0.1:4173/');
  await p.waitForFunction(() => document.querySelector('.slogan-first')?.textContent.includes('İşletmeler orada'));
  
  // Before screenshot
  await p.locator('.hero-copy h1.hero-slogan').screenshot({ path: 'research/slogan-before.png' });
  
  // Apply fix dynamically
  await p.addStyleTag({
    content: `
      .hero-copy h1.hero-slogan {
        overflow: visible !important;
        height: auto !important;
        min-height: 2.35em !important;
        line-height: 1.16 !important;
        padding-top: 0.16em !important;
        margin-top: -0.16em !important;
      }
      .hero-slogan > .slogan-first,
      .hero-slogan > .slogan-second {
        display: block !important;
        min-height: 1.16em !important;
        line-height: 1.16 !important;
        padding-top: 0.06em !important;
        overflow: visible !important;
        white-space: nowrap !important;
      }
    `
  });
  
  // After screenshot
  await p.locator('.hero-copy h1.hero-slogan').screenshot({ path: 'research/slogan-after.png' });
  console.log('Screenshots taken successfully!');
  await b.close();
})();
