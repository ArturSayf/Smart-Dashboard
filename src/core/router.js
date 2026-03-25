import { renderNotesUI } from '../modules/notes/notesUI.js';
import { renderDailyDataUI } from '../modules/dailyData/dailyDataUI.js';
import { renderStatisticsUI } from '../modules/statistics/statisticsUI.js';

let currentPath = '/notes';

// Маршруты и их рендер-функции
const routes = {
    '/notes': renderNotesUI,
    '/habits': renderDailyDataUI,
    '/statistics': renderStatisticsUI
};

export function initRouter() {
    window.addEventListener('popstate', () => {
        handleRoute();
    });
    handleRoute();
}

export function navigate(path) {
    if (path !== currentPath) {
        history.pushState({}, '', path);
        handleRoute();
    }
}

function handleRoute() {
    const path = window.location.pathname;
    const render = routes[path] || routes['/notes'];
    if (render) {
        currentPath = path;
        render();
    }
}