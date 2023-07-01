import { defineStore } from "pinia";
import { ref } from "vue";
import { darkTheme } from "naive-ui";
import type { GlobalTheme } from "naive-ui";

export const useThemeStore = defineStore("theme", () => {
  const theme = ref<GlobalTheme | null>(null);
  function changeLightTheme() {
    theme.value = null
  }
  function changeDarkThem() {
    theme.value = darkTheme;
  }

  return {theme, changeLightTheme, changeDarkThem };
});
