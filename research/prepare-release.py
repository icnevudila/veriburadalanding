"""Allowlisted static assets + serverless API. No research, archives or credentials."""
from pathlib import Path
import shutil,json,hashlib,zipfile
root=Path(__file__).resolve().parent.parent
release=root/'dist'/'vercel-release';release.mkdir(parents=True,exist_ok=True)
assets=['index.html','landing.css','landing.js','brand-wordmark.webp','brand-emblem-small.webp','closing-map.svg','favicon.ico','istanbul-map-display-v4.webp','story-bulk-desktop.webp','story-bulk-mobile.webp','hero-bulk-mobile.webp','hero-bulk-desktop.webp','map-demo.html','map-demo-runtime.js','map-demo-base.js','map-demo-scene.js','map-demo-craft.css','fonts/inter-latin.woff2','fonts/inter-turkish.woff2','fonts/LICENSE.txt','vendor/leaflet.js','vendor/leaflet.css','vendor/LEAFLET-LICENSE.txt','vendor/ASSET-SOURCES.md']
assets += ['fonts/'+p.name for p in sorted((root/'public'/'fonts').glob('line-seed-*.woff2'))]
assets += ['fonts/LINE-SEED-OFL.txt']
assets+=['auth-links.js','brand-ui.js','onboarding-cinema.js','page-narratives.js','page-narratives.css','editorial.css','editorial.js','navigation.js','motion-core.js','onboarding.js','social-card.png','robots.txt','sitemap.xml','404.html']
assets += ['media/'+p.name for p in sorted((root/'public'/'media').glob('*.webp'))]
assets += ['media/icons/'+p.name for p in sorted((root/'public'/'media'/'icons').glob('*.svg'))]
for page in json.loads((root/'research'/'content-pages-manifest.json').read_text(encoding='utf-8')):
 name=page['slug']+'/index.html'
 if not (root/'public'/name).resolve().is_relative_to((root/'public').resolve()):raise RuntimeError('Page escaped public directory')
 assets.append(name)
assets += ['preparation-demo.html','preparation-demo.css','preparation-demo.js','preparation-desktop.webp','preparation-mobile.webp']
assets += ['landing-refinements.js','landing-refinements.css','brand-wordmark-ui.png','hero-direction.js','hero-direction.css','hero-premium.js','hero-premium.css']
files=[]
for name in assets:
 rel='public/'+name;target=release/rel;target.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(root/rel,target);files.append(rel)
for rel in ['api/free-search.js','api/onboarding-config.js','lib/onboarding-service.js','vercel.json']:
 target=release/rel;target.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(root/rel,target);files.append(rel)
package={'name':'veriburadalanding','private':True,'version':'1.0.0','engines':{'node':'22.x'},'scripts':{'start':'node preview.cjs'}}
(release/'package.json').write_text(json.dumps(package,indent=2)+'\n',encoding='utf-8');files.append('package.json')
server=(root/'research/dev-server.cjs').read_text(encoding='utf-8').replace("path.resolve(__dirname,'../public')","path.resolve(__dirname,'public')").replace("require('../api/","require('./api/").replace('process.env.PORT||4175','process.env.PORT||4176')
(release/'preview.cjs').write_text(server,encoding='utf-8');files.append('preview.cjs')
(release/'README.txt').write_text('VERI BURADA LANDING + ONBOARDING\n\nNode 22+: node preview.cjs\nOpen http://127.0.0.1:4176/\nNo npm installation is needed.\n\nThe API starts in explicit DEMO mode. It returns five illustrative records with an illustrative total. It does not search Google Maps.\nTo connect the app, configure FREE_SEARCH_MODE=live, FREE_SEARCH_API_URL, optional server-only FREE_SEARCH_AUTH_TOKEN, and APP_SIGNUP_URL. See INTEGRATION.md.\n\nVercel: deploy this folder to the authorized project. Static public assets and api/ Node functions are configured in vercel.json. No credentials are included.\n',encoding='utf-8');files.append('README.txt')
shutil.copy2(root/'research/ONBOARDING-INTEGRATION.md',release/'INTEGRATION.md');files.append('INTEGRATION.md')
shutil.copy2(root/'research/CONTENT-RELEASE-NOTES.md',release/'CONTENT-NOTES.md');files.append('CONTENT-NOTES.md')
# Release directory is generated: remove assets absent from this release's allowlist.
allowed=set(files+['asset-manifest.json'])
for candidate in release.rglob('*'):
 if candidate.is_file() and candidate.relative_to(release).as_posix() not in allowed:
  resolved=candidate.resolve()
  if not resolved.is_relative_to(release.resolve()):raise RuntimeError('Release path escaped workspace')
  candidate.unlink()
manifest=[{'path':f,'bytes':(release/f).stat().st_size,'sha256':hashlib.sha256((release/f).read_bytes()).hexdigest()} for f in files]
(release/'asset-manifest.json').write_text(json.dumps(manifest,indent=2),encoding='utf-8');files.append('asset-manifest.json')
archive=root/'dist/veriburada-landing.zip'
with zipfile.ZipFile(archive,'w',zipfile.ZIP_DEFLATED,compresslevel=6) as z:
 for rel in files:z.write(release/rel,Path('veriburada-landing')/rel)
print(json.dumps({'directory':str(release),'archive':str(archive),'files':len(files),'archiveBytes':archive.stat().st_size}))
