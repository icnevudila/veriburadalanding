from pathlib import Path
from bs4 import BeautifulSoup
import shutil

ROOT=Path(__file__).resolve().parent.parent
archive=ROOT/'research/archive-v2'
archive.mkdir(exist_ok=True)
for file in ['index.html','style.css','premium.css','app.js','premium.js']:
    shutil.copy2(ROOT/'public'/file,archive/file)
soup=BeautifulSoup((ROOT/'research/v2-rendered.html').read_text(encoding='utf-8'),'html.parser')
for script in soup.find_all('script'):script.decompose()
for link in soup.find_all('link',rel='stylesheet'):
    if link.get('href')!='vendor/leaflet.css':link.decompose()
style=soup.new_tag('link',rel='stylesheet',href='site.css');soup.head.append(style)
for src in ['vendor/leaflet.js','site.js']:
    tag=soup.new_tag('script',src=src);tag['defer']='';soup.head.append(tag)
for meta in soup.select('meta[name="theme-color"]'):meta['content']='#0F4C30'
for link in soup.find_all('link'):
    if 'fonts.google' in link.get('href',''):link.decompose()

map_el=soup.select_one('#discovery-map');map_el.clear();map_el.attrs={'id':'discovery-map','class':['geo-map'],'aria-label':'Beyoğlu ve Tophane özel harita gösterimi'}
soup.select_one('.discovery-search small').string='ÖRNEK SEKTÖRÜ DENEYİN'
soup.select_one('.discovery-search strong').replace_with(BeautifulSoup('<div class="sector-input"><span>İstanbul</span><i>/</i><select id="demo-sector-select" aria-label="Örnek sektör seçin"><option value="architecture">Mimarlık ofisleri</option><option value="cafe">Kafeler</option><option value="clinic">Diş klinikleri</option></select></div>','html.parser'))
soup.select_one('.map-search-button')['aria-label']='Örnek işletmeleri göster'
soup.select_one('.panel-stats').clear();soup.select_one('.panel-stats').append(BeautifulSoup('<span><i class="live-dot"></i> Temsili örnek kayıtlar</span><b><span id="business-count">3</span> işletme</b>','html.parser'))
soup.select_one('.panel-title small').string='Beyoğlu · Mimarlık ofisleri'
soup.select_one('.geo-coordinate span').string='41.0325° N · 28.9850° E'
soup.select_one('.scene-caption>span:last-child').string='BEYOĞLU / İSTANBUL'
soup.select_one('.scene-mini-tag').contents[-1].replace_with('Seçin. Keşfedin. Listenize alın.')
soup.select_one('.demo-caption').string='Özel harita çizimi · Temsili işletme kayıtları'
old=soup.select_one('.panel-export')
button=soup.new_tag('button',type='button',attrs={'class':'panel-export','id':'download-demo','aria-label':'Temsili işletme listesini CSV olarak indir'})
button.append(BeautifulSoup('<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5"/></svg><span>Örnek CSV’yi indir</span><span class="export-progress"></span>','html.parser'))
old.replace_with(button)
live=soup.new_tag('span',attrs={'class':'sr-only','role':'status','id':'demo-status','aria-live':'polite'});soup.select_one('.hero-visual').append(live)
demo=soup.select_one('#demo-play');a=soup.new_tag('a',href='#urun-filmi',attrs={'class':demo.get('class'),'id':'demo-play'})
for c in list(demo.contents):a.append(c.extract())
demo.replace_with(a)
film=soup.select_one('.film-section');film['id']='urun-filmi';film['aria-label']='Veriburada ürün anlatımı'
for video in soup.find_all('video'):
    video['poster']='video-poster-v2.png';video['controls']='';video['preload']='none'
for panel in soup.select('.panel-record'):
    panel['style']='';panel['class']=['panel-record']
for record in soup.select('.panel-record'):
    fields=record.select('.record-fields>span')
    if fields:fields[-1].contents[-1].replace_with(' Beyoğlu')
for p in soup.select('.reveal'):p['class']=[c for c in p.get('class',[]) if c!='visible']
soup.select_one('.header')['class']=['header']
nav=soup.select_one('.header nav');nav['id']='main-navigation'
toggle=soup.select_one('.menu-toggle');toggle['aria-controls']='main-navigation';toggle['aria-expanded']='false';toggle['aria-label']='Menüyü aç'
for i,tab in enumerate(soup.select('[data-audience]')):
    tab['id']=f'audience-tab-{i}';tab['aria-controls']='audience-content';tab['tabindex']='0' if i==0 else '-1';tab['aria-selected']='true' if i==0 else 'false'
panel=soup.select_one('.list-card');panel['id']='audience-content';panel['role']='tabpanel';panel['aria-labelledby']='audience-tab-0'
soup.select_one('#audience-title').clear();soup.select_one('#audience-title').append(BeautifulSoup('Doğru işletmelerle<br>başlayan bir satış süreci.','html.parser'))
soup.select_one('#audience-copy').string='Hedef bölgenizi ve sektörünüzü seçin. Bir sonraki görüşmeniz için işletmeleri tek listede toplayın.'
for i,step in enumerate(soup.select('.step')):
    step['class']=['step']+(['active'] if i==0 else []);step['aria-pressed']='true' if i==0 else 'false'
soup.select_one('#step-heading').clear();soup.select_one('#step-heading').append(BeautifulSoup('Yeni bağlantılara açılan<br>küçük bir eklenti.','html.parser'))
for e in soup.select('.demo-progress>div,.demo-extension'):e.attrs.pop('style',None)
for d in soup.select('.faq-list details'):d.attrs.pop('open',None)
soup.select_one('.faq-list details')['open']=''
for tag in soup.select('.data-row small'):tag.string='Beyoğlu'
for el in soup.select('.film-chapters button'):
    el.attrs.pop('style',None);el['class']=['current'] if el.get('data-chapter')=='0' else [];el['aria-pressed']='true' if el.get('data-chapter')=='0' else 'false'
for el in soup.select('.film-control'):el['aria-label']='Ürün filmini oynat';el['class']=['film-control']
# Semantic control labels for viewport zoom.
for i,btn in enumerate(soup.select('.geo-zoom button')):btn['aria-label']='Örnek haritayı '+('yakınlaştır' if i==0 else 'uzaklaştır')
no=soup.new_tag('noscript');no.append(BeautifulSoup('<style>.reveal{opacity:1;transform:none}.geo-map{background-image:url(istanbul-map-art.svg)}.film-control,.film-chapters,.map-search-button,.geo-zoom,.menu-toggle,.panel-export{display:none}.header nav{display:flex!important}.audience-tabs{display:none}</style>','html.parser'));soup.head.append(no)
(ROOT/'public/index.html').write_text(str(soup),encoding='utf-8')
css=(ROOT/'public/style.css').read_text(encoding='utf-8')+'\n'+(ROOT/'public/premium.css').read_text(encoding='utf-8')
# Restore supplied mint and pale roles where V2 had drifted toward lime.
replacements={'#b7dc8c':'#20c997','#c3e5a2':'#a2ebd5','#b7da96':'#79e1c1','#c4e5a7':'#20c997','#c3e5a2':'#20c997','#c9eaa4':'#a8ecda','#c6dabb':'#b7dfd0','#f0f4e9':'#eef6f0','#f0f4e9':'#eef6f0','#f0f5ef':'#edf6f0','#eef5e8':'#eaf7f1','#edf3e8':'#edf6f0','#eaf0e4':'#e8f2eb','#f7faf2':'#f6faf7','#f9fbf3':'#f6faf7','#fbfcf7':'#fbfdfb','#f7f9f0':'#f5faf6','#f0f4e9':'#edf6f0'}
for old,new in replacements.items():css=css.replace(old,new)
(ROOT/'public/site.css').write_text(css,encoding='utf-8')
print('Static final composition migrated; old source retained in research/archive-v2')
