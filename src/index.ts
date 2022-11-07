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
    el: HTMLElement | HTMLIFrameElement | string;
    styles?: Partial<CSSStyleDeclaration>
    file?: ArrayBuffer;
    isPitchModeDisabled?: boolean
  }) {
    const {
      file, el, styles = {
        'height': '350px',
        'width': '750px',
      },
      isPitchModeDisabled
    } = args

    const iframeController = new IframeController(el, `https://www.xmind.app/embed-viewer${ isPitchModeDisabled ? '?pitch-mode=disabled' : ''}`)
    const iframeEventChannelController = new IframeEventChannelController(iframeController, 'https://www.xmind.app')

    this.iframeController = iframeController
    this.iframeEventChannelController = iframeEventChannelController

    iframeEventChannelController.addEventListener<string>('sheet-switch', payload => this.internalState.currentSheetId = payload)
    iframeEventChannelController.addEventListener<number>('zoom-change', payload => this.internalState.zoomScale = payload)
    iframeEventChannelController.addEventListener<Sheet[]>('sheets-load', payload => this.internalState.sheets = payload)

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
   * - zoom-change
   * - sheet-switch
   * - sheets-load
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

  setZoomScale(zoomScale: number) {
    this.iframeEventChannelController.emit('zoom', zoomScale)
  }
  setFitMap() {
    this.iframeEventChannelController.emit('fit-map')
  }
  switchSheet(sheetId: string) {
    this.iframeEventChannelController.emit('switch-sheet', sheetId)
  }

  get zoom() {
    return this.internalState.zoomScale
  }

  get sheets() {
    return JSON.parse(JSON.stringify(this.internalState.sheets))
  }

  get currentSheetId() {
    return this.internalState.currentSheetId
  }
}
