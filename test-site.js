const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    console.log('Testing http://localhost:3000...');
    await page.goto('http://localhost:3000', { timeout: 30000, waitUntil: 'networkidle' });

    const title = await page.title();
    console.log('✓ Site is accessible!');
    console.log('Page title:', title);

    await page.screenshot({ path: 'site-test.png' });
    console.log('Screenshot saved as site-test.png');

  } catch (error) {
    console.error('✗ Failed to access site:', error.message);
  }

  await browser.close();
})();