# Onboarding + deployment brief — 2026-10-25

User scope: remove slogan-like/AI-style filler; create detailed onboarding whose last action is a free business search, reveal only first five records and invite membership for the rest. Real application is not connected yet. Publish to the user's Mesajify/veriburadalanding Vercel project after implementation.

Reference lock: existing forest/mint Veriburada identity and product UI; Shortimize's product-first proof; Linear signup's focused one-task surface. Direct build is authorized. Five short steps rather than a long account form: purpose → sector → region → needed fields → review/search. No email or password collection until actual application signup is connected. User can go back, edit, close/resume, and skip optional context. Selection states and errors must be real, not decorative.

Desktop: two-column dialog, restrained pale sidebar with numbered progress; one question/task per content panel. Mobile: full viewport, compact step indicator and fixed footer actions. Results are a proper responsive table/list, a visible first-five label and server-derived total/remaining count. No actual hidden records delivered to the browser. Empty/error/retry/repeated-request/back/loading states are part of the implementation.

Unconnected state: explicit demo badge before search and on results. Demo API generates illustrative records only; it must never claim a real Google Maps query. Live adapter is server-side, environment configured, returns a max-five response and fails visibly on upstream errors. No client provider secret. Persistent quota/auth belongs to the future application and is documented; browser-only gating is not presented as security.

Deployment scope: user explicitly authorized the named Vercel project. Existing connector lists Mesajify but cannot currently see this project; a Vercel-generated team authorization link was provided. Do not create a duplicate project or alter other projects. Continue implementation while access is pending.
