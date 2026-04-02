import { navigate } from './router.js';

export function initUI() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <header class="app-header">
            <h1>📅 Мой день</h1>
            <nav class="tab-bar">
                <button data-path="/profile" class="tab-btn">👤 Профиль</button>
                <button data-path="/notes" class="tab-btn">📝 Заметки</button>
                <button data-path="/habits" class="tab-btn">✅ Привычки</button>
                <button data-path="/tracker" class="tab-btn">📊 Статистика</button>
            </nav>
        </header>
        <main id="main-content"></main>
    `;

    document.querySelectorAll('[data-path]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            navigate(btn.dataset.path);
        });
    });
    const currentPath = window.location.pathname;
    const activeBtn = document.querySelector(`[data-path="${currentPath}"]`);
    if (activeBtn) activeBtn.classList.add('active');
    else document.querySelector('[data-path="/profile"]').classList.add('active');
}

export function getMainContainer() {
    return document.getElementById('main-content');
}