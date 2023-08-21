import {createApp} from 'vue'
import './assets/main.scss'
import App from './App.vue'
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {library} from "@fortawesome/fontawesome-svg-core";
import {faShieldHalved, faUpRightFromSquare} from "@fortawesome/free-solid-svg-icons";
import {faChrome, faFirefox} from "@fortawesome/free-brands-svg-icons";

const app = createApp(App)

library.add(faShieldHalved, faUpRightFromSquare, faChrome, faFirefox)
app.component('FontAwesomeIcon', FontAwesomeIcon)


app.mount('#app')
