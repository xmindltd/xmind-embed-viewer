export class IframeController {
  protected iframe: HTMLIFrameElement

  constructor(target: HTMLElement | HTMLIFrameElement | string, src: string) {
    let iframe: HTMLIFrameElement
    const element = typeof target === 'string' ? document.querySelector(target) : target
    if (element instanceof HTMLIFrameElement) {
      iframe = element
    } else {
      iframe = document.createElement('iframe')
      element.appendChild(iframe)
    }

    iframe.setAttribute('frameborder', '0')
    iframe.setAttribute('scrolling', 'no')
    iframe.setAttribute('allowfullscreen', 'true')
    iframe.setAttribute('allow', 'allowfullscreen')
    iframe.setAttribute('crossorigin', 'anonymous')
    iframe.setAttribute('src', src)

    this.iframe = iframe
  }

  getIframe() {
    return this.iframe
  }

  setStyles(styles: Partial<CSSStyleDeclaration>) {
    const iframe = this.getIframe()
    for (const [styleKey, value] of Object.entries(styles)) {
      // @ts-ignored
      iframe.style[styleKey] = value
    }
  }
}
