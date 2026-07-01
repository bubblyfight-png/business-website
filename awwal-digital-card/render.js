const path = require('path');
const { chromium } = require('/opt/node22/lib/node_modules/playwright');

const DIR = __dirname;
const OUT = path.join(DIR, 'output');

const jobs = [
  { html: 'print-front.html', out: 'print/front-print-3.75x2.25in-300dpi.png', w: 1275, h: 825 },
  { html: 'print-back.html', out: 'print/back-print-3.75x2.25in-300dpi.png', w: 1275, h: 825 },
  { html: 'digital-front.html', out: 'digital/front-digital-whatsapp.png', w: 1300, h: 820 },
  { html: 'digital-back.html', out: 'digital/back-digital-whatsapp.png', w: 1300, h: 820 },
];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ deviceScaleFactor: 2 });

  for (const job of jobs) {
    await page.setViewportSize({ width: job.w, height: job.h });
    await page.goto('file://' + path.join(DIR, job.html));
    await page.evaluate(() => document.fonts.ready);
    const outPath = path.join(OUT, job.out);
    require('fs').mkdirSync(path.dirname(outPath), { recursive: true });
    await page.screenshot({ path: outPath, clip: { x: 0, y: 0, width: job.w, height: job.h } });
    console.log('wrote', outPath);
  }

  await browser.close();
})();
