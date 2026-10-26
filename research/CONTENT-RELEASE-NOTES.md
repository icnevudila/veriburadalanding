# Final web-application handoff — 26 October 2026

This supersedes the earlier extension/installer notes.

- 18 authored pages including home; 16 canonical indexable URLs. The product is a web application. `/basla/` replaces `/eklenti-indir/`, with a permanent redirect in Vercel and the local server. There is no installer or ZIP download CTA.
- Hero has four continuous write/erase slogan variations with fixed geometry. Repeated player state messages no longer restart the sector word. Reduced-motion preference shows a stable complete phrase.
- 13 original SVG illustrations and the existing supplied emblem are used across product headers, industry records, connection inputs, CSV output, onboarding and content pages. Icons occupy fixed visual slots. The connection input text/icons are centered.
- Distinct page narratives: 40s walkthrough, field inspector, sales directory, agency website studies, local map, CSV composition, interactive term calendar, application workspace, brand diagram, help choices, message preview, three guide covers and article illustrations. Legal reading surfaces remain clear prose with a scroll-progress line.
- Demo onboarding has four authored phases lasting approximately 11.2 active seconds (1.8 seconds with reduced motion), then shows the first five illustrative records. The live path has no artificial minimum delay. Cancellation aborts request and scene; errors do not become fake successes. No real authentication or membership is simulated.
- The opaque footer logo movie was retired from markup and the release package. The original clean wordmark is displayed without a background rectangle. Historical source media is retained in the workspace.
- `destek@veriburada.com` was chosen at the user's direction. Mailbox provisioning/delivery is unverified. Contact opens the user's email composer, not a backend mail service.
- The legal pages are labelled drafts/noindex and excluded from sitemap pending legal operator identity and approved text. Payment, real search and membership are separate future application integrations. No fabricated customer testimonials or review schema were added.
- No push/deploy was performed. This folder is not a Git checkout. The release bundle contains runtime files only; generation sources remain in research/.

Build order:
1. py -3 research/build-brand-illustrations.py (only when illustration sources change)
2. py -3 research/build-landing.py
3. py -3 research/build-content-pages.py
4. py -3 research/prepare-release.py

Inner-page source: build-content-pages.py, content-articles.py, product-page-upgrade.py.
Root source: public/index.html + listed CSS/JS modules. brand-ui.css owns final icon slots.
The one-off app-brand-upgrade.py is a historical migration, not a recurring build step.

Evidence: app-pages-verification.json (36 layouts), app-final-a11y.json (final six focused states, no violations), slogan-verification.json (seven widths/four observed variants/stable repeated sector), app-onboarding-verification.json (four phases, first five, cancellation, mocked live path no delay, visible error), verification-bulk-studio.json (eight sectors/four widths), last-polish-verification.json (footer/centered diagrams/authored covers), seo-content-audit.json, release-app-verification.json. Earlier audit files may retain findings fixed in these newer focused checks. Live provider behavior, SEO rankings, payments, email and membership are not established by local tests.
