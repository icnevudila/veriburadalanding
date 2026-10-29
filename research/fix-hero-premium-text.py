from pathlib import Path
p=Path('public/hero-premium.js')
s=p.read_text(encoding='utf-8')
for before,after in {'<b>?</b>':'<b>✓</b>','Beyo?lu':'Beyoğlu','Kuaf?rler':'Kuaförler','haz?rl?yor':'hazırlıyor','??letme':'İşletme','Haz?r':'Hazır','haz?r':'hazır','?leti?im':'İletişim',' ? ?stanbul':' · İstanbul'}.items():
 s=s.replace(before,after)
p.write_text(s,encoding='utf-8')
p=Path('public/map-demo-runtime.js');s=p.read_text(encoding='utf-8').replace('applyEpisode();time=0;draw();','applyEpisode();time=Math.max(0,Math.min(duration-.01,Number(params.get("hero-time"))||0));draw();');p.write_text(s,encoding='utf-8')
