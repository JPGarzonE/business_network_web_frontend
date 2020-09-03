const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const config = require('sapper/config/webpack.js');
const package = require('./package.json');

const mode = process.env.NODE_ENV;
const dev = mode === 'development';

const alias = { svelte: path.resolve('node_modules', 'svelte') };
const extensions = ['.mjs', '.js', '.json', '.svelte', '.html'];
const mainFields = ['svelte', 'module', 'browser', 'main'];

module.exports = {
  client: {
    entry: config.client.entry(),
    output: config.client.output(),
    resolve: { alias, extensions, mainFields },
    module: {
      rules: [
        {
          test: /.(svelte|html)$/,
          use: {
            loader: 'svelte-loader',
            options: {
              dev,
              hydratable: true,
              hotReload: false,
            },
          },
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            'style-loader',
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                sassOptions: {
                  includePaths: ['./src/theme', './node_modules'],
                },
              },
            },
          ],
        },
      ],
    },
    mode,
    plugins: [
      new webpack.DefinePlugin({
        'process.browser': true,
        'process.env.NODE_ENV': JSON.stringify(mode),
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[name].[id].css',
      }),
    ].filter(Boolean),
    devtool: dev && 'inline-source-map',
  },

  server: {
    entry: config.server.entry(),
    output: config.server.output(),
    target: 'node',
    resolve: { alias, extensions, mainFields },
    externals: Object.keys(package.dependencies).concat('encoding'),
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[name].[id].css',
      }),
    ],
    module: {
      rules: [
        {
          test: /.(svelte|html)$/,
          use: {
            loader: 'svelte-loader',
            options: {
              dev,
              css: false,
              generate: 'ssr',
            },
          },
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            'style-loader',
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                sassOptions: {
                  includePaths: ['./src/theme', './node_modules'],
                },
              },
            },
          ],
        },
      ],
    },
    mode,
    performance: {
      hints: false,
    },
  },

  serviceworker: {
    entry: config.serviceworker.entry(),
    output: config.serviceworker.output(),
    mode,
  },
};
