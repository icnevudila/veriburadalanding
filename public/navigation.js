/* Shared navigation. Stable panel geometry, backdrop, focus containment and Escape. */
(() => {
 const button=document.querySelector('.menu-toggle'),panel=document.querySelector('.menu-panel'),backdrop=document.querySelector('.menu-backdrop');if(!button||!panel)return;
 const header=document.querySelector('.header');let opened=false,previous;
 const affected=[...document.querySelectorAll('main,body>footer')];
 function set(open){opened=open;header.classList.toggle('menu-open',open);document.body.classList.toggle('navigation-open',open);panel.inert=!open;panel.setAttribute('aria-hidden',String(!open));button.setAttribute('aria-expanded',String(open));button.setAttribute('aria-label',open?'Menüyü kapat':'Menüyü aç');affected.forEach(el=>el.inert=open);if(open){previous=document.activeElement;requestAnimationFrame(()=>panel.querySelector('a').focus({preventScroll:true}))}else if(previous&&panel.contains(document.activeElement))button.focus({preventScroll:true})}
 button.addEventListener('click',()=>set(!opened));backdrop?.addEventListener('click',()=>set(false));panel.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>set(false)));
 document.addEventListener('keydown',ev=>{if(!opened)return;if(ev.key==='Escape'){ev.preventDefault();set(false);button.focus();return}if(ev.key==='Tab'){const links=[button,...panel.querySelectorAll('a,button')].filter(el=>!el.disabled);const at=links.indexOf(document.activeElement),next=ev.shiftKey?(at<=0?links.length-1:at-1):(at+1)%links.length;ev.preventDefault();links[next].focus()}});
 addEventListener('scroll',()=>header.classList.toggle('scrolled',scrollY>20),{passive:true});set(false);
})();

/* Account choice hands off to the real application; no login form lives on the landing. */
(()=>{
 const dialog=document.createElement('dialog');dialog.className='account-dialog';dialog.setAttribute('aria-labelledby','account-title');
 dialog.innerHTML='<button class="account-close" type="button" aria-label="Pencereyi kapat">×</button><img class="account-brand" src="/brand-wordmark.webp" alt="Veri Burada" width="1200" height="375"><h2 id="account-title">Veri Burada’ya başlayın.</h2><p>Hesabınıza giriş yapın veya yeni hesap oluşturun.</p><div class="account-options"><a data-account-option="signUp" class="button primary" href="#">Kaydol</a><a data-account-option="signIn" class="button account-secondary" href="#">Giriş yap</a></div><p class="account-status" role="status" hidden></p>';document.body.append(dialog);
 let previous;
 function destination(kind){try{const u=new URL(window.VBAuthLinks?.[kind]);return u.protocol==='https:'?u.href:null}catch{return null}}
 function refresh(){dialog.querySelectorAll('[data-account-option]').forEach(a=>{const url=destination(a.dataset.accountOption);a.href=url||'#';a.setAttribute('aria-disabled',String(!url))})}
 function open(kind){previous=document.activeElement;refresh();const status=dialog.querySelector('.account-status');status.hidden=!!destination('signIn')&&!!destination('signUp');status.textContent='Giriş ve kayıt bağlantıları henüz eklenmedi.';dialog.dataset.intent=kind||'choice';dialog.showModal();document.body.classList.add('account-open');window.dispatchEvent(new CustomEvent('veriburada:motion',{detail:{paused:true}}));dialog.querySelector('.account-close').focus()}
 function close(){dialog.close()}
 dialog.querySelector('.account-close').addEventListener('click',close);dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)close()}const a=e.target.closest('[data-account-option]');if(a&&!destination(a.dataset.accountOption))e.preventDefault()});dialog.addEventListener('close',()=>{document.body.classList.remove('account-open');window.dispatchEvent(new CustomEvent('veriburada:motion',{detail:{paused:document.body.classList.contains('motion-paused')}}));previous?.focus({preventScroll:true})});
 document.querySelectorAll('[data-auth-open],[data-auth-signup],[data-auth-signin]').forEach(el=>{const kind=el.hasAttribute('data-auth-signin')?'signIn':'signUp';const url=destination(kind);if(!el.hasAttribute('data-auth-open')&&url)el.href=url;el.addEventListener('click',e=>{if(el.hasAttribute('data-auth-open')){e.preventDefault();open();return}const url=destination(kind);if(url){e.preventDefault();location.assign(url)}else{e.preventDefault();open(kind)}})});
})();
