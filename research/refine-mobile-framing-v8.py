from pathlib import Path
p=Path('research/product-film-v8.html');s=p.read_text();s=s.replace(" const mobile=innerWidth<=1000,map=q('.map'),w=map.clientWidth,h=map.clientHeight,reset=", " const mobile=innerWidth<=1000,map=q('.map');const closeup=mobile?S((t-2.8)/.8)*(1-S((t-6.4)/.7)):0;map.style.height=mobile?(470+300*closeup)+'px':'';q('.sidebar').style.opacity=1-closeup;q('.map-search').style.opacity=1-closeup;const w=map.clientWidth,h=map.clientHeight,reset=")
p.write_text(s)
