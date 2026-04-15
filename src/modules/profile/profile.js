import { storage, KEYS } from '../../utils/storage.js';

export function getProfile() {
  return storage.get(KEYS.PROFILE, {
    name: '',
    birthdate: '',
    about: '',
    avatar: ''
  });
}

export function saveProfile(profileData) {
  storage.set(KEYS.PROFILE, profileData);
}