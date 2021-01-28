import * as path from 'path'
import { Configuration } from 'webpack'

const commonConfig: Partial<Configuration> = {
  entry: './src/index.ts',
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
    ],
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          options: {
            configFile : 'tsconfig.esm.json'
          }
        }
      ]
    },
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
    ],
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          options: {
            configFile : 'tsconfig.umd.json'
          }
        }
      ]
    },
    optimization: {
      minimize: true
    }
  }
]

export default config
