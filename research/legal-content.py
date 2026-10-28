"""Site-specific legal information for Veri Burada platform and web application.
Complete KVKK Clarification Notice (Aydınlatma Metni) and Terms of Service (Kullanım Koşulları).
"""
from html import escape

def legal_document(sections,related):
 toc='<nav class="legal-toc" aria-label="Sayfa içeriği"><b>Bu sayfada</b>'+''.join(f'<a href="#{key}">{title}</a>' for key,title,body in sections)+f'<a class="legal-related" href="/{related[0]}/">{related[1]} ↗</a></nav>'
 prose='<article class="legal-prose"><p class="legal-version">Son güncelleme: <time datetime="2026-10-27">27 Ekim 2026</time> (Revizyon: 29 Ekim 2026)</p>'+''.join(f'<section id="{key}"><h2>{title}</h2>{body}</section>' for key,title,body in sections)+'</article>'
 return '<div class="legal-layout">'+toc+prose+'</div>'

privacy=[
 ('kapsam','1. Veri Sorumlusu ve Kapsam',paras(
  'Bu Aydınlatma Metni ve Gizlilik Politikası, 6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) Madde 10 uyarınca aydınlatma yükümlülüğünün yerine getirilmesi amacıyla, veri sorumlusu sıfatıyla <strong>Veri Burada</strong> (“Veri Burada” veya “Platform”) tarafından hazırlanmıştır.',
  'İşbu metin; <strong>www.veriburada.com</strong> web sitesini, <strong>app.veriburada.com</strong> web uygulamasını, Veri Burada tarayıcı eklentisini, kullanıcı hesabı ve kredi paketlerini, işletme araştırması ve CSV dışa aktarma hizmetlerini kullanan tüm ziyaretçi, üye ve müşterilerin (“Kullanıcı”) kişisel verilerinin işlenme süreçlerini kapsar.',
  'Veri sorumlusu ile kişisel verilerin korunması, aydınlatma metni ve ilgili kişi başvuruları konularında iletişime geçmek için resmî e-posta adresi: <a href="mailto:destek@veriburada.com">destek@veriburada.com</a>.')),
 ('veriler','2. İşlenen Veri Kategorileri ve Amaçlar',
  '<div class="legal-table-scroll" role="region" tabindex="0" aria-label="Bilgi türleri ve kullanım amaçları"><table class="legal-data-table"><thead><tr><th scope="col">Veri Kategorisi</th><th scope="col">İşleme Amacı</th><th scope="col">Elde Edilme Yöntemi</th></tr></thead><tbody>'+
  ''.join(f'<tr><th scope="row">{name}</th><td>{purpose}</td><td>{method}</td></tr>' for name,purpose,method in [
   ('Hesap ve Kimlik Bilgileri','Kullanıcı hesabının açılması, kimlik doğrulama, güvenli oturum yönetimi ve kullanıcı profili oluşturma.','Kullanıcının kayıt veya giriş formunda paylaştığı ad-soyad, e-posta adresi ve şifrelenmiş (hash) parola.'),
   ('Kredi, Bakiye ve İşlem Logları','Kredi sistemi yönetimi (100, 1.000, 5.000, 10.000 vb. kredi paketleri), bakiye takibi, sorgu ve CSV dışa aktarma işlemlerinin yürütülmesi.','Kullanıcının platform üzerinde gerçekleştirdiği arama, liste oluşturma ve CSV indirme işlemleri sırasında sistemce otomatik oluşturulur.'),
   ('Ödeme ve Fatura Kayıtları','Sipariş teyidi, lisanslı ödeme altyapısıyla işlem doğrulama, fatura kesimi, muhasebe ve vergi yükümlülüklerinin ifası. (Kredi kartı numarası, son kullanma tarihi ve güvenlik kodu gibi hassas kart verileri Veri Burada sunucularında asla saklanmaz; PCI-DSS uyumlu lisanslı ödeme altyapısıyla 3D Secure üzerinden işlenir).','Ödeme aracı kuruluşu tarafından iletilen işlem referansı, sipariş numarası ve kullanıcının girdiği fatura bilgileri.'),
   ('Kamuya Açık İşletme (Rehber) Verileri','Kullanıcının seçtiği bölge ve sektör kriterlerine göre işletme bilgilerinin derlenmesi, filtrelenmesi ve CSV olarak dışa aktarılması.','İşletmelerin Google Haritalar üzerinde kendi ticari faaliyetleri kapsamında alenileştirdikleri kamuya açık ad, telefon, web sitesi, açık adres ve puan verileri.'),
   ('Teknik Erişim ve Trafik Kayıtları','5651 sayılı Kanun uyarınca zorunlu trafik kayıtlarının tutulması, ağ ve sistem güvenliğinin sağlanması, bot saldırılarının ve tersine mühendisliğin önlenmesi.','Sunuculara ve web uygulamasına erişim sırasında otomatik olarak kaydedilen IP adresi, port bilgisi, tarayıcı/cihaz türü, istek zamanı ve durum kodları.'),
   ('Müşteri Destek ve İletişim Verileri','Kullanıcıların teknik destek, lisans, fatura ve soru taleplerinin değerlendirilmesi ve çözüme kavuşturulması.','destek@veriburada.com adresine gönderilen e-postalar veya iletişim formu üzerinden hazırlanan mesaj içerikleri.')])+
  '</tbody></table></div>'+paras(
  'Veri Burada sistemlerine kimlik numarası, özel nitelikli kişisel veri, sağlık bilgisi veya üçüncü şahıslara ait hassas kişisel veriler girilmemelidir. Platformun işleyişi bu verileri talep etmez.')),
 ('hukukisebepler','3. Veri İşlemenin Hukuki Sebepleri',paras(
  'Kişisel verileriniz, 6698 sayılı KVKK’nın 5. maddesinde öngörülen aşağıdaki hukuki sebeplere dayalı olarak işlenmektedir:',
  '<strong>a) Sözleşmenin kurulması veya ifası (KVKK m. 5/2-c):</strong> Kullanıcı kaydının açılması, kredi bakiyesinin tanımlanması ve harcanması, arama sorgularının karşılanması ve CSV liste dışa aktarım hizmetinin yerine getirilmesi.',
  '<strong>b) Hukuki yükümlülüklerin yerine getirilmesi (KVKK m. 5/2-ç):</strong> 5651 sayılı İnternet Ortamında Yapılan Yayınların Düzenlenmesi Hakkında Kanun uyarınca trafik loglarının tutulması, Türk Ticaret Kanunu ve Vergi Usul Kanunu uyarınca mali ve fatura kayıtlarının muhafazası.',
  '<strong>c) İlgili kişinin kendisi tarafından alenileştirilmiş olması (KVKK m. 5/2-d):</strong> Google Haritalar ve kamuya açık ticari dizinlerde paylaşılan işletme unvanı, iş telefonu, web sitesi ve adres bilgilerinin B2B araştırma kapsamında derlenmesi.',
  '<strong>d) Veri sorumlusunun meşru menfaati (KVKK m. 5/2-f):</strong> Temel hak ve özgürlüklerinize zarar vermemek kaydıyla; platformun siber güvenliğinin sağlanması, kötüye kullanım ve tersine mühendisliğin engellenmesi, kullanıcı deneyiminin ve servis kalitesinin artırılması.')),
 ('tarayici','4. Tarayıcı Depolaması, Çerezler ve Tercihler',paras(
  'Platformda zorunlu oturum çerezleri ve tarayıcının yerel saklama alanları (<code>sessionStorage</code> ve <code>localStorage</code>) kullanılmaktadır. Arama adımlarındaki tercihleriniz (seçilen bölge, sektör ve filtreler) <code>vb-search-draft</code> anahtarıyla oturum süresince tutulur.',
  'Bu mekanizmalar; giriş yapmış kullanıcıların güvenli oturumunu sürdürmek, adımlar arasında seçimleri korumak ve kesintisiz deneyim sunmak için teknik olarak zorunludur. Platformda üçüncü taraf reklam pikselleri, yeniden hedefleme çerezleri veya veri brokerları bulunmaz.',
  'Arama tercihlerinizi aşağıdaki düğmeyle dilediğiniz an silebilir veya tarayıcınızın site verileri ayarlarından temizleyebilirsiniz:')+
  '<div class="legal-preference-control"><button type="button" class="button secondary" data-clear-search-preferences>Arama tercihlerimi sil</button><p role="status" data-preference-status>Bu işlem yalnızca bu tarayıcıdaki arama taslağını temizler.</p></div>'+paras(
  'Tarayıcınızın çerez ayarlarını değiştirerek tüm çerezleri engelleyebilirsiniz; ancak bu durumda üyelik girişi ve sepet/kredi işlemlerinde aksamalar yaşanabilir.')),
 ('isletmeverileri','5. Kamuya Açık İşletme Verileri ve CSV Çıktısı',paras(
  'Veri Burada, işletmelerin internet ortamında kamuya açık rehber ve dizinlerde (Google Haritalar vb.) paylaştıkları güncel ticari bilgileri bir araya getirir. Platform gizli veya kapalı kişisel veri tabanlarına erişmez.',
  'İndirilen CSV dosyaları kullanıcının kendi cihazında depolanır. Kullanıcı, elde ettiği kamuya açık iletişim bilgileriyle iletişime geçerken 6563 sayılı Elektronik Ticaretin Düzenlenmesi Hakkında Kanun (ETK), Ticari İletişim ve Ticari Elektronik İletiler Hakkında Yönetmelik (İYS) ve KVKK kurallarına uymakla bizzat yükümlüdür.',
  'Sitemizde ve tanıtım materyallerinde yer alan <code>.example</code> uzantılı alan adları ve temsili telefonlar örnek modun parçasıdır; gerçek iletişim bilgisi niteliğinde değildir.')),
 ('iletisim','6. Destek ve İletişim Süreçleri',paras(
  'Kullanıcı desteği ve bildirimler <a href="mailto:destek@veriburada.com">destek@veriburada.com</a> e-posta adresi üzerinden yürütülür. Sitedeki iletişim formu, yazdığınız konu ve mesajı doğrudan cihazınızdaki e-posta istemcisine aktarır.',
  'E-posta uygulamanızdan gönderdiğiniz mesajlar; talebinizin incelenmesi, teknik ve idari desteğin sağlanması amacıyla işlenir ve yasal zamanaşımı süreleri boyunca güvenli destek arşivimizde muhafaza edilir.')),
 ('aktarim','7. Veri Aktarımı ve Altyapı Sağlayıcıları',paras(
  'Kişisel verileriniz; platformun barındırılması, veri tabanı altyapısının işletilmesi (Vercel ve güvenli bulut sağlayıcıları), ödeme tahsilatının gerçekleştirilmesi (PCI-DSS lisanslı ödeme aracı kurumları) ve kanunen yetkili kamu kurum ve kuruluşları (yargı mercileri, BDDK, Maliye Bakanlığı vb. resmi talepler doğrultusunda) ile KVKK m. 8 ve m. 9 hükümlerine uygun olarak paylaşılabilir.',
  'Veri Burada, kullanıcıların kişisel verilerini hiçbir surette üçüncü taraf veri komisyoncularına veya reklam ağlarına satmaz, kiralamaz ya da ticari menfaat amacıyla devretmez.')),
 ('saklama','8. Veri Güvenliği, Saklama Süreleri ve İmha',paras(
  'Veri Burada, kişisel verilerinizin güvenliğini sağlamak için endüstri standardı güvenlik önlemlerini uygular: Tüm veri trafiği TLS/SSL protokolüyle şifrelenir, kullanıcı şifreleri tek yönlü güçlü kriptografik özetleme (hashing) ile saklanır ve veri tabanı erişimleri sıkı yetkilendirme politikalarıyla sınırlandırılır.',
  'Kişisel verileriniz, işleme amacının gerektirdiği süre ve kanuni zamanaşımı süreleri boyunca muhafaza edilir: 5651 sayılı Kanun kapsamındaki trafik kayıtları 2 yıl; muhasebe, fatura ve finansal işlem kayıtları Türk Ticaret Kanunu ve Vergi Usul Kanunu uyarınca 10 yıl; kullanıcı profil bilgileri ise üyelik hesabı aktif kaldığı sürece saklanır.',
  'Saklama süresi sona eren veya işleme amacı ortadan kalkan veriler, KVKK ve Kişisel Verilerin Silinmesi, Yok Edilmesi veya Anonim Hale Getirilmesi Hakkında Yönetmelik hükümlerine uygun olarak periyodik imha dönemlerinde silinir, yok edilir veya anonimleştirilir.')),
 ('haklar','9. KVKK Madde 11 Kapsamında İlgili Kişi Hakları ve Başvuru',paras(
  'KVKK’nın 11. maddesi uyarınca veri sahibi olarak; kişisel verilerinizin işlenip işlenmediğini öğrenme, işlenmişse bilgi talep etme, işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme, yurt içinde veya yurt dışında kişisel verilerin aktarıldığı üçüncü kişileri bilme haklarına sahipsiniz.',
  'Ayrıca, kişisel verilerin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme, kanuni şartlar çerçevesinde silinmesini veya yok edilmesini talep etme, bu işlemlerin verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme, münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme ve kanuna aykırı işleme sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme haklarınız bulunmaktadır.',
  'Başvurularınızı, Veri Sorumlusuna Başvuru Usul ve Esasları Hakkında Tebliğ’e uygun olarak sistemimizde kayıtlı e-posta adresinizden <a href="mailto:destek@veriburada.com">destek@veriburada.com</a> adresine yazılı ve ıslak imzalı veya güvenli elektronik imzalı olarak iletebilirsiniz. Başvurularınız en geç otuz (30) gün içinde ücretsiz olarak sonuçlandırılacaktır.')),
 ('degisiklik','10. Değişiklikler ve Yürürlük',paras(
  'İşbu Gizlilik Politikası ve KVKK Aydınlatma Metni, platformumuzda yayımlandığı tarihte yürürlüğe girer. Hizmet kapsamımızdaki güncellemeler, yasal mevzuat değişiklikleri veya yeni fonksiyonlar doğrultusunda bu metin güncellenebilir. Güncel metin her zaman bu sayfada ilan edilir.',
  '<a href="/kullanim-kosullari/">Kullanım Koşullarını inceleyin</a>. Mevzuat ve başvuru esasları hakkında detaylı bilgi için <a href="https://www.kvkk.gov.tr" rel="noopener noreferrer" target="_blank">Kişisel Verileri Koruma Kurumu (KVKK)</a> resmî sitesini ziyaret edebilirsiniz.'))
]

terms=[
 ('kapsam','1. Taraflar ve Sözleşmenin Kapsamı',paras(
  'İşbu Kullanım Koşulları ve Hizmet Sözleşmesi (“Sözleşme”), <strong>Veri Burada</strong> (“Veri Burada” veya “Platform”) ile <strong>www.veriburada.com</strong> web sitesini, <strong>app.veriburada.com</strong> web uygulamasını veya Veri Burada tarayıcı eklentisini ziyaret eden, üye olan, kredi paketi satın alan veya hizmetlerden yararlanan gerçek ya da tüzel kişiler (“Kullanıcı”) arasında akdedilmiştir.',
  'Platformu kullanan, hesap oluşturan veya kredi satın alan Kullanıcı, işbu Sözleşme’de yer alan tüm şartları okuduğunu, anladığını ve gayrikabili rücu kabul ettiğini beyan eder. Şartları kabul etmiyorsanız lütfen Platformu ve bağlı hizmetleri kullanmayınız.')),
 ('hizmet','2. Hizmetin Niteliği ve Kredi Sistemi',paras(
  'Veri Burada; bölge (il, ilçe) ve sektör bazında kamuya açık işletme dizinlerini (Google Haritalar vb.) tarayarak işletme adı, telefon, web sitesi, açık adres, kategori ve puan bilgilerini derleyen, filtreleyen ve CSV formatında düzenli bir çalışma listesi haline getiren bir SaaS iş zekası ve veri araştırma yazılımıdır.',
  'Hizmet <strong>kredi tabanlı</strong> modelle sunulur. Kullanıcılar tek seferlik kredi paketleri (100, 1.000, 5.000, 10.000 kredi vb.) satın alır. Her 1 kredi, 1 detaylı işletme kaydının sorgulanmasına veya CSV olarak dışa aktarılmasına karşılık gelir.',
  'Krediler için aylık zorunlu son kullanma süresi bulunmamaktadır; satın alınan kredi bakiyesi Kullanıcı hesabında saklanır ve Kullanıcı tarafından dilediği zaman harcanabilir.')),
 ('hesap','3. Hesap Oluşturma ve Güvenlik',paras(
  'Platformun sunduğu hizmetlerden tam olarak yararlanabilmek için Kullanıcı’nın geçerli ve güncel bir e-posta adresiyle hesap oluşturması gerekir. Kayıt sırasında verilen bilgilerin doğruluğu Kullanıcı’nın sorumluluğundadır.',
  'Kullanıcı, hesap şifresinin gizliliğini ve güvenliğini sağlamakla bizzat yükümlüdür. Hesap bilgileri üçüncü kişilere devredilemez, kiralanamaz veya ortak kullanıma açılamaz. Hesabın yetkisiz kişilerce kullanıldığından şüphelenildiğinde derhal <a href="mailto:destek@veriburada.com">destek@veriburada.com</a> adresine bilgi verilmelidir.')),
 ('veridogrulugu','4. Kamuya Açık Veriler ve Kaynak Bağımlılığı',paras(
  'Veri Burada tarafından listelenen tüm işletme bilgileri (telefon numarası, web adresi, konum, adres, çalışma saatleri vb.), ilgili işletmelerin Google Haritalar üzerinde kamuya açık olarak paylaştıkları profillerden anlık veya periyodik olarak derlenir.',
  'Kaynak profildeki bilgilerin güncelliği, doğruluğu, eksiksizliği ya da işletmenin fiilen ticari faaliyetine devam edip etmediği tamamen kaynak işletme profiline bağlıdır. Veri Burada, üçüncü taraf kaynaklı verilerin mutlak güncelliğini veya doğruluğunu garanti etmez.',
  'Veri Burada, derlenen işletme kayıtlarıyla yapılacak ticari temasların herhangi bir satış garantisi, belirli bir ciro veya kesin müşteri dönüşümü sağlayacağını taahhüt etmez. Araştırma sonuçlarının ticari kararlarda değerlendirilmesi Kullanıcı’nın inisiyatifindedir.')),
 ('kurallar','5. Kabul Edilebilir Kullanım ve Yasal Sorumluluklar',paras(
  'Kullanıcı; Platformun kaynak kodlarını kopyalamamayı, tersine mühendislik yapmamayı, sistem altyapısını aşırı yükleyecek otomatik bot/scraper çalıştırmamayı ve güvenlik protokollerini aşmaya çalışmamayı taahhüt eder.',
  'Kullanıcı, indirdiği CSV listelerinde yer alan işletme iletişim bilgileriyle iletişime geçerken; <strong>6563 sayılı Elektronik Ticaretin Düzenlenmesi Hakkında Kanun (ETK)</strong>, Ticari İletişim ve Ticari Elektronik İletiler Hakkında Yönetmelik (İYS) ve <strong>6698 sayılı KVKK</strong> başta olmak üzere yürürlükteki tüm yasal düzenlemelere uymakla bizzat yükümlüdür.',
  'Yetkisiz, izinsiz toplu SMS, spam e-posta veya istenmeyen ticari ileti gönderimlerinden doğabilecek her türlü idari, cezai ve hukuki sorumluluk münhasıran Kullanıcı’ya aittir. Veri Burada bu eylemler nedeniyle hiçbir şekilde sorumlu tutulamaz.')),
 ('ucret','6. Kredi Paketleri, Ödeme ve İade Koşulları',paras(
  'Kredi paket bedelleri ve birim kredi fiyatları web sitesinde ilan edilen güncel fiyat tarifesi üzerinden tahsil edilir. Ödemeler lisanslı ve PCI-DSS uyumlu güvenli ödeme sağlayıcıları aracılığıyla 3D Secure güvencesiyle tahsil edilmektedir.',
  '6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği’nin 15/1-ğ maddesi uyarınca, <em>“Elektronik ortamda anında ifa edilen hizmetler veya tüketiciye anında teslim edilen gayrimaddi mallara ilişkin sözleşmeler”</em> kapsamında Kullanıcı hesabına yüklenen ve kısmen ya da tamamen harcanan kredi paketlerinde cayma hakkı ve ücret iadesi uygulanmaz.',
  'Kullanıcı hesabına tanımlanmış ancak henüz hiçbir şekilde kullanılmamış/harcanmamış kredi paketleri için kanuni süresi içinde iletilen talepler yürürlükteki tüketici mevzuatı çerçevesinde değerlendirilir.')),
 ('fikrihaklar','7. Fikrî ve Sınai Mülkiyet Hakları',paras(
  'Veri Burada markası, logosu, web sitesi tasarımı, veritabanı mimarisi, kaynak kodları, eklenti yazılımı, grafikler ve metinler dahil olmak üzere tüm platform unsurları Veri Burada’nın fikrî mülkiyetindedir ve telif hakları mevzuatı ile korunmaktadır.',
  'Kullanıcı’ya sağlanan kullanım hakkı, yalnızca Sözleşme kapsamındaki araştırma ve CSV dışa aktarımı ile sınırlı, münhasır olmayan bir kullanım lisansıdır; Platformun veya yazılımın mülkiyetinin devri anlamına gelmez.',
  'Google Haritalar ve ilgili diğer markalar kendi sahiplerine aittir. Bu isimlerin tanıtım ve arama bağlamında anılması resmî bir ortaklık veya sponsorluk beyanı niteliğinde değildir.')),
 ('sorumluluk','8. Sorumluluğun Sınırlandırılması ve Kesintisizlik',paras(
  'Veri Burada, platformun kesintisiz, hatasız ve güvenli çalışması için gerekli teknik altyapı tedbirlerini almaktadır. Ancak internet altyapısındaki aksaklıklar, sunucu bakım çalışmaları, tarayıcı güncellemeleri veya veri kaynağında (Google Haritalar vb.) yapılan biçimsel değişikliklerden ötürü meydana gelebilecek geçici servis kesintilerinden dolayı Veri Burada sorumlu tutulamaz.',
  'Veri Burada’nın işbu Sözleşme kapsamındaki kümülatif sorumluluğu, her hâlükârda Kullanıcı’nın uyuşmazlığa konu işlem için son 3 (üç) ay içerisinde Veri Burada’ya ödediği toplam bedel ile sınırlıdır.')),
 ('iletisim','9. İletişim, Destek ve Bildirimler',paras(
  'Platform kullanımına, lisans ve kredilere ilişkin tüm soru ve destek talepleri için resmî iletişim kanalı <a href="mailto:destek@veriburada.com">destek@veriburada.com</a> e-posta adresidir.',
  'Veri Burada tarafından Kullanıcı’ya yapılacak tüm resmî bildirimler, Kullanıcı’nın kayıtlı e-posta adresine gönderilmek suretiyle geçerli şekilde tebliğ edilmiş sayılır.')),
 ('hukuk','10. Uygulanacak Hukuk ve Yetkili Yargı Yeri',paras(
  'İşbu Sözleşme’nin uygulanmasında, yorumlanmasında ve işbu Sözleşme’den doğabilecek tüm hukuki uyuşmazlıklarda Türkiye Cumhuriyeti Hukuku uygulanır.',
  'Taraflar arasında çıkabilecek uyuşmazlıkların çözümünde <strong>İstanbul (Çağlayan) Mahkemeleri ve İcra Daireleri</strong> münhasıran yetkilidir. Tüketici sıfatını haiz Kullanıcıların kanunen belirlenen parasal sınırlar dahilinde Tüketici Hakem Heyetlerine ve Tüketici Mahkemelerine başvuru hakları saklıdır.',
  'İşbu Sözleşme, Platformda yayımlandığı tarihte yürürlüğe girer ve Kullanıcı Platformu kullandığı sürece yürürlükte kalır.'))
]

add('gizlilik-politikasi','Gizlilik Politikası ve KVKK Aydınlatma Metni | Veri Burada','Veri Burada platformu, web uygulaması ve tarayıcı eklentisi için KVKK Aydınlatma Metni, veri işleme amaçları, çerezler ve haklar.','Gizlilik Politikası ve KVKK Aydınlatma Metni','Veri Burada web uygulaması, kullanıcı hesapları, kredi sistemi ve işletme araştırmasında kişisel verilerin nasıl işlendiğini öğrenin.',legal_document(privacy,('kullanim-kosullari','Kullanım koşulları')),noindex=True,legal=True)
add('kullanim-kosullari','Kullanım Koşulları ve Hizmet Sözleşmesi | Veri Burada','Veri Burada web uygulaması, eklenti, kredi paketleri, kullanım sınırları, kamuya açık işletme verileri ve hizmet şartları.','Kullanım Koşulları ve Hizmet Sözleşmesi','Platform, web uygulaması, kredi modeli ve indirilebilir CSV listelerinin kullanımına ilişkin kurallar.',legal_document(terms,('gizlilik-politikasi','Gizlilik politikası')),noindex=True,legal=True)
