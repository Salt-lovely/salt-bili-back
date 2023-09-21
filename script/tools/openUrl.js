/*
 * @Author: Salt
 * @Date: 2022-07-30 20:04:10
 * @LastEditors: Salt
 * @LastEditTime: 2022-07-30 20:33:12
 * @Description: 打开URL
 * @FilePath: \mcbbs-wiki-widget-repo\script\tools\openUrl.js
 */
function openUrl(url) {
  if (process.platform === 'win32') {
    const childProcess = require('child_process')
    const cp = childProcess.exec('start ' + url)
    cp.on('error', function (msg) {
      console.error('打开这个 URL 时发生错误:', $P(url, 'red'))
      console.error(msg)
    })
  } else {
    const open = require('open')
    open(url)
  }
}
module.exports = openUrl
