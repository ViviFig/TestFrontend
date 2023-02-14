import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import { BootstrapIconsPlugin } from 'bootstrap-icons-vue';
import { createApp } from 'vue'
import App from './App.vue'
import GamesList from './components/GamesList.vue'
import AddModal from './components/AddModal.vue'
//import Vue from "vue";

import NavbarGames from './components/NavbarGames.vue'
const app = createApp(App);


app.component('games-list', GamesList);
app.component('navbar-games',NavbarGames);
app.component('add-modal', AddModal);
app.use(BootstrapIconsPlugin);
app.mount('#app');



require('@/assets/style/anothergame.scss')

