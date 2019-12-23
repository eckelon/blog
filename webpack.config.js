const webpack = require('webpack');
const { resolve } = require('path');
const { server, client, serviceworker } = require('sapper/config/webpack.js');
const pkg = require('./package.json');

const mode = process.env.NODE_ENV;
const dev = mode === 'development';

const alias = { svelte: resolve('node_modules', 'svelte') };
const extensions = ['.mjs', '.js', '.json', '.svelte', '.html'];
const mainFields = ['svelte', 'module', 'browser', 'main'];

module.exports = {
    client: {
        entry: client.entry(),
        output: client.output(),
        resolve: { alias, extensions, mainFields },
        module: {
            rules: [
                {
                    test: /\.(svelte|html)$/,
                    use: {
                        loader: 'svelte-loader',
                        options: {
                            dev,
                            hydratable: true,
                            hotReload: false // pending https://github.com/sveltejs/svelte/issues/2377
                        }
                    }
                }
            ]
        },
        mode,
        plugins: [
            // pending https://github.com/sveltejs/svelte/issues/2377
            // dev && new webpack.HotModuleReplacementPlugin(),
            new webpack.DefinePlugin({
                'process.browser': true,
                'process.env.NODE_ENV': JSON.stringify(mode)
            }),
        ].filter(Boolean),
        devtool: dev && 'inline-source-map'
    },

    server: {
        entry: server.entry(),
        output: server.output(),
        target: 'node',
        resolve: { alias, extensions, mainFields },
        externals: Object.keys(pkg.dependencies).concat('encoding'),
        module: {
            rules: [
                {
                    test: /\.(svelte|html)$/,
                    use: {
                        loader: 'svelte-loader',
                        options: {
                            css: false,
                            generate: 'ssr',
                            dev
                        }
                    }
                },
                {
                    test: /\.md$/,
                    loader: 'frontmatter-markdown-loader'
                }
            ]
        },
        mode: process.env.NODE_ENV,
        performance: {
            hints: false // it doesn't matter if server.js is large
        }
    },

    serviceworker: {
        entry: serviceworker.entry(),
        output: serviceworker.output(),
        mode: process.env.NODE_ENV
    }
};
