from pathlib import Path
p=Path('research/verify-onboarding.cjs');s=p.read_text();s=s.replace("const report={flows:[],states:[],hero:[]};", "const origin=process.env.BASE_URL||'http://127.0.0.1:4173';const report={origin,flows:[],states:[],hero:[]};")
s=s.replace("'http://127.0.0.1:4173/'","origin+'/'").replace("'http://127.0.0.1:4173/api/free-search'","origin+'/api/free-search'")
p.write_text(s)
