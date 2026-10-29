# Asset sources

Leaflet 1.9.4: https://github.com/Leaflet/Leaflet — BSD-2-Clause; full license is in LEAFLET-LICENSE.txt. Library JS/CSS downloaded from unpkg.com/leaflet@1.9.4/dist/.

Current geographical art: https://www.openstreetmap.org/copyright — a read-only OSM API bounding-box extract (28.975,41.025,28.995,41.04), obtained on 2026-10-25. Map data © OpenStreetMap contributors, ODbL. Local SVG styling and label curation are project work. Visible attribution is retained on the hero map and inside the product film. The current page makes no requests to a map tile provider.

Inter variable font: Google Fonts https://fonts.google.com/specimen/Inter ; https://github.com/rsms/inter — SIL Open Font License. Latin and a local Turkish subset are served from public/fonts; full license accompanies them. Original Latin Extended source is retained. Turkish subset outline checks are recorded in research/font-subset-proof.json.

UI SVG icons in the active landing source files: project-specific inline geometric drawings, not downloaded Lottie assets.

User brand files: supplied by the user in this chat. Original bitmap logos retained.

Integrated connection-flow SVG: original project-specific paths, business/list/file cards, icons and typography. Central emblem uses brand-emblem-display.webp, a 256 px lossless WebP export of the existing user-brand-derived brand-emblem.png; the SVG paths and cards are code-native. No third-party Lottie or illustration asset is used in this scene.

brand-transparent-v3.png: built-in Imagegen background extraction from the user's horizontal bitmap; original preserved. Prompt and method in research/LOGO-EXTRACTION-V3.md.

Current map assets: istanbul-map-v4.svg and istanbul-map-display-v4.webp. The desktop product-v8-desktop.mp4 and portrait product-v8-mobile.mp4 animate this geographical art with project-specific sample business records and overlays. These are illustrative product films, not recordings of a working data integration. Their sequence and the looping native feature animations were informed by Shortimize's hero and scale-benefit films, reviewed under research/shortimize only. No Shortimize media is shipped or requested by the page.

Archived and rejected: city-diorama-v2.png, generated using the built-in image_gen tool. It and the earlier city films are not used by the current page. Do not reintroduce this direction. Full original prompt remains in research/IMAGE-PROMPT-V2.md for provenance only.

Unused MapLibre bundle files and old raster map captures were evaluated during research; the current page uses Leaflet with one local image overlay. CARTO was rejected after visible API-key placeholder tiles; it is not a live map source. No third-party Lottie files were needed.

Display-size brand exports: brand-wordmark.webp (640 px wide) and brand-emblem-small.webp (144 px) are lossless WebP exports resized from the already preserved brand extraction assets. They are used in the current landing and package to avoid transferring full-resolution originals for small UI placements.

Closing light trails use the exact longest road paths from closing-map.svg and are rendered in the same coordinate system as the OSM base layer. Product V8 films are authored from research/product-film-v8.html, with the project map and brand; UI is illustrative, phone values are masked, and .example domains are not real contact data.

V9 product/hero films: original local HTML/CSS motion composition, source research/product-film-v9.html. Uses user-provided brand assets, the same locally rendered OSM map and licensed local Inter. No Shortimize footage is shipped. Four example businesses and masked fields are illustrative.

Current native map animation: public/map-demo.html and map-demo-runtime.js, original code using the previously attributed local OSM map and Inter. No Shortimize footage. Footer brand reveal: user-supplied gemini_generated_video_0b29d767.mp4; duplicate 7503ea52 has the same SHA-256 E856834CEFC2FB62FC8521CE801431A61E7E082DFB23971B75AF527CE547B49B. Transcoded without audio, no external generation or paid API call.

### Local imagery and website studies (26 October 2026)

Unsplash-hosted public stock photographs, downloaded and optimized locally for website mockups/editorial articles. Not represented as actual customers, team members, or Veri Burada premises:
- media/restaurant.webp: https://images.unsplash.com/photo-1555396273-367ea4eb4db5
- media/dining.webp: https://images.unsplash.com/photo-1517248135467-4c7edcad34c4
- media/office.webp: https://images.unsplash.com/photo-1497366754035-f200968a6e72
- media/architecture.webp: https://images.unsplash.com/photo-1486406146926-c627a92ad1ab

Miniature restaurant website layouts are original code-native design studies. Business names, phone values, ratings and .example domains are illustrative and labelled as examples. They are not customer endorsements.

Hero geography refresh (2026-10-29): four local WebP maps are rendered by research/render-hero-city-maps.py from small OpenStreetMap API 0.6 bounding-box data extracts for Kadikoy, Cankaya, Alsancak and Nilufer. Bounding boxes, road counts and original point locations are recorded in research/hero-city-maps.json. Styling is project work; map data is copyright OpenStreetMap contributors, ODbL. This uses vector data rather than scraping tiles. The landing serves local images and does not call a remote map or tile provider. Business records and pin associations are illustrative, not verified businesses at those positions. Source attribution remains visible.
