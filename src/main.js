import Vue from 'vue'
import App from './App.vue'
import {router} from "./router";
import {currentContext} from "./components/base/CurrentContext";
import {dictionaryStorage} from "./components/base/DictionaryStorage";

Vue.config.productionTip = false;

new Vue({
    router: router,
    render: h => h(App),
    created: () => {
        currentContext.reload();
        dictionaryStorage.init(() => {
        })
    }
}).$mount('#app');
