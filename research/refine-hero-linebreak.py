from pathlib import Path
p=Path('public/index.html');s=p.read_text(encoding='utf-8').replace('İlk 5’i ücretsiz görün.</span>','İlk 5 sonuç ücretsiz.</span>');p.write_text(s,encoding='utf-8')
