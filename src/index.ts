import { IframeEventChannelController } from './channel-controller'
import { IframeController } from './iframe-controller'

export class XMindEmbedViewer {
  protected iframeController: IframeController
  protected iframeEventChannelController: IframeEventChannelController

  constructor(args: {
    el: HTMLElement | HTMLIFrameElement;
    styles?: Partial<CSSStyleDeclaration>
    file?: ArrayBuffer;
  }) {
    const { file, el, styles = {
      'height': '350px',
      'width': '750px'
    }} = args

    const iframeController = new IframeController(el, process.env['EMBED_VIEWER_URL'] as string)
    const iframeEventChannelController = new IframeEventChannelController(iframeController, process.env['EMBED_VIEWER_DOMAIN'] || '*')

    this.iframeController = iframeController
    this.iframeEventChannelController = iframeEventChannelController

    this.setStyles(styles)

    if (file) {
      this.openFile(file)
    }
  }

  setStyles(styles: Partial<CSSStyleDeclaration>): void {
    this.iframeController.setStyles(styles)
  }

  openFile(file: ArrayBuffer): void  {
    this.iframeEventChannelController.emit('open-file', file)
  }

  addEventListener(event: string, callback: (args: any) => any): void {
    this.iframeEventChannelController.addEventListener(event, callback)
  }

  removeEventListener(event: string, callback: (args: any) => any): void {
    this.iframeEventChannelController.removeEventListener(event, callback)
  }
}
