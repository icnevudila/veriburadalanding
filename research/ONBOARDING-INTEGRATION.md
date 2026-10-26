# Arama ve üyelik bağlantısı

## Şu an çalışan

Beş adımlı onboarding, düzenleme/geri/iptal/devam, seçimlerin oturumda korunması, ilk 5 sonuç, kalan kayıt sayısı ve üyelik çağrısı. `/api/free-search` yanıtı sunucu tarafında en fazla 5 kayıt içerir. Arama parametreleri ve alanlar doğrulanır; bilinmeyen alanlar ve diğer kayıtlar yanıtın içine taşınmaz. Üyelik bağlanmadan e-posta/parola istenmez, hesap oluşturulduğu iddia edilmez.

Varsayılan çalışma **demo** modudur: 17 temsili kayıttan 5 örnek gösterilir; ekranda arama öncesinde ve sonuçlarda açıkça belirtilir. Google'a arama yapılmaz. Örnek `.example` alanları gerçek işletme siteleri değildir. Demo modunda gerçek üyelik URL'si yoksa buton bağlantının henüz kurulmadığını açıklar ve çalışan fiyatlandırma bölümünü sunar.

## Uygulama bağlanırken

Vercel ortam değişkenleri:

- `FREE_SEARCH_MODE=live`
- `FREE_SEARCH_API_URL=https://YOUR_APP/.../preview`
- `FREE_SEARCH_AUTH_TOKEN`: gerekiyorsa yalnızca sunucu tarafında Bearer belirteci.
- `APP_SIGNUP_URL=https://YOUR_APP/signup`

Bu değerler frontend dosyasına yazılmaz. Token tarayıcıya veya arama yanıtına eklenmez. Live modda yanlış/eksik yapılandırma ya da servis hatası görünür bir hata döndürür; sessizce demo verisine dönmez.

`POST /api/free-search` gelen gövde:

```json
{"purpose":"sales","sector":"Kafeler","city":"İstanbul","district":"Beyoğlu","fields":["phone","website","address"]}
```

Adaptör bu parametrelere `previewLimit: 5` ekleyerek uygulamaya POST eder. İstemcinin göndereceği limit/cursor/offset dikkate alınmaz. Başlıklar: `X-Preview-Limit: 5`, `X-Request-ID` ve isteğe bağlı `Authorization: Bearer ...`.

Uygulamadan beklenen yanıt:

```json
{"searchId":"opaque-public-correlation-id","total":42,"results":[{"id":"business-1","name":"...","category":"...","city":"...","district":"...","phone":null,"website":"https://...","address":"...","latitude":41.0,"longitude":29.0,"rating":4.5}]}
```

`total` negatif olmayan tam sayı olmalıdır. `results` mümkünse uygulamada da ilk 5 ile sınırlansın; adaptör her durumda 5'ten fazlasını tarayıcıya döndürmez. `searchId` üyelik URL'sine eklenir; üyelik sonrası uygulama bu aramayı kendi yetki kontrolüyle yüklemelidir. Bu kimlik tek başına tam sonuçlara erişim izni değildir.

**Gerçek kota, bot koruması, arama hakkı, üyelik/ödeme yetkisi ve kalan sonuçları açma uygulama/backend tarafında kalıcı olarak uygulanmalıdır.** Bu landing adaptörü kalıcı kullanıcı kotası veya ödeme yetkilendirmesi sağladığını iddia etmez. Anonim ve oturumlu aramaların sunucu tarafı limiti uygulama bağlanmadan kararlaştırılmalıdır; istekler ücretli bir sağlayıcıya kontrolsüz iletilmemelidir.

25 saniyelik servis zaman aşımı vardır. 429, 502/504 ve geçersiz yanıtlar kullanıcıya tekrar deneme/düzenleme seçeneği olarak gösterilir. GET `/api/onboarding-config` yalnızca çalışma modu, 5 kayıt sınırı ve üyelik bağlantısının hazır olup olmadığını döndürür.

## Yerel çalışma ve yayın

`node research/dev-server.cjs` (varsayılan 4175, `PORT=4173` ile mevcut önizleme). Node 22+, bağımlılık kurulumu gerekmez. CSS/JS değiştiğinde `py -3 research/build-landing.py` kullanılır; Vercel'e hazır derlenmiş dosyalar gönderilir.

`vercel.json` statik çıktı olarak `public` ve iki Node API fonksiyonunu tanımlar. Yayın paketinde yalnızca kullanılan varlıklar, `api`, `lib`, `package.json`, `vercel.json` bulunmalı; research/arşiv/kimlik bilgileri yayınlanmamalıdır.
