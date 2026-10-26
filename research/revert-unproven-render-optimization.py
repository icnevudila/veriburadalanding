from pathlib import Path
p=Path('public/final.css');s=p.read_text(encoding='utf-8');start=s.index('/* Defer below-fold SVG/layout');end=s.index('html{',start);s=s[:start]+s[end:];p.write_text(s,encoding='utf-8')
p=Path('research/performance-delivery.json');p.rename('research/performance-content-visibility-invalid.json')
p=Path('research/performance-delivery.cjs');s=p.read_text();s=s.replace("await p.waitForTimeout(1000);runs.push", "await p.bringToFront();await p.screenshot({path:'research/performance-first-viewport.png'});await p.waitForFunction(()=>window.lab.lcp>0,{},{timeout:10000});await p.waitForTimeout(500);runs.push");p.write_text(s)
p=Path('README.md');s=p.read_text(encoding='utf-8').replace(', ekran altındaki karmaşık çizimler gerektiğinde render edilir','');p.write_text(s,encoding='utf-8')
