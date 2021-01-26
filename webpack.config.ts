import * as path from 'path'
import { Configuration, EnvironmentPlugin } from 'webpack'

const commonConfig: Partial<Configuration> = {
    devtool: 'source-map',
    entry: './src/index.ts',
    module: {
        rules: [
            { test: /\.tsx?$/, loader: 'ts-loader' }
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
        output: {
            library: 'XMindEmbedViewer',
            libraryTarget: 'umd',
            libraryExport: 'XMindEmbedViewer',
            path: path.join(__dirname, 'dist'),
            filename: '[name].js'
        },
        //
        // https://github.com/webpack/webpack-dev-server/issues/2663
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        devServer: {
            port: 9000,
            static: [
                path.resolve('./statics')
            ],
            compress: true,
            hot: true,
            https: false,
        },
        plugins: [
            new EnvironmentPlugin({
                'EMBED_VIEWER_URL': process.env['EMBED_VIEWER_URL'] || 'http://localhost:8088/embed',
                'EMBED_VIEWER_DOMAIN': process.env['EMBED_VIEWER_DOMAIN'] || 'http://localhost:8088'
            })
        ]
    },
    {
        ...commonConfig,
        name: 'prod-umd',
        mode: 'production',
        output: {
            library: 'XMindEmbedViewer',
            libraryTarget: 'umd',
            libraryExport: 'XMindEmbedViewer',
            path: path.join(__dirname, 'dist/umd'),
            filename: 'xmind-embed-viewer.js'
        },
        plugins: [
            new EnvironmentPlugin({
                'EMBED_VIEWER_URL': process.env['EMBED_VIEWER_URL'] || 'http://localhost:8088/embed',
                'EMBED_VIEWER_DOMAIN': process.env['EMBED_VIEWER_DOMAIN'] || 'http://localhost:8088'
            })
        ],
        optimization: {
            minimize: true
        }
    }
]

export default config