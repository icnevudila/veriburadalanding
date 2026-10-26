from pathlib import Path
p=Path('research/check-package.cjs');p.write_text(p.read_text().replace('product-v5-','product-v8-'))
