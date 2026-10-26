# Veri Burada landing

Yerel önizleme: http://127.0.0.1:4173/

Başlatma (PowerShell): `$env:PORT=4173; node research/dev-server.cjs`. Node 22 gerekir; npm kurulumu gerekmez. API dahil çalışır. Kaynak CSS/JS değiştiğinde `py -3 research/build-landing.py` ile iki çalışma dosyasını yeniden oluşturun. Video bölüm geçişleri için byte-range desteklenir.

## Güncel teslim

- `public/index.html`: tamamlanmış statik kompozisyon.
- `public/landing.css` ve `landing.js`: sayfanın yüklediği birleştirilmiş çalışma dosyaları.
- `public/site.css`, `craft.css`, `final.css`: temel, marka ve son düzen kaynakları.
- `public/site.js`: harita, sektör, indirme, menü, sekmeler, rehber, FAQ ve video davranışları.
- `public/product-motion-loop.js`, `product-motion.css` ve `motion-upgrade.css`: döngüde çalışan ürün kartı animasyonları.
- `public/connection-flow.js/css`: logoda birleşen bütünleşik SVG akışı; telefon/tablet için dikey kompozisyon.
- `public/final.js`: mobil paket seçimi ve sektörle eşleşen çıktı tablosu.
- `dist/veriburada-landing.zip`: 22 çalışma varlığı, iki API uç noktası, bağlantı katmanı ve Node önizleme sunucusunu içeren teslim paketi. Eski görsel denemeleri içermez.

Teslim paketini açtıktan sonra `node preview.cjs`; paket önizlemesi http://127.0.0.1:4176/ adresindedir. `asset-manifest.json` dosyasında boyutlar ve SHA-256 kayıtları vardır.

## Sayfa akışı

Haritadaki dört işletmenin listeye dönüştüğü döngülü hero → bütünleşik marka SVG akışı → üç ürün yeteneği → ürün filmi ve açılabilir kurulum rehberi → sektörle eşleşen CSV önizlemesi → dört süre paketi → FAQ → son CTA ve footer.

Aynı anlatımı tekrarlayan bağımsız ihracat kartı kaldırıldı, kurulum ayrıntıları açılabilir rehberde toplandı. Mobilde 1/3/6/12 ay seçimi tek fiyat kartını değiştirir. JavaScript kapalıysa dört plan ve statik SVG görünür.

## Marka ve medya

Kullanıcının orijinal logosu ve #0F4C30 / #198754 / #20C997 / #EAF7F1 paleti. Fontlar yerel Inter. Shortimize birincil hareket/ürün sunumu referansıdır; varlıkları canlı sayfada kullanılmaz. Görsel kararlar `research/FINAL-DIRECTION.md`, `MOTION-DIRECTION-V5.md`, `SVG-FLOW-DIRECTION.md` içinde.

Harita: gerçek Beyoğlu/Tophane OpenStreetMap verisinden çizilen yerel görsel. Görünür attribution korunur. Google Maps ekran kaydı veya çalışan veri API entegrasyonu iddiası yoktur. Temsili işletme adları kullanılır; gerçek telefon veya web sitesi uydurulmaz.

Ürün filmleri: `product-v8-desktop.mp4` (1440×900), `product-v8-mobile.mp4` (960×1200), 30 fps, 12 saniye, ayrı kompozisyonlar. Kaynak `research/render-film-v8.cjs ve product-film-v8.html`. SVG akışı, ürün kartları ve filmler kullanıcı isteğiyle döngüde çalışır. Kapanış haritasında gerçek yol çizgileri boyunca 20 ışık izi akar. Hareket ekran dışında ve arka planda durur; azaltılmış hareket tercihine uyar. Footer içinde tüm animasyonları duraklatma düğmesi vardır; tekrar izleme düğmeleri kaldırıldı.

Reddedilen maket/3B şehir varlıkları yalnızca araştırma geçmişidir; güncel HTML ve teslim paketi bunları kullanmaz. Kaynak/lisanslar `public/vendor/ASSET-SOURCES.md` ve font/vendor lisans dosyalarında.

## Kontrol kanıtları

- `research/acceptance-final.json`: sekiz genişlik (320–1920), gerçek CSV indirme, sektör/çıktı eşleşmesi, klavye sekmeleri, üç rehber sahnesi, modal odağı/Escape, video bölümleri, azaltılmış hareket, dört mobil paket, menü, bozuk varlık/bağlantı ve JavaScript kapalı kontrolü.
- `research/package-smoke.json`: teslim klasörü ayrı HTTP sunucusunda açıldı; tablet menüsü, dikey mobil oynatım ve 206 byte-range doğrulandı.
- `research/verification-motion-v8.json`: yeni döngüler, yol ışıkları, genel duraklatma, özel video kontrolleri ve azaltılmış hareket.
- `research/verification-motion-v8.json`: masaüstü ve mobil film/meta, 0/4/8 saniye bölümleri, bitiş ve modal.
- `research/external-links-final.json`: sekiz mevcut veriburada.com hedefi salt okunur HTTP kontrolünde 200 döndü. Bu, satın alma/hesap/eklenti işlev kanıtı değildir.
- `research/delivery-*-*.png`: normal tarayıcı viewport görüntüleri ve tüm sayfa kaydı. 320, 390, 768 ve 1440 genişliklerde görsel inceleme yapıldı.

Otomatik axe taramasında masaüstü/mobil ihlal yok. SVG/film gibi görsellerin kontrastı, metin içi bağlantı ve sessiz film altyazısı maddeleri manuel inceleme olarak ayrı tutulur. Yazılı film anlatımı vardır; tam WCAG sertifikası iddia edilmez. Gerçek iOS/Safari cihaz testi yapılmadı.

## Doğrulanan içerik ve kapsam

Fiyatlar ve kurulum 25 Ekim 2026 tarihinde https://www.veriburada.com/pricing ve /eklenti-indir üzerinden yeniden kontrol edildi. 1/3/6/12 ay: ₺499/₺999/₺1.499/₺2.499. Aylık karşılıklar toplamın aya bölünmesiyle hesaplandı. Mevcut sayfadaki 24 saat aktivasyon ve iade koşulu açıkça gösterilir.

Açılış logosu ve amblem ekran boyutuna göre hafifletildi, CSS/JS istekleri birleştirildi. Güncel yavaş ağ laboratuvar ölçümü `research/performance-delivery.json` içindedir; gerçek saha Core Web Vitals sonucu değildir.

Yerel tasarım/uygulama teslimidir. Canlıya yayın, DNS, ödeme, eklenti, hesap ve backend değişikliği yapılmadı. Başlayın CTA’ları beş aşamalı onboarding açar. Gerçek arama ve üyelik uygulaması henüz bağlı değildir; örnek mod açıkça belirtilir. Müşteri referansı ve kullanım başarısı uydurulmadı. Kullanıcı görsel kabulü ayrıca değerlendirilir.

## Son görsel yönlendirme

Kullanıcı geri bildirimiyle üç kutulu otomasyon görseli kaldırıldı. Yerine arama bölgesi, ilerleme çubuğu, adres/iletişim alanları ve kayıtlarla daha ayrıntılı bir MapBot sahnesi geldi. Film, tarayıcı/eklenti paneli ve CSV çalışma alanı ile yeniden üretildi; gerçek ürünün ekran kaydı değildir. Telefonlar maskeli, web adresleri reserved .example alanındadır. Modal oynatıcı yerel bir zaman çizgisi ve duraklatma kontrolü kullanır. Karar kaydı: research/UPGRADED-MOTION-DIRECTION.md.

Mevcut eklenti sayfası HTTP 200 dönse de oradaki herkese açık ZIP hostu bu ortamda DNS hatası verdi. Eklentinin indirilip çalıştırıldığı doğrulanmadı; landing CTA mevcut kurulum sayfasına gider.

V8 mobil filminde işletme bilgisi sahnesine kamera yaklaşımı vardır; küçük ekranda tüm masaüstü arayüzünü küçültmek yerine seçilen kart büyütülür. Otomasyon kartı ve büyük SVG tekrar düğmesi kullanmadan döngüde çalışır. Eski sonlu animasyon testleri araştırma geçmişidir; güncel davranış verification-motion-v8.json ile kayıtlıdır.

## Güncel açılış ve onboarding

Shortimize referans kilidi: `research/SHORTIMIZE-HERO-LOCK.md`. Açılış kaynakları `public/hero-cinema.css/js`. Mobilde başlık, büyük hareketli harita, bilgi simgeleri, kısa açıklama ve tek ana CTA sıralanır. İlk beş ücretsiz sonuç ana başlık değildir. Haritadaki dört temsili işletme aynı adlarla listeye dönüşür. Ekran dışında durur; genel duraklatma ve azaltılmış hareket desteklenir. Eski etkileşimli harita CSV bölümündeki açılır örnektedir.

Onboarding: kullanım amacı → işletme türü → şehir/ilçe → alan seçimi → kontrol/arama. Sunucu yalnızca ilk beş kaydı döndürür. Bağlantı sözleşmesi ve ortam değişkenleri `research/ONBOARDING-INTEGRATION.md` dosyasındadır. Varsayılan örnek mod gerçek Google araması veya gerçek üyelik oluşturmaz. Uygulamanın kimlik doğrulama, hız sınırı ve kalıcı kota kontrolleri ayrıca bağlanmalıdır.

Kanıtlar: `research/hero-cinema-verification.json`, `verification-onboarding.json`, `axe-onboarding.json` ve 11 servis testi (`node research/onboarding-service.test.cjs`). Test kapsamı görsel kabul veya canlı uygulama entegrasyonu iddiası değildir. Vercel hedefi yalnızca Mesajify/veriburadalanding; mevcut bağlantıda proje erişimi ve CLI oturumu henüz doğrulanamadı, yayın yapılmadı.

## V9 film revizyonu

Kullanıcı önceki videoların görsel kalitesini reddetti; V8 ve ilk SVG hero güncel sunum değildir. Güncel hero ve ürün filmi 16 saniyelik V9 kompozisyonudur. Harita kartları → logoda veri akışı → harita/işletme/listeden oluşan çalışma alanı → CSV tablosu → eşleşen dönüş. Üç ayrı çıktı: 1440×900 masaüstü, 1080×780 telefon hero, 960×1200 dikey ürün filmi. Telefon hero mantıksal 720×520 sahnede ayrıca tasarlandı. Kaynak `research/product-film-v9.html`, render `research/render-film-v9.cjs`, yön `research/MOTION-V9-DIRECTION.md`. Film kontrol bölümleri 0/6/11 saniyedir.

Üç video da döngülü. Hero üzerinde duraklatma ve büyük açma kontrolleri bulunur. Onboarding veya modal açıldığında, sekme arka plana gittiğinde ve azaltılmış hareket seçildiğinde hero durur. Azaltılmış harekette başlangıçta video yerine görsel kullanılır. İşletmeler temsili, telefonlar maskeli ve web adresleri .example alanındadır. Gerçek uygulama kaydı değildir. Görsel kalite kabulü otomatik testlerden ayrı değerlendirilir.

Güncel film davranış kanıtı `research/verification-film-v9.json`; V8 film testleri tarihsel kayıttır.

Son medya teslimi: product-v9-desktop-final.mp4, product-v9-mobile-final.mp4, product-v9-hero-mobile-web.mp4. H.264 / yuv420p, limited-range BT.709: Chrome’da açık harita tonlarının beyaza kırpılmasını önler. Render scripti artık önce research/ altına çıktı verir; doğrulanmış dosyalar sürümlenerek public/ içine alınır.

## İlk ekran yüklemesi

Hero görselleri WebP ve ekrana göre öncelikli yüklenir. Leaflet JS/CSS yalnızca açılır örnek açılınca yüklenir. Alt bölümlerdeki harita görselleri bölüme yaklaşılınca istenir. JavaScript kapalıyken statik harita arka planı korunur. `research/verification-lazy-map.json` gerçek yükleme/zoom/sektör kontrolünü içerir.

`research/hero-v9-performance.json`: yerel Chromium, 390×844, 1.6 Mbps, 70 ms gecikme, CPU 4×, tek soğuk ölçüm. LCP 3576 ms, ilk video oynatımı 4553 ms, CLS 0.00126. Önceki aynı koşuldaki ölçümde ilk oynatım 5907 ms idi. Bunlar saha veya Vercel performans sonucu değildir.

## Son düzenleme turu — canlı sektör animasyonları

Güncel sunum, tek sektörlü MP4 döngüsü yerine `map-demo.html` + `map-demo-runtime.js` ile çalışan yerel çizim kullanır. 8 sektör, sektör başına 22 saniye, toplam 176 saniyelik otomatik döngü: kuaför, kafe, diş kliniği, restoran, mimarlık, otel, spor salonu ve oto servisi. Pinler aralıklı çıkar, bilgi kartı seçilen pine bağlı kalır, beş kayıt toplanır. Çıktı düzenleri sektöre göre değişir. Üzerinde büyütme/oynatma/sonraki düğmesi yoktur. Genel duraklatma footer’dadır. Görünmeyen ve arka plandaki sahneler durur; azaltılmış hareket ve veri tasarrufunda poster gösterilir.

Mobil bölüm başlıkları/açıklamaları ve örnek liste bağlantısı ortalıdır; veri tabloları kendi hizasını korur. Ürün anlatımı açık zemindedir. Satış/ajans/yerel sekmelerinin gerçek ayrı görselleri vardır. Logo merkezi sadece transparan amblemdir. Kapanışta 12 pin ve bulanık temsili işletme kartı sıra ile belirir. Görünen tüm MapBot ifadeleri Veri Burada olarak değiştirildi. Kullanıcının gönderdiği iki aynı logo videosunun bir kopyası, sessiz/döngülü footer marka animasyonunda kullanılır; yapay küçük metinler içeren diğer klip ürüne eklenmedi.

Güncel doğrulama: `verification-current-design.json`, `final-visual-geometry.json`, `verification-onboarding.json`, `acceptance-final.json`. Geçmiş MP4/oynatıcı testleri bu yeni bileşenin kanıtı değildir. 320–1440 genişliklerde sekiz çıktı düzeninin kadraja sığdığı ve mobil örnek liste hizası ayrıca kontrol edildi. İndirme, menü, klavye, örnek harita ve onboarding demodur; canlı arama/üyelik bağlantısı ayrıca yapılandırılmalıdır.

Yerel klasör şu an Git deposu değildir. Kullanıcı Git/Vercel bağlantısını dışarıda hazırladığını bildirdi ve bu düzenleme turu bitince push isteyeceğini belirtti. Bu turda Git deposu oluşturulmadı, uzak depoya push veya Vercel yayını yapılmadı.
