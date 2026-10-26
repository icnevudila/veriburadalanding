from pathlib import Path
from bs4 import BeautifulSoup
p=Path('public/index.html');s=p.read_text(encoding='utf-8');s=s.replace('Toplanıyor</span></div><div class="table-head">','3 örnek kayıt</span></div><div class="table-head">');s=s.replace('<span>Toplanıyor</span><i class="mini-spinner"></i>','<span>Toplandı</span><i>✓</i>');p.write_text(s,encoding='utf-8')
