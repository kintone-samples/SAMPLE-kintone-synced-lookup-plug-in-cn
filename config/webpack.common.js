const { resolve } = require('path')
const isDev = process.env.NODE_ENV !== 'production'
const isDebug = process.env.NODE_ENV === 'debug'
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')
const CopyPlugin = require('copy-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

const cssLoaders = (preNumber) => [
  isDev && !isDebug ? 'style-loader' : MiniCssExtractPlugin.loader,
  {
    loader: 'css-loader',
    options: {
      sourceMap: isDev,
      importLoaders: preNumber + 1,
    },
  },
  {
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        plugins: [
          'postcss-flexbugs-fixes',
          [
            'postcss-preset-env',
            {
              autoprefixer: {
                grid: true,
                flexbox: 'no-2009',
              },
            },
          ],
        ],
      },
      sourceMap: isDev,
    },
  },
]

const source = resolve(__dirname, '../src')
const output = resolve(__dirname, '../dist')

module.exports = {
  entry: {
    desktop: resolve(source, 'js/desktop.ts'),
    config: resolve(source, 'js/config.ts'),
  },
  output: {
    filename: `js/[name].js`,
    path: output,
    clean: true,
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
  },
  externals: {
     vue: 'Vue',
  },
  plugins: [
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
      process: {
        env: {},
      },
    }),
    new CopyPlugin({
      patterns: [{ from: source, to: output }],
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        vue: true,
        configFile: resolve(__dirname, '../tsconfig.json'),
      },
    }),
    new VueLoaderPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|js)$/,
        loader: 'babel-loader',
        options: { cacheDirectory: true },
        exclude: (file) => /node_modules/.test(file) &&!/\.vue\.js\.ts/.test(file),
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
          appendTsSuffixTo: [/\.vue$/],
        },
        exclude: /node_modules/,
      },
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.css$/,
        use: cssLoaders(0),
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
        type: 'asset/inline',
      },
      {
        test: /\.(ttf|woff|woff2|eot|otf)$/,
        type: 'asset/inline',
      },
    ],
  },
}
