from pathlib import Path
from bs4 import BeautifulSoup
P=Path('public');p=P/'index.html';s=BeautifulSoup(p.read_text(encoding='utf-8'),'html.parser')
def image(name,cls='brand-illustration',size=64):
 return BeautifulSoup(f'<img class="{cls}" src="/media/icons/{name}.svg" width="{size}" height="{size}" alt="" aria-hidden="true"/>','html.parser').img
def mark(size=36):return BeautifulSoup(f'<img class="product-mark" src="/brand-emblem-small.webp" width="{size}" height="{size}" alt="" aria-hidden="true"/>','html.parser').img
for sel in ['.collector-app-icon','.panel-logo','.install-symbol']:
 for el in s.select(sel):el.clear();el.append(mark())
for el in s.select('.install-browser-toolbar b'):el.clear();el.append(mark(22))
for sel,kind in [('.contact-profile-icon','architecture'),('.local-business>i','cafe'),('.output-file-icon','csv'),('.workflow-file-receipt>span','csv'),('.install-file>i','webapp')]:
 for el in s.select(sel):el.clear();el.append(image(kind))
for i,el in enumerate(s.select('.benefit-strip>div')):
 for svg in el.select('svg'):svg.decompose()
 el.insert(0,image(['map','research','csv'][i],size=44))
for group in s.select('.flow-input'):
 old=group.find('svg',recursive=False)
 if not old:continue
 node=group.get('data-node');x=float(old['x'])-7;y=float(old['y'])-7
 # Preserve the card, title and route anchors; replace only its old glyph tile.
 tile=old.find_previous_sibling('rect')
 if tile and tile.get('width')=='35':tile.decompose()
 asset={'map':'map','business':'architecture','contact':'contact'}[node]
 new=s.new_tag('image',attrs={'href':f'/media/icons/{asset}.svg','x':str(x),'y':str(y),'width':'42','height':'42','aria-hidden':'true'})
 old.replace_with(new)
for el in s.select('.collector-result>b'):el.clear();el.append(image('architecture',size=40))
for el in s.select('.sales-record>i'):el.clear();el.append(image('clinic',size=40))
for el in s.select('.demo-badge'):el.clear();el.append(mark(27));el.append('Veri Burada')
h=s.select_one('.hero h1');h.clear();h['class']=['hero-slogan'];h.append(BeautifulSoup('<span class="sr-only">İşletmeler orada. Veri burada. Bölge ve sektöre göre toplu işletme araştırması.</span><span class="slogan-first" aria-hidden="true">İşletmeler orada.</span><span class="slogan-second" aria-hidden="true">Veri burada.</span>','html.parser'))
# Evolve the approved design into a web-app narrative without introducing fake login.
replacements={
'Veri Burada tarayıcı eklentisi':'Veri Burada web uygulaması',
'Veri Burada eklentisi':'Veri Burada uygulaması',
'Veri Burada’u indirip kurulum adımlarını izleyin ve hesabınızı oluşturun.':'Ücretsiz önizlemeyle başlayın. Uygulama bağlantısı hazır olduğunda hesabınızla araştırmanıza devam edin.',
'Veri Burada’yı indirip kurulum adımlarını izleyin ve hesabınızı oluşturun.':'Ücretsiz önizlemeyle başlayın. Uygulama bağlantısı hazır olduğunda hesabınızla araştırmanıza devam edin.',
'Lisansınız satın alımdan sonra 24 saat içinde aktifleştirilir; e-posta ile bilgilendirilirsiniz.':'Üyelik ve ödeme bağlantıları uygulama yayınıyla birlikte eklenecek.',
'Kurulum adımlarını inceleyin':'Başlangıç rehberini inceleyin',
'Evet. Veri Burada, Windows ve macOS üzerinde desteklenen tarayıcılarda çalışır. Kurulum sayfasında Chrome, Edge, Brave ve Opera için bilgi bulabilirsiniz.':'Veri Burada tarayıcıdan kullanılacak bir web uygulaması olarak hazırlanıyor. Bu önizlemeyi mobil ve masaüstünde inceleyebilirsiniz.',
'Mac bilgisayarda kullanabilir miyim?':'Telefondan da kullanabilir miyim?',
'Windows & macOS':'Tarayıcınızda',
'Windows ve macOS':'Mobil ve masaüstü',
'Kurulumdan ilk listeye, adım adım.':'Arama ekranından ilk listeye, adım adım.',
'Kurulum rehberi':'Başlangıç rehberi',
'Eklentiyi indir ↗':'Uygulamayı keşfedin ↗',
'Veri Burada eklentisini indirin.':'Çalışma alanınızı açın.',
'Veri Burada tarayıcı eklentisiyle':'Veri Burada ile',
'İşletme keşif yardımcınız':'Web çalışma alanınız',
'Kurulum paketi':'Bölge ve sektör seçimi',
'EKLENTİ':'UYGULAMA',
'Veri Burada uygulaması.':'Veri Burada çalışma alanınız.',
'Kurulum rehberini inceleyin':'Başlangıç rehberini inceleyin',
}
for text in list(s.find_all(string=True)):
 if text.parent.name in ['script','style']:continue
 new=str(text)
 for a,b in replacements.items():new=new.replace(a,b)
 if new!=str(text):text.replace_with(new)
for a in s.select('a[href="/eklenti-indir/"]'):a['href']='/basla/'
for el in s.select('[data-step="0"] h3'):el.string='Çalışma alanınızı açın.'
for el in s.select('[data-step="0"] p'):el.string='Bölgeniz ve sektörünüzle ilk aramayı hazırlayın.'
el=s.select_one('.install-file strong');el.string='Araştırmanız'
s.select_one('.install-browser-panel strong').string='Çalışma alanınız'
s.select_one('.install-browser-panel small').string='İlk aramanızı hazırlayın'
s.select_one('.install-browser-panel>span').string='Bölge → İşletme türü → Liste'
for el in s.select('.obsolete-install'):el.decompose()
p.write_text(str(s),encoding='utf-8')
# Illustrative industry portraits for the existing eight-sector map animation.
p=P/'map-demo-runtime.js';js=p.read_text(encoding='utf-8')
js=js.replace("el.querySelector('.avatar').textContent=names[i][0];", "el.querySelector('.avatar').innerHTML='<img alt=\"\" src=\"/media/icons/'+(['hair','cafe','clinic','restaurant','architecture','hotel','gym','garage'][episode])+'.svg\">';")
js=js.replace("stage.dataset.layout=walkthrough?'directory':s.layout;", "stage.dataset.layout=walkthrough?'directory':s.layout;stage.dataset.industry=['hair','cafe','clinic','restaurant','architecture','hotel','gym','garage'][episode];")
p.write_text(js,encoding='utf-8')
p=P/'map-demo-scene.js';js=p.read_text(encoding='utf-8').replace("q('.business .avatar').textContent=names[0][0];", "q('.business .avatar').innerHTML='<img alt=\"\" src=\"/media/icons/'+(stage.dataset.industry||'architecture')+'.svg\">';")
p.write_text(js,encoding='utf-8')
print('Applied original emblem, custom illustration placements and web-app positioning.')
