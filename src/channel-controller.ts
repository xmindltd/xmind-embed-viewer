import { IframeController } from './iframe-controller'

export class IframeEventChannelController {
    protected channel = new MessageChannel()
    protected channelSetupPromise: Promise<any>
    protected eventIndex = 0
    protected handlers: { [event: string]: ((args: any) => any)[] } = {}

    constructor(iFrameController: IframeController, domain = '*') {
        const iframe = iFrameController.getIframe()

        if (iframe.hasAttribute('data-event-channel-setup')) {
            throw new Error('An embed viewer instance already initialized on the iframe!')
        } else {
            iframe.setAttribute('data-event-channel-setup', 'true')
        }

        this.channelSetupPromise = (async () => {
            await new Promise<undefined>(resolve => {
                iframe.addEventListener('load', () => {
                    this.channel.port1.start()
                    const port1Handler = (e: MessageEvent) => {
                        const [type] = e.data
                        if (type === 'channel-ready') {
                            e.preventDefault()
                            this.channel.port1.removeEventListener('message', port1Handler)
                            this.channel.port1.addEventListener('message', this.eventDispatcher.bind(this))
                            resolve(undefined)
                        }
                    }
                    this.channel.port1.addEventListener('message', port1Handler)
                    iframe.contentWindow?.postMessage(['setup-channel', {port: this.channel.port2}], domain || '*', [this.channel.port2])
                })
            })
        })()
    }

    protected eventDispatcher(e: MessageEvent) {
        const [ type, eventName, payload ] = e.data || []
        if (type === 'event' && eventName && this.handlers[eventName]) {
            this.handlers[eventName].forEach(handler => handler(payload))
        }
    }

    addEventListener<T = any>(event: string, callback: (args: T) => any) {
        this.handlers[event] = this.handlers[event] || []
        if (this.handlers[event].includes(callback)) return
        this.handlers[event].push(callback)
    }

    removeEventListener(event: string, callback: (payload: any) => void) {
        if (!this.handlers[event]) return
        const index = this.handlers[event].findIndex(fn => fn === callback)
        this.handlers[event].splice(index, 1)
    }

    async emit<T = any>(event: string, payload: T) {
        await this.channelSetupPromise
        const replyEvent = `xmind-embed-viewer#${this.eventIndex++}`
        await new Promise(resolve => {
            const handler = (e: MessageEvent) => {
                const [message, payload] = e.data
                if (message === replyEvent) {
                    this.channel.port1.removeEventListener('message', handler)
                    resolve(payload)
                }
            }
            this.channel.port1.addEventListener('message', handler)
            this.channel.port1.postMessage([event, payload, replyEvent])
        })
    }
}