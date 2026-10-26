from pathlib import Path
s=Path('research/performance-final.cjs').read_text(encoding='utf-8').replace('research/performance-final.json','research/performance-delivery.json')
Path('research/performance-delivery.cjs').write_text(s,encoding='utf-8')
