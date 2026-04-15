import { navigate } from './router.js';

// Функция для инициализации темы при загрузке
function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeButtonText(savedTheme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeButtonText(newTheme);
}

function updateThemeButtonText(theme) {
  const btn = document.getElementById('theme-toggle-btn');
  if (btn) {
    btn.textContent = theme === 'light' ? '🌙' : '☀️';
  }
}

export function initUI() {
  initTheme(); // применяем сохранённую тему

  const app = document.getElementById('app');
  app.innerHTML = `
    <header class="app-header">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <h1>Smart Dashboard</h1>
        <button id="theme-toggle-btn" style="background: none; border: none; font-size: 1.5rem; cursor: pointer;">🌙</button>
      </div>
    </header>
    <main id="main-content"></main>
    <nav class="nav-bar">
      <button class="nav-btn" data-path="/profile">👤 Профиль</button>
      <button class="nav-btn" data-path="/notes">📝 Заметки</button>
      <button class="nav-btn" data-path="/habits">✅ Привычки</button>
      <button class="nav-btn" data-path="/stats">📊 Статистика</button>
    </nav>
  `;

  // Обработчик кнопки темы
  const themeBtn = document.getElementById('theme-toggle-btn');
  themeBtn.addEventListener('click', toggleTheme);

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