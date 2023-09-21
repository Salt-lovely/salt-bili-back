/*
 * @LastEditTime: 2022-08-23 21:59:07
 * @Description: 打包到 dist
 */
const outFile = 'dist/bundle.js'
const outMinFile = 'dist/bundle.min.js'

const commonBuild = {
  props: {
    outfile: outFile,
    minify: false,
    charset: 'utf8',
    legalComments: 'inline',
  },
  define: {
    __DEV__: 'false',
    'process.env.NODE_ENV': '"production"',
  },
}

const core = require('./tools/core')
const $P = require('./tools/format-print')
const $T = require('./tools/format-time')

console.log($P('SaltProject - bundle ' + $T(), 'grey'))
;(async () => {
  let start, end
  console.log($P(' BUNDLE ', 'b', 'white', 'cyanbg'), '正在打包')
  start = Date.now()
  await core(commonBuild)
  end = Date.now()
  console.log(
    $P(' SUCCED ', 'b', 'white', 'greenbg'),
    '完成打包: ',
    $P(outFile, 'b'),
    $P(` ${end - start}ms`, 'grey')
  )
})()
