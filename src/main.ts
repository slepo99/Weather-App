import { createApp } from "vue";
import { createPinia } from "pinia";
import { router } from "./router";
import "./style.css";
import "@/assets/styles/main.scss";
import App from "./App.vue";
import { i18n } from './i18n'

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);

import { useThemeStore } from "@/stores/theme";
const themeStore = useThemeStore();
themeStore.initTheme();

app.use(i18n);
app.use(router);
app.mount("#app");
