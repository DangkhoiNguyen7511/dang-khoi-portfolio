const menuButton=document.querySelector('.menu-toggle');
const nav=document.querySelector('.nav');
menuButton?.addEventListener('click',()=>{
  const open=nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded',String(open));
  menuButton.setAttribute('aria-label',open?'Đóng menu':'Mở menu');
});
nav?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{
  nav.classList.remove('open');
  menuButton?.setAttribute('aria-expanded','false');
}));
const year=document.querySelector('#year');
if(year) year.textContent=new Date().getFullYear();
const progress=document.querySelector('#scrollProgress');
const topButton=document.querySelector('#backToTop');
const updateScroll=()=>{
  const max=document.documentElement.scrollHeight-window.innerHeight;
  const amount=max>0?(window.scrollY/max)*100:0;
  if(progress) progress.style.width=amount+'%';
  topButton?.classList.toggle('visible',window.scrollY>500);
};
window.addEventListener('scroll',updateScroll,{passive:true});
updateScroll();
topButton?.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
const revealItems=document.querySelectorAll('.reveal');
if('IntersectionObserver'in window){
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}
    });
  },{threshold:.12});
  revealItems.forEach(item=>observer.observe(item));
}else revealItems.forEach(item=>item.classList.add('visible'));