# Veriburada landing

Yerel önizleme: **http://127.0.0.1:4173/**

Başlatma: `py -3 research/serve.py` — video bölüm geçişleri için byte-range destekli statik sunucu.

## Güncel kaynak

- `public/index.html`: son kompozisyon doğrudan HTML içinde; açılışta JavaScript ile bölüm inşa edilmez.
- `public/site.css`: temel düzen ve responsive kurallar.
- `public/craft.css`: marka, okunabilirlik ve son görsel düzenlemeler.
- `public/site.js`: menü, klavye erişimli sekmeler, kullanım adımları, örnek sektör seçimi, CSV indirme, yerel harita ve video kontrolleri.
- `public/fonts/`: Türkçe karakterleri içeren yerel Inter değişken fontu; font lisansı bu klasörde.

Build veya npm kurulumu gerektirmez. Son HTML eski `app.js` / `premium.js` dosyalarını yüklemez; önceki sürümler araştırma/karşılaştırma için korunmuştur.

## Görsel ve hareket sistemi

Kullanıcı marka kiti: #0F4C30 / #198754 / #20C997 / #EAF7F1, Inter, yatay logo. Birincil referans Shortimize'ın ürün odaklı bölüm yapısı; yardımcı referans Linear'ın tutarlı arayüz ayrıntıları. Görseller Veriburada'nın harita → işletme → liste anlatımına göre hazırlanmıştır.

### Özel İstanbul haritası

`public/istanbul-map-art.svg`: Beyoğlu/Tophane bölgesinin küçük bir OpenStreetMap veri kesitinden 4.268 bina izi ve 1.267 yol parçası kullanılarak çizildi. Yerel Leaflet ile görüntülenir; harita tile servisi veya API anahtarı istemez. Geografik görsel bina/işletme kaydı iddiası taşımaz. İşletme kayıtları ayrı, temsili demo verileridir.

İlk üretim kaynağı: `research/build-map-art.py`. Güncel gösterim aşağıdaki V4 dosyalarını kullanır. Görünür OpenStreetMap attribution korunur.

### Ürün filmi — güncel harita yönü

Kullanıcının son yönlendirmesiyle maket/üç boyutlu şehir anlatımı kaldırıldı. Güncel film doğrudan gerçek Beyoğlu/Tophane yol ve mahalle haritasıyla başlar; kamera yaklaşırken pinler coğrafyaya bağlı kalır, işletme kartı açılır ve kayıtlar listeye geçer. Harita verisi OpenStreetMap'tir; bir Google Maps ekran kaydı veya Google veri API entegrasyonu olarak sunulmaz.

Güncel V5 film: `public/product-v5-desktop.mp4`, 1440×900, 30 fps, 12 saniye. Mobil film `public/product-v5-mobile.mp4`, 960×1200 dikey kompozisyondur; masaüstü videosunun kırpılması değildir. Posterler `product-v5-desktop-poster.jpg` ve `product-v5-mobile-poster.jpg`. Kaynak: `research/render-product-v5.cjs`. Tüm işletme kayıtları temsili; gerçek telefon numarası uydurulmaz.

Shortimize'ın canlı MP4 kaynakları ve sahneleri incelendikten sonra iç başlık kartları kaldırıldı; harita, işletme kartı ve oluşan tablo aynı ürün arayüzünde kesintisiz bağlandı. Karar kaydı: `research/MOTION-DIRECTION-V5.md`. Referans videolar sadece research klasöründedir; landing bunları kullanmaz.

`public/product-motion.js` ve `public/product-motion.css`: dört özellik kartında sonlu arayüz animasyonları. Liste satırları, otomasyon düğümleri, iletişim alanları ve CSV satırları sırayla oluşur. Yeniden oynatma düğmeleri vardır; azaltılmış hareket tercihinde statik son durum gösterilir.

### Bütünleşik SVG bağlantı sahnesi

`#baglanti-akisi`: soldaki bölge/işletme/iletişim kartları ortadaki resmi amblemde birleşir; sağda işletme listesi ve CSV oluşur. Tek bir SVG koordinat sistemi üzerinde çizgiler ve veri paketleri senkron ilerler. Masaüstü yatay; 1000 px ve altında ayrı dikey kompozisyon. 9 saniyelik sonlu animasyon; duraklat/devam et/tekrar izle kontrolleri, ekran dışında durma, azaltılmış hareket ve JavaScript kapalı statik gösterim içerir.

Kaynaklar: `research/build-svg-flow.py`, `public/connection-flow.js`, `public/connection-flow.css`. Görsel karar: `research/SVG-FLOW-DIRECTION.md`. Tarayıcı kontrolü: `research/verification-svg-flow.json`; görüntüler: `research/svg-flow-1440.png`, `research/svg-flow-390.png`.

Güncel harita master'ı: `public/istanbul-map-v4.svg`; ekran gösterimi `public/istanbul-map-display-v4.webp`. Gerçek sokak etiketleri ve doğal kıyı/park renkleri aynı OSM kesitinden gelir. Üretim kaynağı: `research/build-map-v4.py`.

### Marka varlıkları

`public/brand-transparent-v3.webp`: kullanıcının yatay logosunun arka planı çıkarılmış sürümü. Asıl bitmap `public/brand-logo.png` korunur. İşlem notu: `research/LOGO-EXTRACTION-V3.md`. Site ikonu `public/favicon.ico`; çıkarım notu `research/FAVICON-EXTRACTION.md`. Bunlar resmi vektör master dosyaları değildir.

Önceki `city-diorama-v2.png` ve `map-to-list-v2/v3` filmleri reddedilen görsel denemelerin arşividir; güncel HTML bunları kullanmaz. Bu maket yönünü sonraki çalışmalarda yeniden kullanmayın. Son görsel karar: `research/DIRECTION-MAP-V4.md`.

## Davranış ve kanıt

`research/verify-v3.cjs`: sekiz ekran genişliği, kapalı dış ağ, yerel harita, sektör değişimi, gerçek CSV dosyası indirme, klavye sekmeleri, modal odağı/Escape, video oynatım/seeking, azaltılmış hareket ve JavaScript kapalı içerik kontrolü.

En son sonuç: `research/verification-v3.json`. Görsel değerlendirme için `research/v3-final-*.png`. Otomatik axe taraması tam WCAG uyumluluk onayı değildir; `needsManualReview` ayrı tutulur. Yerel ölçümler canlı ortam performans garantisi değildir.

Güncel V5 kontrolleri: `research/verification-v5.json` (sekiz genişlik, CSV/etkileşimler, axe taramasında sıfır ihlal; manuel inceleme maddeleri ayrı), `research/verification-media-v5.json` (masaüstü/mobil film, bölüm geçişleri, modal), `research/verification-feature-motion-v5.json` (dört kartın animasyonları, tekrar oynatma, azaltılmış hareket). Görsel kontrol: `research/media-v5-film-*.png`, `research/motion-v5-bento-desktop.png`, `research/motion-v5-list-mobile.png`.

Yeni harita yönünün medya kontrolü: `research/verification-map-v4.json`. Masaüstü ve mobil kaynak boyutları, 0/4/8 saniye bölüm geçişleri, filmin sonunda durması, modal oynatımı/Escape, eski maket dosyalarının yüklenmemesi ve taşma kontrolü doğrulandı. Yeni tarayıcı görüntüleri: `research/map-v4-hero-*.png`, `research/map-v4-film-*.png`, `research/map-v4-modal-*.png`.

## Kapsam

Yerel landing çalışmasıdır. Satın alma, eklenti indirme, örnek liste ve şirket bağlantıları mevcut veriburada.com sayfalarına gider. Eklenti/backend/ödeme akışı değiştirilmedi; canlıya yayın yapılmadı. Fiyatlar incelenen siteden alınmıştır. Müşteri yorumu, kullanım istatistiği ve gerçek iletişim bilgisi uydurulmadı. Demodaki CSV açıkça temsili kayıtlar içerir.

Kullanıcı görsel kabulü, Safari ve gerçek cihaz kontrolü ayrı doğrulama kapsamlarıdır. Kaynaklar ve lisanslar: `public/vendor/ASSET-SOURCES.md`.
