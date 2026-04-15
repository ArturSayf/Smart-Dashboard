import { initUI } from './core/uiContainer.js';
import { initRouter } from './core/router.js';

function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then(reg => console.log('SW registered'))
        .catch(err => console.log('SW failed', err));
    });
  }
}

function initApp() {
  initUI();
  initRouter();
  registerServiceWorker();
}

initApp();