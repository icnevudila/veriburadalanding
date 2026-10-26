from pathlib import Path
s=Path('research/verify-onboarding.cjs').read_text().splitlines()[2]
print(s[430:700])
p=Path('research/verify-onboarding.cjs');s=p.read_text().replace("await p.locator('#ob-sector-input').fill('');","await p.locator('#ob-sector-input').fill('a');await p.locator('#ob-sector-input').fill('');");p.write_text(s)
