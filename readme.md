# XMind Embed Viewer
Use XMind share to present your `.xmind` files on your blog or website.

[Demo](https://xmindltd.github.io/xmind-embed-viewer/)

## Quick start
### Install
As an npm module

```shell
npm i xmind-embed-viewer
```

Or alternatively from `unpkg`/`jsdelivr` with a script tag as a UMD bundle
```html
<script src="https://unpkg.com/xmind-embed-viewer/dist/umd/xmind-embed-viewer.js"></script>
<!-- or https://www.jsdelivr.com/npm/xmind-embed-viewer/dist/umd/xmind-embed-viewer.js -->
<script> // window.XMindEmbedViewer are available now. </script>
```
### Base usage
```typescript
const viewer = new XMindEmbedViewer({
  el: '#container-or-iframe-selector', // HTMLElement | HTMLIFrameElement | string
  // 如果在中国大陆境内速度慢，可以添加的参数 `region: 'cn'` 改为使用 xmind.cn 的图库作为依赖。
  // region: 'cn' //optinal, global(default) or cn
})
fetch('test-1.xmind')
  .then(res => res.arrayBuffer())
  .then(file => viewer.load(file))
```
The example are using [HTTP Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).

See also demo source code [here](./public/index.html).

### Methods
#### Get viewer state
```typescript
console.log('Current zoomscales: ', viewer.zoomScale)
console.log('Current activated sheet id: ', viewer.currentSheetId)
console.log('All Sheets: ', viewer.sheets)
```

#### Load file into viewer
`viewer.load` are only accept `ArrayBuffer` object.
```typescript
fetch('test-1.xmind')
  .then(res => res.arrayBuffer())
  .then(file => viewer.load(file))
```
#### ZoomScale Control
Use extract scale value, Range: `50` - `500`
```typescript
viewer.setZoomScale(100)
```
Auto-fits with container bounds
```typescript
viewer.setFitMap()
```

#### Sheet Control
You can use `viewer.sheets` to retrieve all sheet attribute.
```typescript
viewer.switchSheet('sheet-id')
```

#### Update iframe style
```typescript
viewer.setStyles({
  'width': '100%',
  // CSS styles are available here
})
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
* `map-ready`
* `zoom-change`
* `sheet-switch`
* `sheets-load`

## License
This project is licensed under the MIT License - see [LICENSE.md](LICENSE.md) file for details.
