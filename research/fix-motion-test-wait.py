from pathlib import Path
p=Path('research/verify-feature-motion-v5.cjs');s=p.read_text();s=s.replace("await p.emulateMedia({reducedMotion:'reduce'});out.reduced", "await p.emulateMedia({reducedMotion:'reduce'});await p.waitForTimeout(100);out.reduced");p.write_text(s)
