import { getMainContainer } from '../../core/uiContainer.js';
import { getProfile, saveProfile, updateAvatar } from './profile.js';
import './profile.css';

export function renderProfileUI() {
    const container = getMainContainer();
    const profile = getProfile();

    container.innerHTML = `
        <div class="profile-container">
            <div class="avatar-section">
                <div class="avatar" id="avatarDisplay">
                    ${profile.avatar ? `<img src="${profile.avatar}" alt="avatar">` : '👤'}
                </div>
                <input type="file" id="avatarUpload" accept="image/*" style="display:none">
                <button class="btn-secondary" id="changeAvatarBtn">Изменить фото</button>
            </div>
            <div class="form-group">
                <label>Имя</label>
                <input type="text" id="profileName" class="form-input" value="${escapeHtml(profile.name)}">
            </div>
            <div class="form-group">
                <label>О себе</label>
                <textarea id="profileBio" class="form-input" rows="2">${escapeHtml(profile.bio)}</textarea>
            </div>
            <div class="form-group">
                <label>День рождения</label>
                <input type="date" id="profileBirthday" class="form-input" value="${profile.birthday || ''}">
            </div>
            <button class="btn-primary" id="saveProfileBtn">Сохранить</button>
            <div class="hint" id="profileHint">Сохранено</div>
        </div>
    `;

    const nameInput = document.getElementById('profileName');
    const bioInput = document.getElementById('profileBio');
    const birthdayInput = document.getElementById('profileBirthday');
    const saveBtn = document.getElementById('saveProfileBtn');
    const hint = document.getElementById('profileHint');
    const avatarUpload = document.getElementById('avatarUpload');
    const changeAvatarBtn = document.getElementById('changeAvatarBtn');
    const avatarDisplay = document.getElementById('avatarDisplay');

    function save() {
        saveProfile({
            name: nameInput.value,
            bio: bioInput.value,
            birthday: birthdayInput.value
        });
        hint.classList.add('show');
        setTimeout(() => hint.classList.remove('show'), 1500);
    }

    saveBtn.addEventListener('click', save);
    nameInput.addEventListener('input', save);
    bioInput.addEventListener('input', save);
    birthdayInput.addEventListener('change', save);

    changeAvatarBtn.addEventListener('click', () => avatarUpload.click());
    avatarUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                const imgData = ev.target.result;
                updateAvatar(imgData);
                avatarDisplay.innerHTML = `<img src="${imgData}" alt="avatar">`;
            };
            reader.readAsDataURL(file);
        }
    });
}

function escapeHtml(str) {
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}