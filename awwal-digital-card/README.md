# Awwal Digital — Business Card

Dark, premium business card design: deep navy-black background, gold/white
typography, minimal diamond "A" monogram. Built as HTML/CSS so it's easy to
tweak, then rendered to high-res image/PDF files with Playwright.

## Files to edit

All real content is placeholder text — swap it before sending anything out:

- `YOUR NAME` / `Founder & CEO`
- `+1 (000) 000-0000`
- `hello@awwaldigital.com`
- `awwaldigital.com`

Edit the text directly in:

- `print-front.html` / `digital-front.html` — front side (name, title, contact)
- `print-back.html` / `digital-back.html` — back side (logo lockup only, no edits usually needed)

Shared styling (colors, fonts, spacing) lives in `assets/card.css`.

## Output

Run `node render.js` from this folder to (re)generate everything into `output/`:

- **`output/digital/`** — share on WhatsApp / social. Card mockup with
  rounded corners and shadow on a dark backdrop, PNG, 2x scale (2600×1640px).
- **`output/print/`** — send to the print shop:
  - `front-print-3.75x2.25in-300dpi.png` / `back-print-3.75x2.25in-300dpi.png`
    — full bleed art (3.75"×2.25" incl. 0.125" bleed each side) with corner
    crop marks at the true 3.5"×2" trim line, embedded at 300 DPI.
  - `AwwalDigital-BusinessCard-Print.pdf` — same two sides as a 2-page PDF,
    ready to upload to a print shop.

## Regenerating after edits

```
cd awwal-digital-card
node render.js
python3 - <<'EOF'
from PIL import Image
front = Image.open('output/print/front-print-3.75x2.25in-300dpi.png')
back = Image.open('output/print/back-print-3.75x2.25in-300dpi.png')
front.save('output/print/front-print-3.75x2.25in-300dpi.png', dpi=(300, 300))
back.save('output/print/back-print-3.75x2.25in-300dpi.png', dpi=(300, 300))
front.convert('RGB').save('output/print/AwwalDigital-BusinessCard-Print.pdf',
    save_all=True, append_images=[back.convert('RGB')], resolution=300.0)
EOF
```

Requires the `playwright` npm package and Python `pillow` (both already
available in this environment).
