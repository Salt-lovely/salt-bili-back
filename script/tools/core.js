/*
 * @LastEditTime: 2022-07-24 17:32:15
 * @Description: file content
 */
const { build } = require('esbuild');
const { sassPlugin, postcssModules } = require('esbuild-sass-plugin');

const isCssModule = /\.mo?d?u?l?e?\.scss$/i;
const isCssText = /\.te?x?t?\.scss$/i;

const defaultBuildConfig = {
  entryPoints: ['src/index.tsx'],
  bundle: true,
  outfile: 'dist/bundle.js',
  target: 'es2017',
  plugins: [
    sassPlugin({
      filter: isCssModule, // css 模块
      transform: postcssModules({}),
      type: 'css',
    }),
    sassPlugin({
      filter: isCssText, // css 文本
      type: 'css-text',
    }),
    sassPlugin({}),
  ],
};

/**
 * @param {{
 * props: any
 * define: {[key: string]: string}
 * }} p
 * 参数，即使是空的也必填
 * - `props` 构建参数，不含`define`
 * - `define` 构建参数中的`define，输入`null`来使用空的`define`
 */
module.exports = async ({ props, define }) => {
  // define
  const $define =
    define === null
      ? {}
      : {
          __DEV__: 'true',
          'process.env.NODE_ENV': '"development"',
          'process.env.HISTORY': '"browser"',
          ...define,
        };
  // 构建参数
  const buildProps = {
    ...defaultBuildConfig,
    define: $define,
    ...props,
  };
  return build(buildProps);
};

module.exports.defaultBuildConfig = defaultBuildConfig;
