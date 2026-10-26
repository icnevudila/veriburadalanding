from pathlib import Path
p=Path('research/verify-onboarding.cjs');s=p.read_text().replace("await h.emulateMedia({reducedMotion:'reduce'});const text", "await h.emulateMedia({reducedMotion:'reduce'});await h.waitForTimeout(100);const text");p.write_text(s)
