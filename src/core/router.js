const routes = {
    '/profile': () => import('../modules/profile/profileUI.js').then(m => m.renderProfileUI()),
    '/notes':   () => import('../modules/notes/notesUI.js').then(m => m.renderNotesUI()),
    '/habits':  () => import('../modules/habits/habitsUI.js').then(m => m.renderHabitsUI()),
    '/tracker': () => import('../modules/tracker/trackerUI.js').then(m => m.renderTrackerUI())
};
const defaultRoute = '/profile';

export function initRouter() {
    window.addEventListener('popstate', handleRoute);
    handleRoute();
}

export function navigate(path) {
    history.pushState({}, '', path);
    handleRoute();
}

function handleRoute() {
    const path = window.location.pathname;
    const handler = routes[path] || routes[defaultRoute];
    if (handler) handler();
}