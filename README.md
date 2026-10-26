# Veri Burada landing

Current source: `C:/Users/TP2/Documents/veriburada`. Local design and integration preparation; no new push or deployment in this revision. The user reported the prior version was pushed through another workflow. This folder currently has no Git repository.

## Preview and build

Node 22, Python 3 with BeautifulSoup (local build only). No npm installation is required.

```powershell
py -3 research/build-landing.py
$env:PORT=4173
node research/dev-server.cjs
```

Open http://127.0.0.1:4173/. The server provides static public files plus the onboarding API. CSS/JS source changes must be bundled with `build-landing.py`.

## Current motion production

The visual direction is the user-approved geographic pin scene and the original forest/mint brand. All examples are illustrative. Real local OSM geometry, the original user logo and local Inter are used. No Shortimize footage, invented customer metrics or actual Google search footage is shipped.

- **Hero:** 26 seconds per sector; 8 sectors. Search → sequential pins → one bulk collection command → groups of records → CSV. Processed count 0/2/4/5. The business preview is read-only; there are no individual add-to-list actions. Sector layouts and discovery order differ.
- **Product walkthrough:** a separate 40-second architecture-office example with a workspace step bar, region/sector settings, bulk collection, field inspection and export. Mobile inspection uses a bottom detail sheet linked to the same first record.
- **Connection:** 14-second fixed-field SVG composition. Input text remains still; route progress reaches the transparent emblem and matching output fields.
- **Sales / agency / local:** three independent compositions and timelines. Batch clinic research and contact columns; web-field availability comparison; chosen geographic area, sequential pins and one local preview.
- **Collector / contact:** 14-second grouped collection and 12-second field-resolution profile. Missing example rating is explicitly unavailable.
- **Setup:** package/toolbar, region fields and CSV receipt have independent selected-step timelines. The existing actual setup link and sample download remain working.
- **CSV preview:** 13-second column, batch and export composition; the real downloadable CSV uses the same chosen sample records.
- **Closing:** 24-second authored pin depth/cadence with a quiet text area; original road-aligned streams remain.
- **Brand signature:** user-supplied logo formation, deliberately retimed to retain a readable hold and soft loop seam. Original header and central logos remain unchanged.
- **Onboarding:** coherent choices and step transitions, a search-to-records request drawing, and response-driven results. No fake request percentage or forced loading delay.

No overlay play/pause/enlarge/next buttons were added. Reduced motion uses readable static states/posters. Offscreen, background and onboarding visibility suspend scene timelines. Generic sliding headline reveals were removed.

### Sources

`public/motion-core.js`: visibility-aware timeline coordinator. `public/scene-studio.js/css`: individual authored section compositions. `public/connection-flow.js`: fixed-route SVG composition. `public/map-demo.html`, `map-demo-base.js`, `map-demo-scene.js`, `map-demo-runtime.js`, `map-demo-craft.css`: isolated geographic animation. `public/demo-player.js`: iframe lifecycle. `public/landing.css/js`: runtime bundles. The source lists are authoritative in `research/build-landing.py`.

`research/MOTION-STUDIO-PLAN.md` records the approved scene scope. The prior source is preserved in `research/baseline-motion-20261026/`. Older V8/V9 films, scripts and test files are research history, not current runtime evidence.

## Integration boundary

The onboarding API starts in explicit **demo** mode: 17 illustrative results, only the first 5 returned, 12 remaining. It does not query Google Maps or create real memberships. The application is not connected yet. Server-side preview capping, selection validation and upstream error handling are implemented.

For application connection, configure `FREE_SEARCH_MODE=live`, `FREE_SEARCH_API_URL`, optional server-only `FREE_SEARCH_AUTH_TOKEN`, and `APP_SIGNUP_URL`. See `research/ONBOARDING-INTEGRATION.md`. Application auth, abuse protection and permanent quota enforcement belong to the actual app integration.

## Verification

- `research/verification-bulk-studio.json`: sequential discovery, one bulk command, grouped counts, 8 sectors, distinct walkthrough, pause/resume and reduced motion.
- `research/studio-keyframes.json` and `research/studio-keyframes/`: 82 section keyframes at 390/1440, plus hero/walkthrough, brand and onboarding captures. Contact and setup geometry were corrected after visual inspection.
- `research/axe-studio.json`: all three audience scenes and product/contact/collector sections in mobile/desktop readable states.
- `research/verification-onboarding.json`: actual local demo request, five-record cap, editing, cancellation, retry, empty/error and unconnected membership states.
- `research/acceptance-final.json`: 8 widths, sample CSV download, keyboard tabs, guide, menu, FAQ, plans, image loading, no-JS fallback and page axe scan.

Check the JSON result contents; presence alone is not a pass. Automated checks do not replace visual acceptance or establish live/deployed behavior. No real-device Safari test or production field performance result is claimed.

## Release package

```powershell
py -3 research/prepare-release.py
```

`dist/vercel-release/` is the allowlisted deployable folder; `dist/veriburada-landing.zip` is its archive. `asset-manifest.json` contains file sizes and SHA-256 values. No research footage, archived attempts or credentials are included. Package preview: `node dist/vercel-release/preview.cjs`, port 4176. Vercel target from the user is Mesajify/veriburadalanding; publishing is a separate action.
## Authored content upgrade — 26 October 2026

The release now includes 17 static inner pages + the home page. Build order:

1. `py -3 research/build-landing.py`
2. `py -3 research/build-content-pages.py`
3. `py -3 research/prepare-release.py`

`research/build-content-pages.py` + `research/content-articles.py` are the source for inner-page HTML. The root page is authored in `public/index.html`. `public/premium.css/js` are bundled; inner pages use the shared navigation, onboarding and editorial assets. `public/social-card.png` is rendered from the local code-native social-card.html composition during visual verification.

Public stock photos are downloaded locally in media/. Sources: Unsplash images photo-1555396273-367ea4eb4db5 (restaurant), photo-1517248135467-4c7edcad34c4 (dining), photo-1497366754035-f200968a6e72 (office), photo-1486406146926-c627a92ad1ab (architecture). They illustrate examples, never actual customers, staff or premises.

Contact address is configured as destek@veriburada.com at the user's request. The mailbox has not been provisioned or verified. The contact composer opens mailto and never reports successful message delivery. The previous checkout redirected to a paused Shopier store and the old ZIP link could not be verified. Pricing CTAs preserve the chosen duration and route to contact; the install CTA requests the file by email. Replace these when current authorized destinations are supplied.

Legal pages contain factual implementation notices. They are visibly marked drafts, noindex, and excluded from the sitemap until the legal operator identity and approved terms are supplied. Do not present these as final legal policies. No fake customers, testimonials, review schema, uptime claims or invented performance numbers have been added. Demo business profiles and illustrative website previews carry an example label.

Verification: research/content-verification.json, seo-content-audit.json, postman-filled-preview.json (local demo only), release manifest. Postman request with @file selected binary/file mode on this installed CLI; passing Get-Content -Raw supplied the intended JSON body. No hosted collection/workspace writes were made.

Nothing has been pushed or deployed during this upgrade. Production API, membership, payment, mailbox delivery and current installer still require their separate live integrations.

Final content checks: `research/content-final-checks.json` contains the final 16 automated accessibility states with zero violations, inner-page onboarding/logo/Escape checks, selected-license preservation, proper 404 and page-URL redirects. `research/content-verification.json` preserves the earlier full 36-page/layout run and its initial contrast findings; those findings were corrected and retested in the final report. `research/verification-bulk-studio.json` was rerun after content changes: four widths, eight sectors, sequential discovery, single bulk command and 0/2/4/5 progress all passed. Postman local endpoint verification passed four assertions; unit tests passed 11/11. These are local/demo results.

## Final web-app handoff (supersedes the extension notes above)

See research/CONTENT-RELEASE-NOTES.md. The product now uses a web-app narrative throughout. /basla/ replaces /eklenti-indir/. There is no installer CTA. The original transparent wordmark replaced the opaque footer clip. The final custom-brand placements, centered flow inputs, authored blog covers, four-slogan typewriter and four-stage demo onboarding are in the current build. All inner pages load the illustration/onboarding helpers explicitly. Live requests have no demo delay. The deployment archive is the website distribution, not an extension installer.

Current validation and outstanding real integrations are listed in CONTENT-RELEASE-NOTES.md. No push or deployment has been done. The developer preview on port 4173 remains running.
