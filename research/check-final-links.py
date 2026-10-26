from bs4 import BeautifulSoup
from pathlib import Path
import urllib.request,json,concurrent.futures
s=BeautifulSoup(Path('public/index.html').read_text(encoding='utf-8'),'html.parser')
urls=sorted(set(a['href'] for a in s.select('a[href^="https:"]')))
def check(u):
 try:
  req=urllib.request.Request(u,method='HEAD',headers={'User-Agent':'Mozilla/5.0'})
  with urllib.request.urlopen(req,timeout=25) as r:return {'url':u,'status':r.status,'final':r.url}
 except Exception as e:return {'url':u,'error':str(e)}
with concurrent.futures.ThreadPoolExecutor(max_workers=6) as ex:rows=list(ex.map(check,urls))
Path('research/external-links-final.json').write_text(json.dumps(rows,indent=2))
print(json.dumps(rows))
