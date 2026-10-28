/**
 * Veri Burada - Analitik ve Reklam Takip Modülü (GA4, GTM & Meta Pixel)
 * 
 * Google Ads ve Meta (Facebook/Instagram) reklam kampanyalarında
 * dönüşüm (conversion) ölçümü ve ziyaretçi analitiği sağlar.
 * 
 * Gerçek ID'lerinizi aşağıdaki konfigürasyon alanına ekleyebilir veya
 * window.VERIBURADA_ANALYTICS_CONFIG üzerinden dinamik tanımlayabilirsiniz.
 */
(() => {
  'use strict';

  // 1. Konfigürasyon
  const config = Object.assign({
    gaId: 'G-XXXXXXXXXX',     // Google Analytics 4 Ölçüm Kimliği (örn: G-ABC1234XYZ)
    gtmId: '',                // Google Tag Manager Kimliği (varsa, örn: GTM-XXXXXXX)
    pixelId: '',              // Meta (Facebook) Pixel Kimliği (varsa, örn: 123456789012345)
    debug: false              // Konsola olay çıktısı vermek için true yapabilirsiniz
  }, window.VERIBURADA_ANALYTICS_CONFIG || {});

  const isRealGA = config.gaId && config.gaId.startsWith('G-') && config.gaId !== 'G-XXXXXXXXXX';
  const isRealGTM = config.gtmId && config.gtmId.startsWith('GTM-');
  const isRealPixel = config.pixelId && /^\d+$/.test(config.pixelId);

  // 2. Google Analytics 4 (gtag.js) Yükleyici
  if (isRealGA) {
    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', config.gaId, {
      send_page_view: true,
      cookie_flags: 'SameSite=None;Secure'
    });

    const gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(config.gaId);
    document.head.appendChild(gaScript);
  } else {
    window.gtag = window.gtag || function () {
      if (config.debug) console.log('[Analytics GA4]', ...arguments);
    };
  }

  // 3. Google Tag Manager Yükleyici (opsiyonel)
  if (isRealGTM) {
    (function (w, d, s, l, i) {
      w[l] = w[l] || [];
      w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
      var f = d.getElementsByTagName(s)[0],
        j = d.createElement(s),
        dl = l !== 'dataLayer' ? '&l=' + l : '';
      j.async = true;
      j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
      f.parentNode.insertBefore(j, f);
    })(window, document, 'script', 'dataLayer', config.gtmId);
  }

  // 4. Meta (Facebook) Pixel Yükleyici
  if (isRealPixel) {
    (function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

    window.fbq('init', config.pixelId);
    window.fbq('track', 'PageView');
  } else {
    window.fbq = window.fbq || function () {
      if (config.debug) console.log('[Analytics Meta Pixel]', ...arguments);
    };
  }

  // 5. Birleşik Olay Tetikleme Fonksiyonu
  function trackEvent(eventName, params = {}) {
    if (config.debug) {
      console.log('[Track Event]', eventName, params);
    }

    // GA4 Gönderimi
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, params);
    }

    // Meta Pixel Gönderimi
    if (typeof window.fbq === 'function') {
      // Standart Pixel eşleştirmeleri
      const pixelMapping = {
        'sign_up_click': 'Lead',
        'view_pricing': 'ViewContent',
        'select_package': 'InitiateCheckout',
        'search_completed': 'Search',
        'contact_intent': 'Contact',
        'sample_download': 'ViewContent'
      };
      const pixelEvent = pixelMapping[eventName] || 'Custom';
      if (pixelEvent === 'Custom') {
        window.fbq('trackCustom', eventName, params);
      } else {
        window.fbq('track', pixelEvent, params);
      }
    }
  }

  window.VERIBURADA_TRACK = trackEvent;

  // 6. Otomatik Etkileşim ve Dönüşüm Dinleyicileri
  document.addEventListener('DOMContentLoaded', () => {
    // A) Kayıt / Başlama Butonları (Lead / Signup Intent)
    document.addEventListener('click', (e) => {
      const target = e.target.closest('a, button');
      if (!target) return;

      // "İlk listemi oluştur", "Hemen başla", "Hesap oluştur"
      if (target.matches('[data-auth-signup], [data-auth-open], .header-start') ||
          target.matches('[data-account-option="signUp"]')) {
        trackEvent('sign_up_click', {
          event_category: 'engagement',
          event_label: target.textContent.trim() || 'Hesap Oluştur / Başla',
          location: target.closest('header') ? 'header' : (target.closest('.hero') ? 'hero' : 'content')
        });
      }

      // "Giriş yap"
      if (target.matches('[data-auth-signin], [data-account-option="signIn"]')) {
        trackEvent('login_click', {
          event_category: 'engagement',
          event_label: 'Giriş Yap'
        });
      }

      // Kredi Paketi Seçimi
      if (target.matches('[data-credits], [data-credit-package] a, .credit-detail-card a')) {
        const card = target.closest('[data-credit-package], .license-card, .credit-detail-card');
        const credits = target.dataset.credits || card?.dataset.creditPackage || 'belirsiz';
        trackEvent('select_package', {
          event_category: 'ecommerce',
          package_credits: credits,
          currency: 'TRY'
        });
      }

      // Örnek CSV İndirme
      if (target.matches('[data-download-sample], [data-demo-download]')) {
        trackEvent('sample_download', {
          event_category: 'conversion',
          file_name: 'veriburada-ornek-liste.csv'
        });
      }

      // İletişim / E-posta Gönderimi
      if (target.matches('#support-note button[type="submit"], a[href^="mailto:destek@veriburada.com"]')) {
        trackEvent('contact_intent', {
          event_category: 'support',
          method: 'email'
        });
      }
    });

    // B) Onboarding Arama Akışı Olayları
    window.addEventListener('veriburada:onboarding-open', () => {
      trackEvent('onboarding_opened', {
        event_category: 'search_funnel'
      });
    });

    // C) Fiyatlandırma Bölümünün Görünmesi
    const pricingSection = document.querySelector('#fiyatlar, .pricing-section, .license-grid, .credit-details-section');
    if (pricingSection && 'IntersectionObserver' in window) {
      let pricingTracked = false;
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !pricingTracked) {
          pricingTracked = true;
          trackEvent('view_pricing', {
            event_category: 'ecommerce',
            page: window.location.pathname
          });
          observer.disconnect();
        }
      }, { threshold: 0.3 });
      observer.observe(pricingSection);
    }
  });
})();
