/* One shared feature set; duration changes the total, never the billing claim. */
(()=>{const buttons=[...document.querySelectorAll('[data-duration]')];if(!buttons.length)return;
const plans={1:['₺499','₺499'],3:['₺999','₺333'],6:['₺1.499','₺249,83'],12:['₺2.499','₺208,25']};
function choose(button){const term=button.dataset.duration;buttons.forEach(b=>{b.setAttribute('aria-checked',String(b===button));b.tabIndex=b===button?0:-1});document.querySelector('[data-duration-label]').textContent=term+' ay kullanım';document.querySelector('[data-duration-total]').textContent=plans[term][0];document.querySelector('[data-duration-monthly]').textContent=plans[term][1];document.querySelector('[data-duration-link]').href='/pricing/?sure='+term}
buttons.forEach((b,i)=>{b.addEventListener('click',()=>choose(b));b.addEventListener('keydown',e=>{let n;if(['ArrowRight','ArrowDown'].includes(e.key))n=(i+1)%buttons.length;if(['ArrowLeft','ArrowUp'].includes(e.key))n=(i+buttons.length-1)%buttons.length;if(e.key==='Home')n=0;if(e.key==='End')n=buttons.length-1;if(n!==undefined){e.preventDefault();buttons[n].focus();choose(buttons[n])}})});
})();
