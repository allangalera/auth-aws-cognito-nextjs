import { atom } from 'recoil';

export const currentThemeAtom = atom({
  key: 'currentTheme',
  default: 'dark',
});

export const isAuthenticatedAtom = atom({
  key: 'isAuthenticated',
  default: false,
});
