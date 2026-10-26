# V3 craft audit and work ledger

Previous goal turn: progress — authoritative files, custom image, film, map and browser evidence changed.

Actual objective: keep improving this landing to agency production quality, including visuals/art/motion, preserving user brand and Veriburada product story. No live publication authorized.

## Current gaps

1. V2 map tiles are too label-dense; remote map failed once. Need a deliberately styled local map visual that remains geographically grounded.
2. Olive/lime accents drifted from supplied mint #20C997. Restore explicit color roles.
3. Runtime builds/replaces major page sections after initial HTML, risking flashes and layout shifts. Render final composition in source.
4. Generic all-sections grid rhythm, micro UI copy below readable size, repeated decorative movement. Need stronger focal hierarchy and staged motion.
5. Logo has raster background/padding; do not invent a different mark. Improve presentation using original asset and careful compositing.
6. Existing QA covers interactions and overflow but misses error fallback, touch/focus, performance and accessibility contrast.

## Reference lock

Primary Shortimize: preserve clear split hero with substantial media, specific product benefits illustrated in cards, responsive-specific composition, larger close.
Secondary Linear: coherent UI detail, layered product scenes, focused motion; no dark theme borrowing outside the film/closing.
Brand user kit: forest #0F4C30, green #198754, mint #20C997, pale #EAF7F1; Inter; horizontal logo.

## Evidence plan

- Styled map uses an OSM read-only extract of central Beyoglu/Tophane, offline SVG with attribution; no unproven fake live counts.
- Compare current full-page, hero, feature and mobile captures with locked goals. Inspect individual sections at native scale, not only a shrunk full-page.
- Verify keyboard-only controls, motion preference, JavaScript-off content, 320–1920 widths, offline map, video range/seeking, resource sizes and contrast.
- Keep deploy/backend/payment work outside scope. Do not label user visual acceptance as passed.

Completion currently unproven; goal stays active.


## Current-state evidence after V3

- Local map SVG built from authoritative OSM extract; external requests disabled during verification without breaking the page. Fonts self-hosted.
- Final composition migrated to static HTML, controller consolidated into site.js. V1/V2 source archived.
- PNG logo background extracted through built-in Imagegen, original retained. Lossless WebP encoding verified RGBA-identical to the extracted PNG.
- Desktop and mobile movies, separate poster assets, local range support, source geographic labels aligned with the map; written film description added.
- verification-v3.json: 320/360/390/430/768/1024/1440/1920 overflow checks, sample sector and actual CSV download, keyboard tab flow, zoom control hit testing, workflow, FAQ, modal focus/Escape, seeking/pause and reduced-motion passed. No JS errors, missing content responses or external network requests in this run. Automated axe violations zero; incomplete manual-review items remain separate.
- Performance lab is not a production assertion: at 390px, CPU 4x, 1.6 Mbps and 70ms simulated latency, latest LCP about 5.5s and CLS about 0.007. Cold mobile render can improve further. Initial offscreen film poster request was removed. Mobile clip is about 1.15MB rather than desktop 5.44MB.

## Remaining work before claiming goal completion

- Improve constrained mobile first paint from measured evidence; inspect actual LCP candidate before choosing the next optimization.
- Review all sections at native desktop/tablet/mobile scale, including keyboard focus and image/film details. Do not substitute a shrunk full-page screenshot or axe alone for this review.
- Finish the manual-review items from the accessibility audit; actual user visual acceptance remains unclaimed.
- Source/cache cleanup only where it improves the delivered experience; no deployment or live backend work.

Goal remains active. This turn is progress, not a completion claim.
