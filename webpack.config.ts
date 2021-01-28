import * as path from 'path'
import { Configuration, EnvironmentPlugin } from 'webpack'

const commonConfig: Partial<Configuration> = {
  entry: './src/index.ts',
  module: {
    rules: [
      {test: /\.tsx?$/, loader: 'ts-loader'}
    ]
  },
  resolve: {
    extensions: ['.js', '.ts'],
  },
}

const config: Configuration[] = [
  {
    ...commonConfig,
    name: 'dev',
    mode: 'development',
    devtool: 'inline-source-map',
    output: {
      library: 'XMindEmbedViewer',
      libraryTarget: 'umd',
      libraryExport: 'XMindEmbedViewer',
      path: path.join(__dirname, 'dist'),
      filename: 'xmind-embed-viewer.js'
    },
    //
    // https://github.com/webpack/webpack-dev-server/issues/2663
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    devServer: {
      port: 9000,
      static: [
        path.resolve('./public')
      ],
      compress: true,
      hot: true,
      https: false,
    },
    plugins: [
      new EnvironmentPlugin({
        'EMBED_VIEWER_URL': process?.env['EMBED_VIEWER_URL'] || 'https://beta.xmind.net/embed',
        'EMBED_VIEWER_DOMAIN': process?.env['EMBED_VIEWER_DOMAIN'] || 'https://beta.xmind.net'
      })
    ]
  },
  {
    ...commonConfig,
    name: 'prod-umd',
    mode: 'production',
    devtool: 'source-map',
    output: {
      library: 'XMindEmbedViewer',
      libraryTarget: 'umd',
      libraryExport: 'XMindEmbedViewer',
      path: path.join(__dirname, 'dist/umd'),
      filename: 'xmind-embed-viewer.js'
    },
    plugins: [
      new EnvironmentPlugin({
        'EMBED_VIEWER_URL': process?.env['EMBED_VIEWER_URL'] || 'https://beta.xmind.net/embed',
        'EMBED_VIEWER_DOMAIN': process?.env['EMBED_VIEWER_DOMAIN'] || 'https://beta.xmind.net'
      })
    ],
    optimization: {
      minimize: true
    }
  }
]

export default config
