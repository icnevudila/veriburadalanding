from pathlib import Path
p=Path('public/hero-premium.js');s=p.read_text(encoding='utf-8')
s=s.replace('<span class="hp-location">Beyoğlu</span><i></i><strong','<span class="hp-location">İstanbul</span><i></i><span class="hp-district">Kadıköy</span><i></i><strong')
s=s.replace("find('.hp-location').textContent=place.city;", "find('.hp-location').textContent=place.city;find('.hp-district').textContent=place.district;")
p.write_text(s,encoding='utf-8')
