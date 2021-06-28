export const reveal = {
  progress: false,
  hash: true,
  embedded: true,
  preloadIframes: true,
  slideNumber: 'c/t',
  width: 1200,
  height: 900
}

export function md(path: string) {
  return {
    'data-transition': 'concave',
    'data-markdown': path,
    'data-separator': '^<!-- next -->',
    'data-separator-vertical': '^<!-- more -->'
  }
}
