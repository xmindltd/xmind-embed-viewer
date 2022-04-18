# XMind Embed Viewer

## Quick start
[Demo](https://zhiteng.pages.xmind.cn/xmind-embed-viewer/)

## Document
#### Initialization
Install the package or reference the umd file.
```bash
npm i xmind-embed-viewer
```
```typescript
import { XMindEmbedViewer } from 'xmind-embed-viewer'
// Intialize a viewer isntance
const viewer = new XMindEmbedViewer({
  el: '#container-or-iframe', // HTMLElement | HTMLIFrameElement | string
})
```
see also demo [here](./public/index.html)

### Methods

#### Load file into viewer
```typescript
// Download remote file and load into the viewer instance
fetch('test-1.xmind')
  .then(res => res.arrayBuffer())
  .then(file => viewer.load(file))
```

#### Get viewer state
```typescript
console.log('Current zoomscales: ', viewer.zoomScale)
console.log('Current activated sheet id: ', viewer.currentSheetId)
console.log('All Sheets: ', viewer.sheets)
```

### Events
#### Add listener
```typescript
const callback = (payload) => {
    console.log('Event callback with payload', payload)
}
viewer.addEventListener('event-name', callback)
viewer.removeEventListener('event-name', callback)
```
#### Available events:
* map-ready
* zoom-change
* sheet-switch
* sheets-load

## License
