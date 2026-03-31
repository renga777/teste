/* ===== CORAÇÕES FLUTUANTES ===== */
(function spawnHearts() {
  const container = document.getElementById('heartsContainer');
  const emojis = ['❤️', '💕', '💗', '💖', '🌸', '✨'];

  function createHeart() {
    const el = document.createElement('span');
    el.classList.add('floating-heart');
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];

    const size   = Math.random() * .8 + .6;          // 0.6 – 1.4rem
    const left   = Math.random() * 100;               // % horizontal
    const dur    = Math.random() * 8 + 7;             // 7 – 15s
    const delay  = Math.random() * 6;                 // 0 – 6s

    el.style.cssText = `
      left: ${left}%;
      font-size: ${size}rem;
      animation-duration: ${dur}s;
      animation-delay: ${delay}s;
    `;

    container.appendChild(el);
    setTimeout(() => el.remove(), (dur + delay) * 1000);
  }

  // Cria 8 corações iniciais e depois 1 a cada 1.5s
  for (let i = 0; i < 8; i++) createHeart();
  setInterval(createHeart, 1500);
})();


/* ===== SCROLL REVEAL ===== */
(function initReveal() {
  const items = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Pequeno delay escalonado para cards consecutivos
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  items.forEach(item => observer.observe(item));
})();


/* ===== MÚSICA DE FUNDO ===== */
(function initMusic() {
  const btn   = document.getElementById('musicBtn');
  const audio = document.getElementById('bgMusic');
  const icon  = btn.querySelector('.music-icon');
  let playing = false;

  btn.addEventListener('click', () => {
    if (playing) {
      audio.pause();
      icon.textContent = '🎵';
      btn.classList.remove('playing');
      btn.title = 'Tocar música';
    } else {
      audio.play().catch(() => {
        // Navegador bloqueou autoplay — tudo bem, usuário clicou
      });
      icon.textContent = '⏸️';
      btn.classList.add('playing');
      btn.title = 'Pausar música';
    }
    playing = !playing;
  });

  // Se o áudio terminar (sem loop) reseta o botão
  audio.addEventListener('ended', () => {
    playing = false;
    icon.textContent = '🎵';
    btn.classList.remove('playing');
  });
})();
