const menuButton=document.querySelector('.menu-toggle');
const nav=document.querySelector('.nav');
menuButton.addEventListener('click',()=>{
 const open=nav.classList.toggle('open');
 menuButton.setAttribute('aria-expanded',String(open));
});
document.querySelectorAll('.nav a').forEach(link=>link.addEventListener('click',()=>{
 nav.classList.remove('open');menuButton.setAttribute('aria-expanded','false');
}));
document.getElementById('year').textContent=new Date().getFullYear();
const form=document.getElementById('lead-form');
form.addEventListener('submit',event=>{
 event.preventDefault();
 const data=new FormData(form);
 const subject=encodeURIComponent('New project enquiry — Snapfold Co.');
 const body=encodeURIComponent('Name: '+data.get('name')+'\nEmail: '+data.get('email')+'\nService: '+data.get('service')+'\n\nProject details:\n'+(data.get('message')||'Not provided'));
 document.getElementById('form-note').textContent='Your email app should open with the enquiry prepared. Add your preferred business email in the mail window and send it.';
 window.location.href='mailto:?subject='+subject+'&body='+body;
});
const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const targets=document.querySelectorAll('.intro-grid,.services-head,.service-row,.manifesto-copy,.work-card,.studio-grid,.contact-grid');
if(!reduceMotion&&'IntersectionObserver' in window){
 const observer=new IntersectionObserver((entries,obs)=>{
  entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');obs.unobserve(entry.target);}});
 },{threshold:.12,rootMargin:'0px 0px -30px 0px'});
 targets.forEach((el,index)=>{el.classList.add('reveal');el.style.transitionDelay=(index%3)*70+'ms';observer.observe(el);});
}
const progress=document.querySelector('.progress');
let ticking=false;
function updateProgress(){
 const max=document.documentElement.scrollHeight-window.innerHeight;
 progress.style.transform='scaleX('+(max>0?window.scrollY/max:0)+')';
 ticking=false;
}
window.addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(updateProgress);ticking=true;}},{passive:true});
updateProgress();
const art=document.querySelector('.hero-art');
if(art&&!reduceMotion&&matchMedia('(pointer:fine)').matches){
 art.addEventListener('pointermove',event=>{
  const r=art.getBoundingClientRect(),x=(event.clientX-r.left)/r.width-.5,y=(event.clientY-r.top)/r.height-.5;
  art.style.transform='perspective(900px) rotateX('+(-y*3)+'deg) rotateY('+(x*4)+'deg)';
 });
 art.addEventListener('pointerleave',()=>art.style.transform='perspective(900px) rotateX(0) rotateY(0)');
}