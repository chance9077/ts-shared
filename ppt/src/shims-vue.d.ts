declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'reveal.js' {
  const reveal: any
  export default reveal
}

declare module 'reveal.js/*' {
  const reveal: any
  export default reveal
}
