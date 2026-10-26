from pathlib import Path
p=Path('research/build-landing.py');s=p.read_text();s=s.replace("'connection-flow.css','final.css'","'connection-flow.css','final.css','motion-upgrade.css'").replace("'product-motion.js','connection-flow.js','final.js'","'product-motion-loop.js','connection-flow.js','final.js','motion-upgrade.js'");p.write_text(s)
