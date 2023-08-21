import {createApp} from 'vue'
import './assets/main.scss'
import App from './App.vue'
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {library} from "@fortawesome/fontawesome-svg-core";
import {faDownload, faShieldHalved, faUpRightFromSquare} from "@fortawesome/free-solid-svg-icons";

const app = createApp(App)

library.add(faShieldHalved, faUpRightFromSquare, faDownload)
app.component('FontAwesomeIcon', FontAwesomeIcon)


app.mount('#app')
