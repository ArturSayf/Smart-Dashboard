import { initUI } from './core/uiContainer.js';
import { initRouter } from './core/router.js';
import { initData } from './core/dataService.js';

function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/src/serviceWorker.js')
                .then(reg => console.log('✅ SW registered', reg))
                .catch(err => console.error('❌ SW error', err));
        });
    }
}

function initApp() {
    initData();
    initUI();
    initRouter();
    registerServiceWorker();
}

initApp();