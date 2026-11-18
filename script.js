const menuButton=document.querySelector('.menu-toggle');const nav=document.querySelector('.nav');menuButton.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));menuButton.textContent=open?'×':'☰'});document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menuButton.setAttribute('aria-expanded','false');menuButton.textContent='☰'}));document.getElementById('year').textContent=new Date().getFullYear();document.getElementById('lead-form').addEventListener('submit',e=>{e.preventDefault();const f=new FormData(e.currentTarget);const subject=encodeURIComponent('New project enquiry — Snapfold Co.');const body=encodeURIComponent(`Name: ${f.get('name')}\nEmail: ${f.get('email')}\nService: ${f.get('service')}\n\nProject details:\n${f.get('message')||'Not provided'}`);document.getElementById('form-note').textContent='Your email app should open with the enquiry prepared. Add your preferred business email in the mail window and send it.';window.location.href=`mailto:?subject=${subject}&body=${body}`;});

/* Scroll reveals and lightweight page motion */
const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealTargets=document.querySelectorAll('.section-heading,.service-card,.approach>div,.step,.work-card,.about-inner>div,.about-inner>p,.contact-copy,.contact-form,.trust-inner');
if(!reduceMotion&&'IntersectionObserver' in window){
  const revealObserver=new IntersectionObserver((entries,observer)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },{threshold:.13,rootMargin:'0px 0px -35px 0px'});
  revealTargets.forEach((element,index)=>{
    element.classList.add('reveal');
    if(element.classList.contains('service-card')) element.classList.add('reveal-delay-'+(index%4));
    revealObserver.observe(element);
  });
}else{
  revealTargets.forEach(element=>element.classList.add('is-visible'));
}
const header=document.querySelector('.site-header');
let scrollTicking=false;
const updateScrollMotion=()=>{
  const maxScroll=document.documentElement.scrollHeight-window.innerHeight;
  const progress=maxScroll>0?window.scrollY/maxScroll:0;
  document.documentElement.style.setProperty('--scroll-progress',String(progress));
  header.classList.toggle('is-scrolled',window.scrollY>12);
  scrollTicking=false;
};
window.addEventListener('scroll',()=>{
  if(!scrollTicking){window.requestAnimationFrame(updateScrollMotion);scrollTicking=true;}
},{passive:true});
updateScrollMotion();
