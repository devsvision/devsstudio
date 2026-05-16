const routes = {
  home: {
    title: 'DEVS Studio | Integrated Technology & Business Solutions',
    path: 'pages/home.html'
  },
  services: {
    title: 'Services | DEVS Studio',
    path: 'pages/services.html'
  },
  about: {
    title: 'About | DEVS Studio',
    path: 'pages/about.html'
  },
  portfolio: {
    title: 'Portfolio | DEVS Studio',
    path: 'pages/portfolio.html'
  },
  contact: {
    title: 'Contact | DEVS Studio',
    path: 'pages/contact.html'
  }
};

const defaultRoute = 'home';

const getCurrentRoute = () => {
  const routeName = window.location.hash.replace('#', '').trim();
  return routes[routeName] ? routeName : defaultRoute;
};

const getRoute = (routeName = getCurrentRoute()) => {
  return routes[routeName] || routes[defaultRoute];
};

const navigateTo = (routeName) => {
  const nextRoute = routes[routeName] ? routeName : defaultRoute;

  if (getCurrentRoute() === nextRoute && window.location.hash) {
    return;
  }

  window.location.hash = nextRoute;
};

const bindNavigation = (root = document) => {
  root.querySelectorAll('[data-route]').forEach((link) => {
    const routeName = link.dataset.route || defaultRoute;
    link.setAttribute('href', `#${routeName}`);
  });
};

const setActiveRoute = (routeName) => {
  document.querySelectorAll('[data-route]').forEach((link) => {
    const isActive = link.dataset.route === routeName;
    link.classList.toggle('text-electric', isActive);
    link.classList.toggle('is-active', isActive);
    link.setAttribute('aria-current', isActive ? 'page' : 'false');
  });
};

export {
  routes,
  defaultRoute,
  getCurrentRoute,
  getRoute,
  navigateTo,
  bindNavigation,
  setActiveRoute
};
