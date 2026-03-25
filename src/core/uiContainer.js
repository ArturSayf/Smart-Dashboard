import { navigate } from './router.js';

let mainContainer = null;

export function initUI() {
    const app = document.getElementById('app');
    if (!app) return;

    app.innerHTML = `
        <div class="main-content" id="main-content"></div>
        <div class="bottom-nav">
            <button class="nav-btn" data-path="/notes">📝 Заметки</button>
            <button class="nav-btn" data-path="/habits">📊 Привычки</button>
            <button class="nav-btn" data-path="/statistics">📈 Статистика</button>
        </div>
    `;

    mainContainer = document.getElementById('main-content');

    // Навесить обработчики на кнопки навигации
    const navBtns = app.querySelectorAll('.nav-btn');
    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const path = btn.getAttribute('data-path');
            navigate(path);
            // Активный класс
            navBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // Активная кнопка по умолчанию
    const activePath = window.location.pathname;
    const activeBtn = Array.from(navBtns).find(b => b.getAttribute('data-path') === activePath);
    if (activeBtn) activeBtn.classList.add('active');
    else navBtns[0].classList.add('active');
}

export function getMainContainer() {
    return mainContainer;
}