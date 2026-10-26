from pathlib import Path
p=Path('public/site.css');s=p.read_text(encoding='utf-8').replace('url(map-istanbul-v2.png)','url(istanbul-map-display-v4.webp)');p.write_text(s,encoding='utf-8')
