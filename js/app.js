import {
  injectHTML,
  loadComponents,
  loadComponentSlots,
  hideLoader
} from './loader.js?v=20260515-header2';
import {
  getCurrentRoute,
  getRoute,
  navigateTo,
  bindNavigation,
  setActiveRoute
} from './router.js?v=20260515-header2';
import { initAnimations, refreshRevealObserver } from './animations.js?v=20260515-header2';
import { businessDivisions } from './data.js?v=20260515-header2';

const appRoot = document.getElementById('page-root');

const shell = `
  <div class="relative min-h-screen overflow-hidden">
    <div id="section-navbar"></div>
    <main id="section-content" class="relative overflow-hidden">
      <div id="page-frame" class="page-frame opacity-0 transition-all duration-500"></div>
    </main>
    <div id="section-footer"></div>
  </div>
`;

const wait = (duration = 180) => new Promise((resolve) => setTimeout(resolve, duration));

const languages = {
  en: {
    code: 'EN',
    flagClass: 'flag-en',
    title: 'DEVS Studio | Integrated Technology & Business Solutions',
    routeTitles: {
      home: 'DEVS Studio | Integrated Technology & Business Solutions',
      services: 'Services | DEVS Studio',
      about: 'About | DEVS Studio',
      portfolio: 'Portfolio | DEVS Studio',
      contact: 'Contact | DEVS Studio'
    },
    labels: {
      'nav.home': 'Home',
      'nav.about': 'About',
      'nav.services': 'Services',
      'nav.portfolio': 'Portfolio',
      'nav.contact': 'Contact',
      'loader.text': 'Loading DEVS Studio',
      'hero.title': 'Integrated Technology & Business Solutions',
      'hero.copy': 'From infrastructure to innovation - powering modern businesses with smart systems and digital transformation.',
      'hero.primaryCta': 'Explore Services',
      'hero.secondaryCta': 'Contact Us',
      'hero.cardInfrastructure': 'Secure networks, CCTV, fiber optic, and smart sites.',
      'hero.cardInnovation': 'Web platforms, mobile apps, and business systems.',
      'hero.cardOperations': 'Property, OTA, accounting, tax, and financial clarity.',
      'about.kicker': 'About',
      'about.title': 'A studio model for integrated technology and business growth.',
      'about.copy1': 'DEVS Studio helps companies connect the practical layers of growth: physical infrastructure, network reliability, software systems, property operations, and financial clarity.',
      'about.copy2': 'The result is a leaner partner relationship and a more coherent operating environment, especially for founders, hospitality operators, and growing service businesses.',
      'services.kicker': 'Services',
      'services.title': 'A full-stack partner for modern operations.',
      'services.copy': 'DEVS Studio unifies technical infrastructure, digital products, property operations, and financial advisory so business owners can build on one coordinated foundation.',
      'services.card1Title': 'Infrastructure Deployment',
      'services.card1Copy': 'Security cameras, network cabling, fiber optic rollout, WiFi planning, and smart site readiness.',
      'services.card2Title': 'Digital Transformation',
      'services.card2Copy': 'Web platforms, mobile applications, dashboards, business systems, and operational automation.',
      'services.card3Title': 'Business Operations',
      'services.card3Copy': 'Property workflows, guesthouse systems, OTA integration, accounting, tax, and finance consulting.',
      'services.card4Title': 'Property Systems',
      'services.card4Copy': 'Villa management, guesthouse workflows, booking coordination, and owner reporting for hospitality teams.',
      'services.card5Title': 'Finance Advisory',
      'services.card5Copy': 'Accounting, tax support, financial consulting, and reporting clarity for confident business decisions.',
      'divisions.kicker': 'DEVS Studio Services',
      'divisions.title': 'Five futuristic divisions for modern business infrastructure.',
      'divisions.copy': 'Security, networks, software, property systems, and finance operations designed as one connected technology ecosystem.',
      'portfolio.kicker': 'Portfolio',
      'portfolio.title': 'Built for sites, teams, and systems that cannot afford friction.',
      'portfolio.copy': 'The portfolio is designed as a flexible showcase for security deployments, network rollouts, custom applications, hospitality operations, and finance transformation projects.',
      'portfolio.card1Label': 'Hospitality Stack',
      'portfolio.card1Title': 'Villa operations platform',
      'portfolio.card1Copy': 'Booking workflows, guest communications, OTA coordination, reporting, and owner visibility.',
      'portfolio.card2Label': 'Smart Infrastructure',
      'portfolio.card2Title': 'Secure connected property',
      'portfolio.card2Copy': 'CCTV, LAN, fiber optic uplink, access points, and performance monitoring for business sites.',
      'portfolio.card3Label': 'Business Systems',
      'portfolio.card3Title': 'Executive control dashboard',
      'portfolio.card3Copy': 'A unified system concept for finance, asset status, property performance, customer workflows, and operational health.',
      'contact.kicker': 'Contact',
      'contact.title': 'Start with a smarter foundation.',
      'contact.copy': 'Tell DEVS Studio what you are building, operating, or upgrading. The team can shape a practical roadmap across infrastructure, digital systems, and business operations.',
      'contact.fastTitle': 'Prefer a faster response?',
      'contact.fastCopy': 'Contact DEVS Studio directly on WhatsApp at',
      'contact.whatsappCta': 'Chat via WhatsApp',
      'contact.nameLabel': 'Name',
      'contact.emailLabel': 'Email',
      'contact.projectLabel': 'Project type',
      'contact.messageLabel': 'Message',
      'contact.submit': 'Send Inquiry',
      'contact.continueWhatsapp': 'Continue on WhatsApp',
      'footer.title': 'Integrated Technology & Business Solutions',
      'footer.copy': 'Security, network, software, property operations, and finance services for modern businesses.',
      'footer.explore': 'Explore',
      'footer.about': 'About Us',
      'footer.global': 'Global-ready static website',
      'footer.copyright': 'Copyright 2026 DEVS Studio. All rights reserved.'
    },
    placeholders: {
      'contact.namePlaceholder': 'Your name',
      'contact.messagePlaceholder': 'Tell us about your business needs'
    }
  },
  id: {
    code: 'ID',
    flagClass: 'flag-id',
    title: 'DEVS Studio | Solusi Teknologi & Bisnis Terintegrasi',
    routeTitles: {
      home: 'DEVS Studio | Solusi Teknologi & Bisnis Terintegrasi',
      services: 'Layanan | DEVS Studio',
      about: 'Tentang | DEVS Studio',
      portfolio: 'Portofolio | DEVS Studio',
      contact: 'Kontak | DEVS Studio'
    },
    labels: {
      'nav.home': 'Beranda',
      'nav.about': 'Tentang',
      'nav.services': 'Layanan',
      'nav.portfolio': 'Portofolio',
      'nav.contact': 'Kontak',
      'loader.text': 'Memuat DEVS Studio',
      'hero.title': 'Solusi Teknologi & Bisnis Terintegrasi',
      'hero.copy': 'Dari infrastruktur hingga inovasi - membantu bisnis modern dengan sistem cerdas dan transformasi digital.',
      'hero.primaryCta': 'Lihat Layanan',
      'hero.secondaryCta': 'Hubungi Kami',
      'hero.cardInfrastructure': 'Jaringan aman, CCTV, fiber optic, dan lokasi pintar.',
      'hero.cardInnovation': 'Platform web, aplikasi mobile, dan sistem bisnis.',
      'hero.cardOperations': 'Properti, OTA, akuntansi, pajak, dan kejelasan finansial.',
      'about.kicker': 'Tentang',
      'about.title': 'Model studio untuk pertumbuhan teknologi dan bisnis yang terintegrasi.',
      'about.copy1': 'DEVS Studio membantu perusahaan menghubungkan lapisan penting pertumbuhan: infrastruktur fisik, keandalan jaringan, sistem software, operasional properti, dan kejelasan finansial.',
      'about.copy2': 'Hasilnya adalah hubungan kerja yang lebih ringkas dan lingkungan operasional yang lebih selaras, terutama untuk founder, operator hospitality, dan bisnis jasa yang sedang bertumbuh.',
      'services.kicker': 'Layanan',
      'services.title': 'Partner full-stack untuk operasional modern.',
      'services.copy': 'DEVS Studio menyatukan infrastruktur teknis, produk digital, operasional properti, dan advisory keuangan agar pemilik bisnis bisa membangun di atas fondasi yang terkoordinasi.',
      'services.card1Title': 'Penerapan Infrastruktur',
      'services.card1Copy': 'Kamera keamanan, kabel jaringan, pemasangan fiber optic, perencanaan WiFi, dan kesiapan lokasi pintar.',
      'services.card2Title': 'Transformasi Digital',
      'services.card2Copy': 'Platform web, aplikasi mobile, dashboard, sistem bisnis, dan otomatisasi operasional.',
      'services.card3Title': 'Operasional Bisnis',
      'services.card3Copy': 'Alur kerja properti, sistem guesthouse, integrasi OTA, akuntansi, pajak, dan konsultasi keuangan.',
      'services.card4Title': 'Sistem Properti',
      'services.card4Copy': 'Manajemen villa, alur kerja guesthouse, koordinasi pemesanan, dan laporan owner untuk tim hospitality.',
      'services.card5Title': 'Advisory Keuangan',
      'services.card5Copy': 'Akuntansi, dukungan pajak, konsultasi keuangan, dan laporan yang jelas untuk keputusan bisnis yang percaya diri.',
      'divisions.kicker': 'Layanan DEVS Studio',
      'divisions.title': 'Lima divisi futuristik untuk infrastruktur bisnis modern.',
      'divisions.copy': 'Keamanan, jaringan, software, sistem properti, dan operasional keuangan yang dirancang sebagai satu ekosistem teknologi terhubung.',
      'portfolio.kicker': 'Portofolio',
      'portfolio.title': 'Dibangun untuk lokasi, tim, dan sistem yang membutuhkan alur kerja tanpa hambatan.',
      'portfolio.copy': 'Portofolio ini dirancang sebagai showcase fleksibel untuk penerapan keamanan, rollout jaringan, aplikasi kustom, operasional hospitality, dan proyek transformasi keuangan.',
      'portfolio.card1Label': 'Hospitality Stack',
      'portfolio.card1Title': 'Platform operasional villa',
      'portfolio.card1Copy': 'Alur pemesanan, komunikasi tamu, koordinasi OTA, pelaporan, dan visibilitas untuk owner.',
      'portfolio.card2Label': 'Infrastruktur Cerdas',
      'portfolio.card2Title': 'Properti aman dan terhubung',
      'portfolio.card2Copy': 'CCTV, LAN, uplink fiber optic, access point, dan monitoring performa untuk lokasi bisnis.',
      'portfolio.card3Label': 'Sistem Bisnis',
      'portfolio.card3Title': 'Dashboard kontrol eksekutif',
      'portfolio.card3Copy': 'Konsep sistem terpadu untuk keuangan, status aset, performa properti, alur pelanggan, dan kesehatan operasional.',
      'contact.kicker': 'Kontak',
      'contact.title': 'Mulai dengan fondasi yang lebih cerdas.',
      'contact.copy': 'Ceritakan apa yang sedang Anda bangun, operasikan, atau tingkatkan. Tim DEVS Studio dapat menyusun roadmap praktis untuk infrastruktur, sistem digital, dan operasional bisnis.',
      'contact.fastTitle': 'Butuh respons lebih cepat?',
      'contact.fastCopy': 'Hubungi DEVS Studio langsung melalui WhatsApp di',
      'contact.whatsappCta': 'Chat via WhatsApp',
      'contact.nameLabel': 'Nama',
      'contact.emailLabel': 'Email',
      'contact.projectLabel': 'Jenis proyek',
      'contact.messageLabel': 'Pesan',
      'contact.submit': 'Kirim Permintaan',
      'contact.continueWhatsapp': 'Lanjutkan di WhatsApp',
      'footer.title': 'Solusi Teknologi & Bisnis Terintegrasi',
      'footer.copy': 'Layanan keamanan, jaringan, software, operasional properti, dan keuangan untuk bisnis modern.',
      'footer.explore': 'Jelajahi',
      'footer.about': 'Tentang Kami',
      'footer.global': 'Website statis siap global',
      'footer.copyright': 'Hak cipta 2026 DEVS Studio. Seluruh hak dilindungi.'
    },
    placeholders: {
      'contact.namePlaceholder': 'Nama Anda',
      'contact.messagePlaceholder': 'Ceritakan kebutuhan bisnis Anda'
    }
  }
};

const renderShell = async () => {
  await loadComponentSlots(document);
  appRoot.innerHTML = shell;

  await loadComponents([
    { target: '#section-navbar', path: 'components/navbar.html' },
    { target: '#section-footer', path: 'components/footer.html' }
  ]);

  bindNavigation();
  bindShellEvents();
  bindLanguageSwitcher();
  bindStickyHeader();
};

const bindShellEvents = () => {
  const menuButton = document.querySelector('#mobile-menu-button');
  const mobileMenu = document.querySelector('#mobile-menu');

  menuButton?.addEventListener('click', () => {
    const isOpen = !mobileMenu?.classList.contains('hidden');
    mobileMenu?.classList.toggle('hidden');
    menuButton.setAttribute('aria-expanded', String(!isOpen));
  });

  document.addEventListener('click', (event) => {
    const routeLink = event.target.closest('[data-route]');
    if (!routeLink) return;

    event.preventDefault();
    navigateTo(routeLink.dataset.route);
    closeMobileMenu();
  });
};

const getSavedLanguage = () => {
  const savedLanguage = localStorage.getItem('devs-language');
  return languages[savedLanguage] ? savedLanguage : 'id';
};

const applyLanguage = (languageKey) => {
  const language = languages[languageKey] || languages.en;

  document.documentElement.lang = languageKey === 'id' ? 'id' : 'en';
  document.querySelectorAll('[data-language-flag]').forEach((flag) => {
    flag.classList.remove('flag-en', 'flag-id');
    flag.classList.add(language.flagClass);
  });
  document.querySelectorAll('[data-language-label]').forEach((label) => {
    label.textContent = language.code;
  });
  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const translation = language.labels[element.dataset.i18n];
    if (translation) element.textContent = translation;
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach((element) => {
    const translation = language.placeholders[element.dataset.i18nPlaceholder];
    if (translation) element.setAttribute('placeholder', translation);
  });
  document.querySelectorAll('[data-language-option]').forEach((option) => {
    const isActive = option.dataset.languageOption === languageKey;
    option.classList.toggle('is-active', isActive);
    option.setAttribute('aria-current', isActive ? 'true' : 'false');
  });
  document.title = language.routeTitles[getCurrentRoute()] || language.title;
};

const closeLanguageMenu = () => {
  const languageButton = document.querySelector('#language-button');
  const languageMenu = document.querySelector('#language-menu');

  languageMenu?.classList.add('hidden');
  languageButton?.setAttribute('aria-expanded', 'false');
};

const bindLanguageSwitcher = () => {
  const languageButton = document.querySelector('#language-button');
  const languageMenu = document.querySelector('#language-menu');

  applyLanguage(getSavedLanguage());

  languageButton?.addEventListener('click', (event) => {
    event.stopPropagation();
    const isOpen = !languageMenu?.classList.contains('hidden');
    languageMenu?.classList.toggle('hidden');
    languageButton.setAttribute('aria-expanded', String(!isOpen));
  });

  document.querySelectorAll('[data-language-option]').forEach((option) => {
    option.addEventListener('click', (event) => {
      event.stopPropagation();
      const languageKey = option.dataset.languageOption;
      localStorage.setItem('devs-language', languageKey);
      renderDivisionCards();
      applyLanguage(languageKey);
      closeLanguageMenu();
    });
  });

  document.addEventListener('click', closeLanguageMenu);
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeLanguageMenu();
  });
};

const closeMobileMenu = () => {
  const menuButton = document.querySelector('#mobile-menu-button');
  const mobileMenu = document.querySelector('#mobile-menu');

  mobileMenu?.classList.add('hidden');
  menuButton?.setAttribute('aria-expanded', 'false');
};

const bindStickyHeader = () => {
  const header = document.getElementById('site-header');
  if (!header) return;

  const updateHeaderState = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 24);
  };

  updateHeaderState();
  window.addEventListener('scroll', updateHeaderState, { passive: true });
};

const transitionOut = async (pageFrame) => {
  pageFrame.classList.add('page-exit');
  pageFrame.classList.remove('page-enter');
  await wait(180);
};

const transitionIn = (pageFrame) => {
  requestAnimationFrame(() => {
    pageFrame.classList.remove('page-exit', 'opacity-0');
    pageFrame.classList.add('page-enter');
  });
};

const renderDivisionCards = () => {
  const container = document.querySelector('[data-division-cards]');
  if (!container) return;
  const languageKey = getSavedLanguage();

  container.innerHTML = businessDivisions.map((division, index) => `
    <article class="service-card reveal group relative flex min-h-[25rem] overflow-hidden rounded-2xl border border-white/10 bg-[#07101f]/72 p-6 shadow-soft backdrop-blur-2xl transition duration-500 hover:-translate-y-2 hover:border-electric/45 hover:shadow-[0_0_70px_rgba(14,165,233,0.22)]" style="--delay:${index * 80}ms">
      <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(34,211,238,0.18),transparent_35%)] opacity-0 transition duration-500 group-hover:opacity-100"></div>
      <div class="pointer-events-none absolute -right-14 -top-14 h-32 w-32 rounded-full bg-electric/10 blur-3xl transition duration-500 group-hover:bg-electric/20"></div>

      <div class="relative z-10 flex w-full flex-col">
        <div class="flex items-start justify-between gap-4">
          <div class="service-icon-wrap">
            ${getDivisionIcon(division.icon)}
          </div>
          <span class="rounded-full border border-electric/20 bg-electric/10 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.22em] text-electric/90">${String(index + 1).padStart(2, '0')}</span>
        </div>

        <p class="mt-7 flex min-h-10 items-start text-xs font-bold uppercase leading-5 tracking-[0.26em] text-electric/80">${getDivisionContent(division, languageKey).label}</p>
        <h3 class="mt-4 flex min-h-16 items-start text-2xl font-semibold leading-tight text-white">${division.name}</h3>
        <p class="mt-3 text-sm leading-7 text-slate-400">${getDivisionContent(division, languageKey).description}</p>

        <ul class="mt-auto space-y-3 pt-8 text-sm text-slate-300">
          ${getDivisionContent(division, languageKey).services.map((service) => `
            <li class="flex items-center gap-3">
              <span class="h-1.5 w-1.5 rounded-full bg-electric shadow-[0_0_16px_rgba(34,211,238,0.75)]"></span>
              <span>${service}</span>
            </li>
          `).join('')}
        </ul>
      </div>
    </article>
  `).join('');
};

const getDivisionContent = (division, languageKey) => {
  return division.translations?.[languageKey] || {
    label: division.label,
    description: division.description,
    services: division.services
  };
};

const getDivisionIcon = (icon) => {
  const iconClass = 'h-7 w-7';
  const icons = {
    shield: `<svg class="${iconClass}" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><path d="M12 3l7 3v5c0 4.6-2.8 8.6-7 10-4.2-1.4-7-5.4-7-10V6l7-3Z" stroke-width="1.8" stroke-linejoin="round"/><path d="M9.5 12l1.7 1.7 3.6-4" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    network: `<svg class="${iconClass}" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><path d="M12 5v5m0 0L6 15m6-5 6 5" stroke-width="1.8" stroke-linecap="round"/><circle cx="12" cy="4" r="2" stroke-width="1.8"/><circle cx="5" cy="17" r="2" stroke-width="1.8"/><circle cx="19" cy="17" r="2" stroke-width="1.8"/></svg>`,
    code: `<svg class="${iconClass}" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><path d="M8 9l-3 3 3 3m8-6 3 3-3 3M14 5l-4 14" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    property: `<svg class="${iconClass}" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><path d="M4 20h16M6 20V9l6-5 6 5v11M9 20v-6h6v6" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    finance: `<svg class="${iconClass}" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><path d="M4 19V5m0 14h16M8 16v-5m4 5V8m4 8v-3" stroke-width="1.8" stroke-linecap="round"/><path d="M7 7h10" stroke-width="1.8" stroke-linecap="round"/></svg>`
  };

  return icons[icon] || icons.code;
};

const hydratePage = async (pageFrame, routeName) => {
  await loadComponentSlots(pageFrame);
  renderDivisionCards();
  applyLanguage(getSavedLanguage());
  bindNavigation(pageFrame);
  initAnimations(pageFrame);
  refreshRevealObserver(pageFrame);
  setActiveRoute(routeName);
};

const renderPage = async () => {
  const routeName = getCurrentRoute();
  const route = getRoute(routeName);
  const pageFrame = document.getElementById('page-frame');

  if (!pageFrame) return;

  await transitionOut(pageFrame);
  await injectHTML(pageFrame, route.path);
  await hydratePage(pageFrame, routeName);

  document.title = languages[getSavedLanguage()].routeTitles[routeName] || route.title;
  transitionIn(pageFrame);
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const renderError = (error) => {
  console.error(error);

  const isFilePreview = window.location.protocol === 'file:';
  const message = error?.message || 'Unknown loading error';
  appRoot.innerHTML = `
    <main class="min-h-screen px-6 py-24">
      <div class="mx-auto max-w-3xl rounded-2xl border border-red-400/30 bg-red-950/30 p-8 text-red-100">
        <p class="text-lg font-semibold">Unable to load DEVS Studio components.</p>
        <p class="mt-3 text-sm leading-7 text-red-100/85">
          ${isFilePreview ? 'This page is opened with file://, so the browser blocks fetch() from loading HTML partials.' : 'Check that this server is rooted at the DEVS Studio project folder.'}
        </p>
        <div class="mt-5 rounded-xl border border-white/10 bg-black/30 p-4 text-sm text-slate-100">
          <p class="font-semibold text-white">Run from this folder:</p>
          <code class="mt-2 block text-electric">python -m http.server 3002 --bind 127.0.0.1</code>
          <p class="mt-3 font-semibold text-white">Then open:</p>
          <code class="mt-2 block text-electric">http://127.0.0.1:3002</code>
        </div>
        <details class="mt-5 text-xs text-red-100/75">
          <summary class="cursor-pointer text-red-100">Technical detail</summary>
          <code class="mt-3 block whitespace-pre-wrap break-words rounded-xl border border-white/10 bg-black/30 p-4">${message}</code>
        </details>
      </div>
    </main>
  `;
};

const init = async () => {
  try {
    await renderShell();
    await renderPage();
    window.addEventListener('hashchange', renderPage);
  } catch (error) {
    renderError(error);
  } finally {
    hideLoader();
  }
};

window.addEventListener('DOMContentLoaded', init);
