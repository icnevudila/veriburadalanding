# Brand icon extraction

Source: user's horizontal logo after background extraction, public/brand-transparent-v3.png. Built-in Imagegen edit, no CLI generation.

Prompt: Background extraction / precise crop for an existing brand asset. Use ONLY the small green map-pin-and-circuit emblem at the LEFT of this logo as the edit target. Remove the entire 'veri burada' wordmark and all surrounding empty margin. Keep the original emblem exactly as supplied: same pin shape, same circuitry, same shades of green, same proportions, same central open circle, no redesign and no extra decoration. Center the isolated original emblem in a square transparent canvas with only a small 5 percent safe margin. This is the brand favicon/icon asset, not a new logo design. No text, no letters, no background, no shadow. Output a clean crisp transparent square PNG.

Output: public/brand-emblem.png; lossless format encoding public/favicon.webp. RGBA equality between the generated PNG and encoded WebP checked. The original supplied logo is preserved; the extracted raster is not a vector master.
