// mini video slider (principal)
(function(){
  const wrapper = document.getElementById('videoSlider');
  if(!wrapper) return;
  const slides = wrapper.querySelectorAll('.slide');
  let idx = 0;
  const prev = document.getElementById('prevBtn');
  const next = document.getElementById('nextBtn');

  function update(){
    const w = slides[0].offsetWidth + 20; // width + gap
    wrapper.style.transform = `translateX(-${idx * w}px)`;
  }
  window.addEventListener('resize', update);
  prev && prev.addEventListener('click', ()=>{ idx = (idx-1+slides.length)%slides.length; update(); });
  next && next.addEventListener('click', ()=>{ idx = (idx+1)%slides.length; update(); });
  // autoplay-like: advance every 5s
  setInterval(()=>{ idx = (idx+1)%slides.length; update(); }, 5000);
  update();
})();

// selecionar serviço a partir do index.html e preencher agendamento
(function(){
  const selectBtns = document.querySelectorAll('.btn-selecionar');
  selectBtns.forEach(btn=>{
    btn.addEventListener('click', (e)=>{
      const card = e.target.closest('.servico-card');
      const name = card.dataset.service || card.querySelector('h3').innerText;
      const price = card.dataset.price || '0';
      // se estivermos na página de agendamento, preencha o select
      try {
        // store in sessionStorage to transfer between pages
        sessionStorage.setItem('selectedServiceName', name);
        sessionStorage.setItem('selectedServicePrice', price);
        // if agendamento page exists, navigate
        window.location.href = 'agendamento.html';
      } catch(err){
        console.log(err);
      }
    });
  });
})();

// agendamento page logic: fill form from sessionStorage, pix toggle, confirm action
(function(){
  if(!document.getElementById('bookingForm')) return;
  const selectedServiceP = document.getElementById('selectedService');
  const serviceSelect = document.getElementById('serviceSelect');
  const paymentType = document.getElementById('paymentType');
  const pixArea = document.getElementById('pixArea');
  const valor50 = document.getElementById('valor50');
  const confirmBtn = document.getElementById('confirmBtn');

  // if came from main page with selection, pre-select
  const storedName = sessionStorage.getItem('selectedServiceName');
  const storedPrice = sessionStorage.getItem('selectedServicePrice');
  if(storedName){
    selectedServiceP.innerText = `${storedName} — R$ ${storedPrice},00`;
    // attempt to set select to matching option
    for(const opt of serviceSelect.options){
      if(opt.value.startsWith(storedName.split('|')[0])){
        serviceSelect.value = opt.value;
        break;
      }
    }
  }

  serviceSelect.addEventListener('change', ()=>{
    const v = serviceSelect.value;
    if(!v){ selectedServiceP.innerText = 'Nenhum'; return; }
    const [name, price] = v.split('|');
    selectedServiceP.innerText = `${name} — R$ ${price},00`;
  });

  paymentType.addEventListener('change', ()=>{
    if(paymentType.value === 'pix'){
      pixArea.style.display = 'block';
      const cur = serviceSelect.value ? serviceSelect.value.split('|')[1] : storedPrice || 0;
      const half = (Number(cur) / 2).toFixed(2);
      valor50.innerText = `Valor 50% antecipado: R$ ${half.replace('.',',')}`;
    } else {
      pixArea.style.display = 'none';
    }
  });

  // Confirm button opens WhatsApp with message and (if pix) indicates pago? (basic)
  confirmBtn.addEventListener('click', ()=>{
    const serv = serviceSelect.value ? serviceSelect.value.split('|')[0] : storedName || '';
    const price = serviceSelect.value ? serviceSelect.value.split('|')[1] : storedPrice || '';
    const nome = document.getElementById('nome').value || '';
    const tel = document.getElementById('telefone').value || '';
    const data = document.getElementById('data').value || '';
    const hora = document.getElementById('hora').value || '';
    const pg = paymentType.value;

    if(!serv || !nome || !tel || !data || !hora || !pg){
      alert('Preencha todos os campos e escolha forma de pagamento.');
      return;
    }

    let msg = `Olá, meu nome é ${nome}. Gostaria de agendar *${serv}* (R$ ${price}) no dia ${data} às ${hora}. Forma de pagamento: ${pg === 'pix' ? 'PIX (50% antecipado)' : 'Pagamento no local (antes do início)'}.\n`;
    if(pg === 'pix'){
      msg += `Já realizei o pagamento de 50% / vou enviar comprovante.`;
    }

    // número: ajuste para o número real (formato internacional sem +)
    const numero = '5521999999999';
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  });
})();
