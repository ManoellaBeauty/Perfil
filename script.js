// script.js: slider, particles, cards->agendamento interactions

/* Particles generator */
(function createParticles(){
  const wrap = document.getElementById('bgParticles');
  if(!wrap) return;
  const count = 20;
  for(let i=0;i<count;i++){
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = (Math.random()*100) + '%';
    p.style.top = (Math.random()*100) + '%';
    p.style.opacity = (0.02 + Math.random()*0.12).toFixed(2);
    const s = 3 + Math.random()*10;
    p.style.width = s + 'px';
    p.style.height = s + 'px';
    p.style.animationDuration = (10 + Math.random()*20) + 's';
    wrap.appendChild(p);
  }
})();

/* Video slider: simple story-like loop */
(function sliderSetup(){
  const slides = document.getElementById('slides');
  if(!slides) return;
  const prev = document.getElementById('prevBtn');
  const next = document.getElementById('nextBtn');
  const total = slides.children.length;
  let index = 0;

  function show(i){
    index = (i + total) % total;
    const gap = 18;
    const w = slides.children[0].offsetWidth + gap;
    slides.style.transform = `translateX(${ -index * w }px)`;
    // play visible video, pause others
    for(let j=0;j<total;j++){
      const v = slides.children[j].querySelector('video');
      if(!v) continue;
      if(j===index){ v.play().catch(()=>{}); } else { v.pause(); v.currentTime = 0; }
    }
  }

  // init after load to get widths
  window.addEventListener('load', function(){
    // ensure videos loop seamlessly: when one ends, it triggers next
    const allVideos = slides.querySelectorAll('video');
    allVideos.forEach((v, idx) => {
      v.addEventListener('ended', () => {
        show(idx+1);
      });
    });
    show(0);
  });

  if(prev) prev.addEventListener('click', ()=> show(index-1));
  if(next) next.addEventListener('click', ()=> show(index+1));
  setInterval(()=> show(index+1), 6000);
  window.addEventListener('resize', ()=> show(index));
})();

/* Cards booking: open agendamento.html with query params */
(function cardsBooking(){
  document.querySelectorAll('.card').forEach(card=>{
    const btn = card.querySelector('[data-action="book"]');
    const service = card.getAttribute('data-service') || '';
    if(btn){
      btn.addEventListener('click', (e)=>{
        e.stopPropagation();
        const price = card.getAttribute('data-price') || '';
        const qs = `?service=${encodeURIComponent(service)}&price=${encodeURIComponent(price)}`;
        window.location.href = 'agendamento.html' + qs;
      });
    }
    card.addEventListener('click', (e)=>{
      if(e.target && e.target.getAttribute && e.target.getAttribute('data-action')==='book') return;
      const price = card.getAttribute('data-price') || '';
      const qs = `?service=${encodeURIComponent(service)}&price=${encodeURIComponent(price)}`;
      window.location.href = 'agendamento.html' + qs;
    });
  });
})();
