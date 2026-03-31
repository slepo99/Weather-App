// stores/theme.ts
import { defineStore } from 'pinia';
import { THEME } from '@/constants/theme';
type Theme = typeof THEME.LIGHT | typeof THEME.DARK;
interface ThemeState {
  theme: Theme;
}

export const useThemeStore = defineStore('theme', {
  state: (): ThemeState => ({
    theme: THEME.DARK,
  }),
  getters: {
    isDark: (state) => state.theme === THEME.DARK,
  },
  actions: {
    initTheme() {
      const saved = localStorage.getItem('theme') as Theme | null;
      if (saved) {
        this.theme = saved;
      } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.theme = prefersDark ? THEME.DARK : THEME.LIGHT;
      }

      this.applyTheme();
    },

    toggleTheme() {
      this.theme = this.theme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT;
      this.applyTheme();
      localStorage.setItem('theme', this.theme);
    },

    applyTheme() {
      document.documentElement.className = this.theme;
    }
  }
});