import { navigate } from './router.js';

export function initUI() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <header class="app-header">
      <h1>Smart Dashboard</h1>
    </header>
    <main id="main-content"></main>
    <nav class="nav-bar">
      <button class="nav-btn" data-path="/profile">👤 Профиль</button>
      <button class="nav-btn" data-path="/notes">📝 Заметки</button>
      <button class="nav-btn" data-path="/habits">✅ Привычки</button>
      <button class="nav-btn" data-path="/stats">📊 Статистика</button>
    </nav>
  `;

  // Подсветка активной кнопки
  const buttons = app.querySelectorAll('[data-path]');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const path = btn.dataset.path;
      navigate(path);
      updateActiveNav(path);
    });
  });

  updateActiveNav(window.location.pathname);
}

function updateActiveNav(currentPath) {
  document.querySelectorAll('[data-path]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.path === currentPath);
  });
}

export function getMainContainer() {
  return document.getElementById('main-content');
}