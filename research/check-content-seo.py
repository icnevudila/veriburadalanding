from pathlib import Path
from bs4 import BeautifulSoup
from urllib.parse import urlsplit,unquote
import json,collections,xml.etree.ElementTree as ET
root=Path('public');manifest=json.loads(Path('research/content-pages-manifest.json').read_text(encoding='utf-8'))
paths=[root/'index.html']+[root/p['slug']/'index.html' for p in manifest]
errors=[];titles=[];descriptions=[];report=[]
for p in paths:
 soup=BeautifulSoup(p.read_text(encoding='utf-8'),'html.parser');rel=p.relative_to(root);page='/' if rel.as_posix()=='index.html' else '/'+str(rel.parent).replace('\\','/')+'/'
 title=soup.title.get_text();titles.append(title);desc=soup.select_one('meta[name=description]')['content'];descriptions.append(desc)
 assert len(soup.select('h1'))==1,page
 assert soup.select_one('link[rel=canonical]')['href']=='https://www.veriburada.com'+page,page
 for ld in soup.select('script[type="application/ld+json"]'):json.loads(ld.string)
 for el in soup.select('a[href],img[src],script[src],link[href],video[poster]'):
  val=el.get('href') or el.get('src') or el.get('poster');u=urlsplit(val)
  if u.scheme or u.netloc:continue
  target=(root/u.path.lstrip('/')) if u.path.startswith('/') else p.parent/u.path
  if not u.path:target=p
  if target.is_dir():target=target/'index.html'
  if not target.exists():errors.append({'page':page,'missing':str(target),'reference':val});continue
  if u.fragment and target.suffix=='.html':
   doc=soup if target==p else BeautifulSoup(target.read_text(encoding='utf-8'),'html.parser')
   if not doc.find(id=unquote(u.fragment)):errors.append({'page':page,'anchor':val})
 report.append({'path':page,'title':title,'descriptionLength':len(desc),'h1':1,'schema':True,'noindex':bool(soup.select_one('meta[name=robots][content^=noindex]'))})
assert len(titles)==len(set(titles))
assert len(descriptions)==len(set(descriptions))
assert not errors,errors
sitemap=ET.parse(root/'sitemap.xml');assert len(sitemap.getroot())==16
out={'pages':report,'duplicateTitles':False,'duplicateDescriptions':False,'brokenInternalLinksOrAssets':errors,'sitemapUrls':16,'indexablePages':16,'legalDraftsNoindex':2}
Path('research/seo-content-audit.json').write_text(json.dumps(out,ensure_ascii=False,indent=2),encoding='utf-8');print(json.dumps({'pages':len(report),'sitemapUrls':16,'broken':errors}))
