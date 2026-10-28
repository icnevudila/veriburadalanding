# Clarity and conversion pass — 28 October 2026

## Reference and copy decisions
- Shortimize homepage and its public CSS inspected on 28 October. Main CSS declares LINE Seed JP. Keep Veri Burada forest-green palette; adapt concise copy, clear main action, subdued logos and large capability figures.
- Typeface: official Google Fonts LINE Seed JP 400/700 Latin and Latin-ext WOFF2 files, local hosting and preloads. OFL in public/fonts/LINE-SEED-OFL.txt. Sources: https://fonts.googleapis.com/css2?family=LINE+Seed+JP:wght@400;700&display=swap and https://github.com/google/fonts/tree/main/ofl/lineseedjp . No font files copied from Shortimize.
- Funnel: promise in hero; customer request and service handoff in film; feature explanation; concrete example output; pricing and FAQ; final start action. No made-up testimonials, usage totals, performance guarantees or endorsement counts.
- Logos supplied by the user: Bofe, Mesajify, Ayvazoğlu İnşaat. Presented under a neutral brand label, using original artwork and CSS monochrome treatment.
- Numbers describe available UI choices: 81 city options, five optional information fields, three research steps and one batch request. Not provider coverage or adoption metrics.

## Implemented
- Removed header start action and duplicate hero sector/typewriter line; kept the main first-list CTA.
- Shortened hero and film copy; city + sector query composition.
- Added request scene: submit selection -> Veri Burada processes -> existing discovery/bulk collection -> export. All illustrative, API unchanged.
- Removed the second manual collection click; only export shows a cursor action.
- Export action says Dışa aktar. Actual downloadable example remains CSV.
- Reduced film text: removed pin labels, contact sublines, repeated status/progress labels; enlarged query, business names and export action. Same legible layout across eight sectors, mobile framing up to 1100 px.
- Stabilized both desktop grid tracks and the maximum-width/height of all typewriter phrases, including after fonts load and resize.
- Removed in-film example/copyright corners; each embedded map has a linked source attribution immediately below the media and one example-preview label. Standalone demo keeps its own source notice. https://www.openstreetmap.org/copyright .
- Updated all four reduced-motion/loading posters to match the new city query and export label.
- Increased essential product-card text sizes and reduced repeated microcopy.

## Validation
verify-clarity-funnel.cjs: 320/390/768/1440 responsive layout, main CTA opens onboarding, no duplicate hero/header action, three supplied logos, city query, request/processing phases, export wording, stable desktop video geometry and no page errors.
verify-clarity-readability.cjs: local font use, no clipped slogans or page overflow, all eight mobile business-list layouts; axe report in clarity-readability.json.
check-content-seo.py: 18 HTML pages, 16 sitemap URLs, no broken internal references.
Release rebuilt with bundled fonts and logos; no push or deployment.

## Boundaries
Real product/backend integration remains outside this landing implementation. No claim of live/fresh source data added. No customer quote cards were published: the supplied reference is a logo strip. Separate portrait art studies were not inserted into production layout.

## Follow-up craft pass
- Hero film uses compact hero-specific UI; the longer walkthrough retains larger inspection fields.
- One request scene -> short branded processing bridge -> discovery -> readable business details -> batch list -> explicit exported state. Hero loop: 32 authored seconds played at 2x (about 16 wall-clock seconds). Only export shows a cursor action.
- Pins settle smoothly; selected halos are subdued. Detail card and result list are sequenced rather than competing. Popup placement uses actual rendered dimensions instead of outdated fixed sizes.
- Hero leads with the concrete task, then brand variations. Copy answers selection, collection, intended audience and example output progressively.
- Logo hover restores supplied brand colors (Bofe is monochrome and darkens). No invented endorsement count.
- Capability counters animate once to exact configured values and respect reduced-motion preference.
- Removed repeated visible scenario badges; the overall example-preview and actual sample-data disclosures remain.
- verify-hero-craft.cjs covers storyboard chapters, exact counter completion, logo hover and responsive overflow with no page errors. Proof frames: research/hero-craft-proof.
- Legal/source notices and live backend separation are unchanged. No deployment.

## Compact hero summaries and logo marquee
- Hero contact card now presents the business identity and three collected field types instead of a tall stack of illustrative contact values. The longer walkthrough keeps its detailed inspection view.
- Mobile results are a 420/720-width right-hand panel, leaving the map visible. Hero list rows use numbers matching the map pins, with compact spacing and the same clear export action.
- Infinite logo strip uses two equal groups of six items, duplicated nodes hidden from assistive technology. It pauses on hover and when onboarding/navigation/global motion pause applies. Reduced-motion mode shows only the three unique originals, without movement. Brand color hover remains.
- verify-brand-marquee.cjs passed at 320/390/1440: equal groups, sufficient strip coverage, actual motion, hover pause and reduced-motion fallback. Storyboard and eight-sector readability checks also passed.


## Account entry handoff
Header Hemen başla opens the account-choice dialog. Menu includes Giriş yap and Kaydol. All primary list CTAs now use data-auth-signup; old onboarding is not invoked by these buttons. Configure public/auth-links.js with the two supplied HTTPS destinations and rebuild. URLs remain empty until supplied; no invented application route. Verified at 320/390/608/1440, including Escape/focus return, menu close, no overflow, static page axe checks, and a test-only configured signup navigation. Actual authentication is outside this landing.
