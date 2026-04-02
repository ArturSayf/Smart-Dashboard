import { updateProfile, getStore } from '../../core/dataService.js';

export function getProfile() {
    return getStore().profile;
}

export function saveProfile(profileData) {
    updateProfile(profileData);
}

export function updateAvatar(base64Image) {
    updateProfile({ avatar: base64Image });
}