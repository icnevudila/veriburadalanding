# Legal content review — 27 October 2026

Scope: current landing and explicit demo, not the separate application's legal terms.
User instructed us to use only the Veri Burada brand and not invent an operator/address. A brand-only site policy is not a complete Article 10 KVKK disclosure and is not a final paid-service contract. The two URLs remain noindex and excluded from sitemap. Public development placeholders were removed; the text now explains the actual scoped behavior instead.

Verified in source:
- sessionStorage key vb-search-draft stores purpose/sector/city/district/fields/step.
- Preferences are POSTed to first-party free-search; default mode is demo, with five illustrative records and no database persistence in this code.
- API returns mode/preview cap, not a membership account. No card collection/payment implementation exists here.
- Contact composes a mailto draft, not server-side submission or delivery confirmation.
- Local fonts/images, no custom tracking pixels/analytics/cookies in the application code.
- Browser storage is not the same as HTTP cookies or provider request logs. Tab/session restore can preserve sessionStorage.
- Vercel-oriented configuration exists. Actual production log settings/retention/processor agreements are not proven by source. No fabricated retention periods, Turkish-only storage or guaranteed legal transfer mechanism.
- Onboarding includes neutral links to the policies, not blanket consent or deemed contract acceptance.
- The preference-clear control removes only the local draft and resets the in-memory onboarding state. It does not claim to erase server logs/mail or all personal data.

Outstanding facts (not invented): legal operator identity/address, confirmed mailbox operation, production infrastructure configuration and actual retention schedules, legal basis/balancing assessment, processor/transfer arrangements, future application provider/user/account/billing data flows. These remain separate publication/compliance work. No push or legal-compliance certification.

Primary references checked:
- KVKK disclosure requirements: https://www.kvkk.gov.tr/Icerik/6765/AYDINLATMA-YUKUMLULUGUNUN-YERINE-GETIRILMESI-HAKKINDA-KAMUOYU-DUYURUSU
- Overseas processing, revised Article 9: https://www.kvkk.gov.tr/Icerik/2053/Yurtdisina-Aktarim
- Application procedures: https://www.kvkk.gov.tr/Icerik/6938/Kurumumuza-Yapilan-Sikayetlerin-Usul-Sartlarina-Iliskin-Kamuoyu-Duyurusu
- Publicly available data is not unlimited permission: https://www.kvkk.gov.tr/Icerik/6843/-ALENILESTIRME-HAKKINDA-KAMUOYU-DUYURUSU
- Articles 11/13 only in official Ministry of Justice PDF: https://mgm.adalet.gov.tr/Resimler/SayfaDokuman/211020191355056698%20KVKK.pdf (older consolidated copy; not relied on for amended Article 9).
- Cookie guidance: https://www.kvkk.gov.tr/Icerik/7353/Cerez-Uygulamalari-Hakkinda-Rehber
- Consumer/distance sales explanation: https://tuketici.ticaret.gov.tr/yayinlar/tuketici-bilgi-rehberi/mesafeli-sozlesmeler-hakkinda-bilgilendirme
- Provider request logs: https://vercel.com/docs/logs/runtime
- Provider international processing disclosure: https://vercel.com/legal/dpa

Build source: research/legal-content.py (loaded after the product-page overrides). Do not restore the superseded draft body in content-articles.py. Legal presentation follows existing editorial typography and adds a readable TOC/data table/print view; no new visual direction or decorative legal animations.
