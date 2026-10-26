from pathlib import Path
p=Path('README.md');old=p.read_text(encoding='utf-8');archive=Path('research/README-before-final.md')
if not archive.exists():archive.write_text(old,encoding='utf-8')
p.write_text('''# Veri Burada landing

Yerel önizleme: http://127.0.0.1:4173/

Başlatma: `py -3 research/serve.py`. Build veya npm kurulumu gerektirmez. Video bölüm geçişleri için byte-range desteklenir.

## Güncel teslim

- `public/index.html`: tamamlanmış statik kompozisyon.
- `public/site.css`, `craft.css`, `final.css`: temel, marka ve son düzen sistemi.
- `public/site.js`: harita, sektör, indirme, menü, sekmeler, rehber, FAQ ve video davranışları.
- `public/product-motion.js/css`: sonlu özellik kartı animasyonları.
- `public/connection-flow.js/css`: logoda birleşen bütünleşik SVG akışı; telefon/tablet için dikey kompozisyon.
- `public/final.js`: mobil paket seçimi ve sektörle eşleşen çıktı tablosu.
- `dist/veriburada-landing.zip`: yalnızca kullanılan 26 çalışma varlığı ve yerel önizleme sunucusunu içeren teslim paketi. Eski görsel denemeleri içermez.

Teslim paketini açtıktan sonra `py -3 preview.py`; paket önizlemesi http://127.0.0.1:4174/ adresindedir. `asset-manifest.json` dosyasında boyutlar ve SHA-256 kayıtları vardır.

## Sayfa akışı

Hero ve çalışan temsili keşif → bütünleşik marka SVG akışı → üç ürün yeteneği → ürün filmi ve açılabilir kurulum rehberi → sektörle eşleşen CSV önizlemesi → dört süre paketi → FAQ → son CTA ve footer.

Aynı anlatımı tekrarlayan bağımsız ihracat kartı kaldırıldı, kurulum ayrıntıları açılabilir rehberde toplandı. Mobilde 1/3/6/12 ay seçimi tek fiyat kartını değiştirir. JavaScript kapalıysa dört plan ve statik SVG görünür.

## Marka ve medya

Kullanıcının orijinal logosu ve #0F4C30 / #198754 / #20C997 / #EAF7F1 paleti. Fontlar yerel Inter. Shortimize birincil hareket/ürün sunumu referansıdır; varlıkları canlı sayfada kullanılmaz. Görsel kararlar `research/FINAL-DIRECTION.md`, `MOTION-DIRECTION-V5.md`, `SVG-FLOW-DIRECTION.md` içinde.

Harita: gerçek Beyoğlu/Tophane OpenStreetMap verisinden çizilen yerel görsel. Görünür attribution korunur. Google Maps ekran kaydı veya çalışan veri API entegrasyonu iddiası yoktur. Temsili işletme adları kullanılır; gerçek telefon veya web sitesi uydurulmaz.

Ürün filmleri: `product-v5-desktop.mp4` (1440×900), `product-v5-mobile.mp4` (960×1200), 30 fps, 12 saniye, ayrı kompozisyonlar. Kaynak `research/render-product-v5.cjs`. SVG akışı 9 saniyede tamamlanır; duraklat/devam et/tekrar izle ve azaltılmış hareket desteklenir.

Reddedilen maket/3B şehir varlıkları yalnızca araştırma geçmişidir; güncel HTML ve teslim paketi bunları kullanmaz. Kaynak/lisanslar `public/vendor/ASSET-SOURCES.md` ve font/vendor lisans dosyalarında.

## Kontrol kanıtları

- `research/acceptance-final.json`: sekiz genişlik (320–1920), gerçek CSV indirme, sektör/çıktı eşleşmesi, klavye sekmeleri, üç rehber sahnesi, modal odağı/Escape, video bölümleri, azaltılmış hareket, dört mobil paket, menü, bozuk varlık/bağlantı ve JavaScript kapalı kontrolü.
- `research/package-smoke.json`: teslim klasörü ayrı HTTP sunucusunda açıldı; tablet menüsü, dikey mobil oynatım ve 206 byte-range doğrulandı.
- `research/verification-svg-flow.json`: SVG zaman çizelgesi, duraklat/devam et/tekrar, azaltılmış hareket ve yerleşimler.
- `research/verification-media-v5.json`: masaüstü ve mobil film/meta, 0/4/8 saniye bölümleri, bitiş ve modal.
- `research/external-links-final.json`: sekiz mevcut veriburada.com hedefi salt okunur HTTP kontrolünde 200 döndü. Bu, satın alma/hesap/eklenti işlev kanıtı değildir.
- `research/delivery-*-*.png`: normal tarayıcı viewport görüntüleri ve tüm sayfa kaydı. 320, 390, 768 ve 1440 genişliklerde görsel inceleme yapıldı.

Otomatik axe taramasında masaüstü/mobil ihlal yok. SVG/film gibi görsellerin kontrastı, metin içi bağlantı ve sessiz film altyazısı maddeleri manuel inceleme olarak ayrı tutulur. Yazılı film anlatımı vardır; tam WCAG sertifikası iddia edilmez. Gerçek iOS/Safari cihaz testi yapılmadı.

## Doğrulanan içerik ve kapsam

Fiyatlar ve kurulum 25 Ekim 2026 tarihinde https://www.veriburada.com/pricing ve /eklenti-indir üzerinden yeniden kontrol edildi. 1/3/6/12 ay: ₺499/₺999/₺1.499/₺2.499. Aylık karşılıklar toplamın aya bölünmesiyle hesaplandı. Mevcut sayfadaki 24 saat aktivasyon ve iade koşulu açıkça gösterilir.

Yerel tasarım/uygulama teslimidir. Canlıya yayın, DNS, ödeme, eklenti, hesap ve backend değişikliği yapılmadı. CTA'lar mevcut gerçek sitenin ilgili sayfalarına gider. Müşteri referansı ve kullanım başarısı uydurulmadı. Kullanıcı görsel kabulü ayrıca değerlendirilir.
''',encoding='utf-8')
