const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let revealObserver;
let activeParticleLayer;

const revealVisibleElements = (root = document) => {
  root.querySelectorAll('.reveal').forEach((element) => {
    element.classList.add('is-visible');
  });
};

const refreshRevealObserver = (root = document) => {
  if (revealObserver) {
    revealObserver.disconnect();
  }

  if (prefersReducedMotion.matches || !('IntersectionObserver' in window)) {
    revealVisibleElements(root);
    return;
  }

  revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.14,
    rootMargin: '0px 0px -56px 0px'
  });

  root.querySelectorAll('.reveal:not(.is-visible)').forEach((element) => {
    revealObserver.observe(element);
  });
};

const initAnimations = (root = document) => {
  initHeroParticles(root);
  bindSmoothScroll(root);
  bindStaticForms(root);
};

const bindSmoothScroll = (root) => {
  root.querySelectorAll('[data-scroll-target]').forEach((link) => {
    if (link.dataset.scrollBound) return;

    link.dataset.scrollBound = 'true';
    link.addEventListener('click', (event) => {
      const target = document.querySelector(link.dataset.scrollTarget);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({
        behavior: prefersReducedMotion.matches ? 'auto' : 'smooth',
        block: 'start'
      });
    }, { passive: false });
  });
};

const bindStaticForms = (root) => {
  root.querySelectorAll('form').forEach((form) => {
    if (form.dataset.formBound) return;

    form.dataset.formBound = 'true';
    form.addEventListener('submit', (event) => {
      event.preventDefault();
    });
  });
};

const initHeroParticles = (root) => {
  const particleLayer = root.querySelector('.hero-particles') || document.querySelector('.hero-particles');
  if (!particleLayer) return;

  if (prefersReducedMotion.matches) {
    particleLayer.innerHTML = '';
    return;
  }

  if (activeParticleLayer === particleLayer && particleLayer.children.length > 0) return;

  activeParticleLayer = particleLayer;
  const particleCount = window.matchMedia('(max-width: 640px)').matches ? 18 : 36;
  const particles = Array.from({ length: particleCount }, (_, index) => createParticle(index)).join('');

  particleLayer.innerHTML = particles;
};

const createParticle = (index) => {
  const size = 2 + (index % 4);
  const x = Math.round((index * 23) % 100);
  const y = Math.round((index * 41) % 100);
  const driftX = (index % 2 === 0 ? 1 : -1) * (12 + (index % 6) * 5);
  const driftY = -18 - (index % 7) * 6;
  const duration = 10 + (index % 9);
  const delay = -1 * (index % 8);
  const opacity = 0.25 + (index % 5) * 0.1;

  return `<span class="hero-particle" style="--size:${size}px;--x:${x}%;--y:${y}%;--drift-x:${driftX}px;--drift-y:${driftY}px;--duration:${duration}s;--delay:${delay}s;--opacity:${opacity}"></span>`;
};

export { initAnimations, refreshRevealObserver };
