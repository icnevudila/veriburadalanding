from pathlib import Path
from bs4 import BeautifulSoup
import re

# 1. Update public/index.html
index_p = Path('public/index.html')
content = index_p.read_text(encoding='utf-8')

icon_snippet = '''<link rel="icon" href="/favicon.ico" sizes="48x48"/>
<link rel="icon" href="/icon-48.png" type="image/png" sizes="48x48"/>
<link rel="icon" href="/icon-96.png" type="image/png" sizes="96x96"/>
<link rel="icon" href="/icon-192.png" type="image/png" sizes="192x192"/>
<link rel="apple-touch-icon" href="/apple-touch-icon.png"/>
<link rel="manifest" href="/manifest.json"/>'''

content = re.sub(r'<link[^>]*rel="icon"[^>]*>', icon_snippet, content)
index_p.write_text(content, encoding='utf-8')
print('public/index.html icon links updated')

# 2. Update research/build-content-pages.py
bcp_p = Path('research/build-content-pages.py')
bcp_txt = bcp_p.read_text(encoding='utf-8')
old_icon = '<link rel="icon" href="/favicon.ico?v=brand3">'
new_icons = '<link rel="icon" href="/favicon.ico" sizes="48x48"><link rel="icon" href="/icon-48.png" type="image/png" sizes="48x48"><link rel="icon" href="/icon-96.png" type="image/png" sizes="96x96"><link rel="icon" href="/icon-192.png" type="image/png" sizes="192x192"><link rel="apple-touch-icon" href="/apple-touch-icon.png"><link rel="manifest" href="/manifest.json">'
if old_icon in bcp_txt:
    bcp_txt = bcp_txt.replace(old_icon, new_icons)
    bcp_p.write_text(bcp_txt, encoding='utf-8')
    print('research/build-content-pages.py icon links updated')
else:
    print('Note: old_icon not found in build-content-pages.py')
