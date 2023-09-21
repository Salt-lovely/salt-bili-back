/*
 * @LastEditTime: 2022-07-30 21:14:20
 * @Description: 本地热更新服务
 */
const port = 5000

const path = require('path')
const core = require('./tools/core')
const $P = require('./tools/format-print')
const $T = require('./tools/format-time')
const { findPort } = require('./tools/port')
const openUrl = require('./tools/openUrl')

console.log($P('SaltProject - serve ' + $T(), 'grey'))
;(async () => {
  const www = path.resolve(__dirname, '../www')
  const _port = await findPort(port)
  const url = `http://localhost:${_port}/`
  const onRebuild = (error) => {
    if (error) {
      console.error(
        $P(' ERROR ', 'b', 'white', 'redbg'),
        '出现错误',
        $P($T(), 'grey')
      )
    } else {
      console.log(
        $P(' WATCH ', 'b', 'white', 'greenbg'),
        '代码变动, 自动更新',
        $P($T(), 'grey')
      )
    }
  }
  await core({
    props: {
      outfile: 'www/dist/index.js',
      sourcemap: true,
      watch: { onRebuild },
    },
    define: {
      'process.env.HISTORY': '"hash"',
    },
  })
  console.log($P(' SERVE ', 'b', 'white', 'cyanbg'), '编译完成, 开启服务中')
  if (process.platform === 'linux') {
    // https://github.com/rsms/serve-http/issues/6
    const { createServer } = require('http')
    const sirv = require('sirv')
    const server = sirv(www, { dev: true })
    createServer((req, res) => server(req, res)).listen(_port)
  } else {
    const { createServer } = require('serve-http')
    createServer({ port: _port, pubdir: www, quiet: true })
  }
  openUrl(url)
  console.log(
    $P(' SERVE ', 'b', 'white', 'greenbg'),
    '服务开启, 见:',
    $P(url, 'b')
  )
})()
