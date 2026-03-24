import { createApp } from "vue";
import { createPinia } from "pinia";
import { router } from "./router";
import "./style.css";
import "@/assets/styles/main.scss";
import App from "./App.vue";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);

import { useThemeStore } from "@/stores/theme";
const themeStore = useThemeStore(pinia);
themeStore.initTheme();

app.use(router);
app.mount("#app");
