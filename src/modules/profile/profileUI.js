import { getMainContainer } from '../../core/uiContainer.js';
import { getProfile, saveProfile } from './profile.js';

export function render() {
  const container = getMainContainer();
  const profile = getProfile();

  container.innerHTML = `
    <div class="card">
      <h2 style="margin-bottom: 16px;">Профиль</h2>
      <div class="form-group" style="text-align: center;">
        <img id="avatar-preview" src="${profile.avatar || ''}" 
             style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover; background: #ddd;">
        <input type="file" id="avatar-input" accept="image/*" style="display: none;">
        <button id="change-avatar-btn" class="icon-btn" style="margin-top: 8px;">📷 Выбрать фото</button>
      </div>
      <div class="form-group">
        <label>Имя</label>
        <input type="text" id="profile-name" value="${profile.name || ''}" placeholder="Ваше имя">
      </div>
      <div class="form-group">
        <label>Дата рождения</label>
        <input type="date" id="profile-birthdate" value="${profile.birthdate || ''}">
      </div>
      <div class="form-group">
        <label>О себе</label>
        <textarea id="profile-about" rows="3" placeholder="Расскажите о себе">${profile.about || ''}</textarea>
      </div>
      <button class="primary" id="save-profile-btn">Сохранить</button>
    </div>
  `;

  const avatarInput = document.getElementById('avatar-input');
  const avatarPreview = document.getElementById('avatar-preview');
  document.getElementById('change-avatar-btn').addEventListener('click', () => avatarInput.click());

  avatarInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => avatarPreview.src = ev.target.result;
      reader.readAsDataURL(file);
    }
  });

  document.getElementById('save-profile-btn').addEventListener('click', () => {
    const newProfile = {
      name: document.getElementById('profile-name').value,
      birthdate: document.getElementById('profile-birthdate').value,
      about: document.getElementById('profile-about').value,
      avatar: avatarPreview.src
    };
    saveProfile(newProfile);
    alert('Профиль сохранён');
  });
}