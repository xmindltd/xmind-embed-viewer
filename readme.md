# XMind Embed Viewer
Use XMind share to present your `.xmind` files on your blog or website.

### Example
[Demo](https://xmindltd.github.io/xmind-embed-viewer/)

## Document
#### Initialization
Install the package or reference the umd module.
##### Install
```bash
npm i xmind-embed-viewer
```
##### Use module
```typescript
import { XMindEmbedViewer } from 'xmind-embed-viewer'
// Intialize a viewer isntance
const viewer = new XMindEmbedViewer({
  el: '#container-or-iframe', // HTMLElement | HTMLIFrameElement | string
})
```
see also demo source code [here](./public/index.html).

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
This project is licensed under the MIT License - see [LICENSE.md](LICENSE.md) file for details.
