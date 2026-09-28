# Gameday Brand Kit

## What's in here
Every logo lockup and icon is built from the SAME shared vector components —
one star path, one arc path, one font — defined once and reused across every
file. That's what makes them a real system instead of independent renders:
the star looks pixel-identical in `logo-primary.svg`, `icon-star.svg`, and
`icon-star-badge.svg` because it's the literal same path definition in each,
not redrawn per file.

## Files

| File | Size | Use |
|---|---|---|
| logo-primary.svg / .png | ~1744x899 | Arched wordmark + star badge, transparent bg |
| logo-horizontal.svg / .png | ~2354x320 | Straight wordmark + star-oval, side by side |
| logo-submark.svg / .png | 2000x1126 | Black badge card version (ivory on black) |
| logo-stacked.svg / .png | ~1527x680 | Straight wordmark stacked above star-oval |
| wordmark.svg / .png | ~1747x323 | Text only, no icon |
| wordmark-alt.svg / .png | ~1816x538 | Text + star-oval, alternate spacing |
| favicon.svg / .png | 512x512 | Black square, ivory G + star |
| favicon-16/32/48/64/180/512.png | various | Standard favicon sizes, generated from the same master |
| favicon.ico | multi-res | 16/32/48/64 bundled into one .ico |
| apple-touch-icon.png | 180x180 | iOS home screen icon |
| icon-g.svg / .png | 1024x1024 | G monogram, black square bg |
| icon-star-badge.svg / .png | 1024x1024 | Star-oval only, black square bg |
| icon-star.svg / .png | ~694x694 | Star only, transparent bg, no card |
| icon-g-only.svg / .png | ~543x636 | Outlined G, no fill, transparent bg |
| avatar.svg / .png | 1024x1024 | Circular version for social profile photos |
| color-palette.png | reference | Visual swatch of the 3 brand colors |

## Colors
- Black `#000000`
- Ivory `#F5F4EB`
- Gold `#C89A2B`

## On the typeface — read this before using these in production
The wordmark here uses **DejaVu Sans Condensed Bold**, a font already
installed in the environment these were built in. It's a real, clean,
bold condensed sans — but it is a stand-in, not the exact "College Varsity"
style shown in the original moodboard reference. I didn't have internet
access to pull that specific font.

If you (or your dev) have a licensed copy of a proper collegiate/varsity
display font — Anton, Bebas Neue, Bungee, Alfa Slab One, or the actual
"College Varsity" font — swap the `FONT` variable in `build_svg.py` and
re-run it. Because every lockup is generated from that one shared script,
changing the font in one place regenerates all 12 files consistently —
you will never end up with the wordmark looking slightly different across
files the way independent image-generation renders would.

## How these were made (for reproducibility)
1. `build_svg.py` — defines the shared star path, arc path, and font once,
   then assembles each lockup as real SVG (text elements + path elements,
   not rasterized pixels).
2. `rasterize.py` — opens each SVG in headless Chromium (via Playwright)
   and screenshots it at the target pixel size with a transparent
   background, so the PNG exports are pixel-accurate renders of the vector,
   not re-interpretations of it.
3. Favicon sizes were rendered directly from the master `favicon.svg` at
   each target size (not resized/downsampled from one bitmap), so `16px`
   and `512px` are both native-quality renders, not one blurry upscale.

## Editing later
Open any `.svg` file directly in Illustrator, Figma, or a browser — they're
real vector files, fully editable. If you change something in
`build_svg.py`, re-run:
```
python3 build_svg.py
python3 rasterize.py
```
to regenerate everything from the same shared source.
