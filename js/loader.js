const cache = new Map();

const normalizePath = (path) => path.replace(/^\/+/, '');

const getCandidatePaths = (path) => {
  const cleanPath = normalizePath(path);
  const basePath = window.location.pathname.replace(/\/[^/]*$/, '/');
  const candidates = [
    cleanPath,
    `${basePath}${cleanPath}`.replace(/\/{2,}/g, '/'),
    `/${cleanPath}`
  ];

  return [...new Set(candidates)];
};

const requestPartial = async (path) => {
  const cleanPath = normalizePath(path);

  if (cache.has(cleanPath)) {
    return cache.get(cleanPath);
  }

  let lastError;

  for (const candidate of getCandidatePaths(cleanPath)) {
    try {
      const response = await fetch(candidate, { cache: 'no-cache' });

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      const html = await response.text();
      cache.set(cleanPath, html);
      return html;
    } catch (error) {
      lastError = `${candidate}: ${error.message}`;
    }
  }

  throw new Error(`Unable to load partial "${cleanPath}". Tried: ${getCandidatePaths(cleanPath).join(', ')}. Last error: ${lastError}`);
};

const injectHTML = async (target, path) => {
  const element = typeof target === 'string' ? document.querySelector(target) : target;

  if (!element) {
    throw new Error(`Mount target not found: ${target}`);
  }

  element.innerHTML = await requestPartial(path);
  return element;
};

const loadComponent = ({ target, path }) => injectHTML(target, path);

const loadComponents = (components) => Promise.all(components.map(loadComponent));

const loadComponentSlots = async (root = document) => {
  const slots = [...root.querySelectorAll('[data-component]')];

  await Promise.all(slots.map(async (slot) => {
    const path = slot.dataset.component;
    slot.innerHTML = await requestPartial(path);
    slot.removeAttribute('data-component');
  }));

  return slots;
};

const hideLoader = () => {
  const loader = document.getElementById('loader');
  if (!loader) return;

  requestAnimationFrame(() => {
    loader.classList.add('is-hidden');
    setTimeout(() => loader.remove(), 520);
  });
};

export {
  requestPartial,
  injectHTML,
  loadComponent,
  loadComponents,
  loadComponentSlots,
  hideLoader
};
