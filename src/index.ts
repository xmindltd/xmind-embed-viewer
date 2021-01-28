import { IframeEventChannelController } from './channel-controller'
import { IframeController } from './iframe-controller'

interface Sheet {
  id: string
  title: string
}

interface XMindEmbedViewerState {
  sheets: Sheet[]
  zoomScale: number
  currentSheetId: string
}

export class XMindEmbedViewer {
  protected iframeController: IframeController
  protected iframeEventChannelController: IframeEventChannelController
  protected internalState: XMindEmbedViewerState = {
    sheets: [],
    zoomScale: 100,
    currentSheetId: ''
  }

  /**
   * Initialize a iframe element from a div/iframe html element.
   */
  constructor(args: {
    el: HTMLElement | HTMLIFrameElement;
    styles?: Partial<CSSStyleDeclaration>
    file?: ArrayBuffer;
  }) {
    const {
      file, el, styles = {
        'height': '350px',
        'width': '750px'
      }
    } = args

    const iframeController = new IframeController(el, 'https://beta.xmind.net/embed/')
    const iframeEventChannelController = new IframeEventChannelController(iframeController, 'https://beta.xmind.net')

    this.iframeController = iframeController
    this.iframeEventChannelController = iframeEventChannelController

    iframeEventChannelController.addEventListener<string>('sheet-switch', payload => this.internalState.currentSheetId = payload)
    iframeEventChannelController.addEventListener<number>('zoom-scale-change', payload => this.internalState.zoomScale = payload)
    iframeEventChannelController.addEventListener<Sheet[]>('sheets-change', payload => this.internalState.sheets = payload)

    this.iframeController.setStyles(styles)

    if (file) {
      this.load(file)
    }
  }

  /**
   * Add event listener for embed viewer.
   *
   * Available events:
   * - map-ready
   * - zoom-scale-changed
   * - sheet-switch
   * - sheets-change
   *
   */
  addEventListener(event: string, callback: (args: any) => any): void {
    this.iframeEventChannelController.addEventListener(event, callback)
  }

  removeEventListener(event: string, callback: (args: any) => any): void {
    this.iframeEventChannelController.removeEventListener(event, callback)
  }

  /**
   * Update styles for created iframe element.
   */
  setStyles(styles: Partial<CSSStyleDeclaration>): void {
    this.iframeController.setStyles(styles)
  }

  /**
   * Load a file for embed viewer after iframe ready.
   */
  load(file: ArrayBuffer): void {
    this.iframeEventChannelController.emit('open-file', file)
  }

  get zoomScale() {
    return this.internalState.zoomScale
  }

  get sheets() {
    return JSON.parse(JSON.stringify(this.internalState.sheets))
  }

  get currentSheetId() {
    return this.internalState.currentSheetId
  }
}
