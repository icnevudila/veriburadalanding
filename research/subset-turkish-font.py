"""Subset only Turkish additions; original Inter and OFL license are retained."""
from pathlib import Path
import sys
import json
import re

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / 'research/font-runtime'))
from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.pens.recordingPen import DecomposingRecordingPen

source = ROOT / 'public/fonts/inter-latin-ext.woff2'
target = ROOT / 'public/fonts/inter-turkish.woff2'
unicodes = [0x011E, 0x011F, 0x0130, 0x015E, 0x015F, 0x20BA]
options = subset.Options()
options.flavor = 'woff2'
options.hinting = True
font = subset.load_font(str(source), options)
subsetter = subset.Subsetter(options=options)
subsetter.populate(unicodes=unicodes)
subsetter.subset(font)
subset.save_font(font, str(target), options)

# Inspect outlines at the weights actually used, not only the file size.
original, reduced = TTFont(source), TTFont(target)
checks = []
for weight in [400, 550, 600, 700, 800]:
    source_glyphs = original.getGlyphSet(location={'wght': weight})
    target_glyphs = reduced.getGlyphSet(location={'wght': weight})
    for codepoint in unicodes:
        before = DecomposingRecordingPen(source_glyphs)
        after = DecomposingRecordingPen(target_glyphs)
        source_glyphs[original.getBestCmap()[codepoint]].draw(before)
        target_glyphs[reduced.getBestCmap()[codepoint]].draw(after)
        if before.value != after.value:
            raise AssertionError(f'Outline mismatch: {codepoint:X} at {weight}')
        checks.append({'codepoint': f'U+{codepoint:04X}', 'weight': weight, 'sameOutline': True})

css = ROOT / 'public/site.css'
text = css.read_text(encoding='utf-8')
text, count = re.subn(r'@font-face\s*\{[^}]*fonts/inter-(?:latin-ext|turkish)\.woff2[^}]*\}', "@font-face{font-family:'Inter';font-style:normal;font-weight:400 800;font-display:swap;src:url(fonts/inter-turkish.woff2) format('woff2');unicode-range:U+011E-011F,U+0130,U+015E-015F,U+20BA}", text)
if count != 1 and 'fonts/inter-turkish.woff2' not in text:
    raise AssertionError(f'Expected one font-face, found {count}')
css.write_text(text, encoding='utf-8')
html = ROOT / 'public/index.html'
text = html.read_text(encoding='utf-8')
if 'href="fonts/inter-turkish.woff2"' not in text:
    text = text.replace('<link as="font"', '<link rel="preload" href="fonts/inter-turkish.woff2" as="font" type="font/woff2" crossorigin="anonymous"/><link as="font"', 1)
html.write_text(text, encoding='utf-8')

result = {'sourceBytes': source.stat().st_size, 'subsetBytes': target.stat().st_size, 'outlines': checks, 'originalPreserved': source.exists()}
(ROOT / 'research/font-subset-proof.json').write_text(json.dumps(result, indent=2), encoding='utf-8')
print(json.dumps({'sourceBytes': result['sourceBytes'], 'subsetBytes': result['subsetBytes'], 'outlineChecks': len(checks)}))
