let routes = {};
let defaultRoute = '/profile';

export function initRouter() {
  routes = {
    '/profile': () => import('../modules/profile/profileUI.js').then(m => m.render()),
    '/notes': () => import('../modules/notes/notesUI.js').then(m => m.render()),
    '/habits': () => import('../modules/habits/habitsUI.js').then(m => m.render()),
    '/stats': () => import('../modules/stats/statsUI.js').then(m => m.render()),
  };

  window.addEventListener('popstate', handleRoute);
  handleRoute();
}

export function navigate(path) {
  history.pushState({}, '', path);
  handleRoute();
}

function handleRoute() {
  const path = window.location.pathname;
  const route = routes[path] ? path : defaultRoute;
  routes[route]();
}