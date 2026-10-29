import re
from pathlib import Path

# 1. Update public/index.html
index_p = Path('public/index.html')
content = index_p.read_text(encoding='utf-8')

# Remove sc-map-credit from service films
content = re.sub(r'<a class="sc-map-credit"[^>]*>.*?</a>\s*</div>', '</div>', content)
content = re.sub(r'<a class="sc-map-credit"[^>]*>.*?</a>\s*', '', content)

# Update footer
footer_target = '<span>© <span id="year">2026</span> Veriburada.</span>'
footer_replacement = '<span>© <span id="year">2026</span> Veriburada. <small class="footer-osm-note">Harita verileri <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">© OpenStreetMap</a> katkıcıları</small></span>'
if footer_target in content:
    content = content.replace(footer_target, footer_replacement)
    print('Footer updated in public/index.html')
else:
    print('Note: footer_target not found or already replaced')

index_p.write_text(content, encoding='utf-8')
print('public/index.html updated successfully')

# 2. Update public/service-films.css
sf_p = Path('public/service-films.css')
if sf_p.exists():
    sf_txt = sf_p.read_text(encoding='utf-8')
    sf_txt = re.sub(r'\.sc-map-credit\{[^}]*\}', '.sc-map-credit{display:none!important}', sf_txt)
    sf_p.write_text(sf_txt, encoding='utf-8')
    print('public/service-films.css updated')

# 3. Update public/map-demo.html
md_p = Path('public/map-demo.html')
md_txt = md_p.read_text(encoding='utf-8')
# Remove standalone-map-source
md_txt = re.sub(r'\s*<a class="standalone-map-source"[^>]*>.*?</a>\s*', '', md_txt)
# Ensure hidden in styles
md_txt = md_txt.replace('.copyright,.example{position:absolute;bottom:9px;z-index:12;font-size:9px;color:#5a7964;background:#ffffffe0;border-radius:4px;padding:3px 6px}.copyright{left:13px}', '.standalone-map-source,.copyright{display:none!important}.example{position:absolute;bottom:9px;z-index:12;font-size:9px;color:#5a7964;background:#ffffffe0;border-radius:4px;padding:3px 6px;right:13px}')
md_p.write_text(md_txt, encoding='utf-8')
print('public/map-demo.html updated')

# 4. Update public/map-demo-craft.css
mdc_p = Path('public/map-demo-craft.css')
mdc_txt = mdc_p.read_text(encoding='utf-8')
mdc_txt = re.sub(r'\.standalone-map-source\{[^}]*\}(\.embedded-demo \.standalone-map-source\{display:none\})?', '.standalone-map-source,.copyright{display:none!important}', mdc_txt)
mdc_p.write_text(mdc_txt, encoding='utf-8')
print('public/map-demo-craft.css updated')

# 5. Add .footer-osm-note styling to public/site.css
site_p = Path('public/site.css')
site_txt = site_p.read_text(encoding='utf-8')
if '.footer-osm-note' not in site_txt:
    site_txt += '\n.footer-osm-note{font-size:10px;opacity:.65;margin-left:8px;font-weight:400;display:inline-block;letter-spacing:normal}.footer-osm-note a{color:inherit;text-decoration:underline}.footer-osm-note a:hover{opacity:1}\n'
    site_p.write_text(site_txt, encoding='utf-8')
    print('public/site.css updated with .footer-osm-note')

# 6. Also add .footer-osm-note to public/landing-refinements.css to ensure it applies regardless of bundling
lr_p = Path('public/landing-refinements.css')
lr_txt = lr_p.read_text(encoding='utf-8')
if '.footer-osm-note' not in lr_txt:
    lr_txt += '\n.footer-osm-note{font-size:10px;opacity:.65;margin-left:8px;font-weight:400;display:inline-block;letter-spacing:normal}.footer-osm-note a{color:inherit;text-decoration:underline}.footer-osm-note a:hover{opacity:1}\n'
    lr_p.write_text(lr_txt, encoding='utf-8')
    print('public/landing-refinements.css updated with .footer-osm-note')

# 7. Update research helper templates
for rf in ['research/home-services-section.html', 'research/service-films-crafted.html', 'research/monthly-comparison.html']:
    p = Path(rf)
    if p.exists():
        txt = p.read_text(encoding='utf-8')
        txt = re.sub(r'\s*<a class="sc-map-credit"[^>]*>.*?</a>\s*', '', txt)
        p.write_text(txt, encoding='utf-8')
        print(f'{rf} updated')

# 8. Update research/build-content-pages.py
bcp = Path('research/build-content-pages.py')
bcp_txt = bcp.read_text(encoding='utf-8')
bcp_txt = bcp_txt.replace('<small class="map-credit">© OpenStreetMap contributors · Harita örnektir.</small>', '')
bcp.write_text(bcp_txt, encoding='utf-8')
print('research/build-content-pages.py updated')

for path in ['public/film-render-v10.html', 'public/film-render-v9.html']:
    p = Path(path)
    if p.exists():
        txt = p.read_text(encoding='utf-8')
        txt = txt.replace('<div class="copyright">© OpenStreetMap contributors</div>', '')
        txt = txt.replace('<div class="map-copyright">© OpenStreetMap contributors</div>', '')
        txt = txt.replace('<div class="frame-credit">© OpenStreetMap contributors</div>', '')
        p.write_text(txt, encoding='utf-8')
        print(f'{path} cleaned')
