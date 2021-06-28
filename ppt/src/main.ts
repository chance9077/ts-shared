import { createApp } from 'vue'
import App from './App.vue'
import Section from './components/Section.vue'
import Container from './components/Container.vue'

createApp(App)
  .component('Section', Section)
  .component('Container', Container)
  .mount('#app')
