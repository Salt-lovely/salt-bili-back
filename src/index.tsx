import { readAndListen } from 'salt-lib'
import {
  NEW_UI,
  OLD_UI,
  STORAGE_KEY,
  TRADITION_UI,
  genResetCookieFn,
  setCookie,
} from './utils'

/** 统一计时器 */
let interval = 0
/**
 * 新版 UI
 */
const setNewUI = () => {
  clearInterval(interval)
  setCookie('i-wanna-go-back', '0')
  // const resetFn = genResetCookieFn({})
}
/**
 * 旧版 UI
 */
const setOldUI = () => {
  clearInterval(interval)
  const resetFn = genResetCookieFn({
    delMap: ['buvid3'],
    setMap: {
      'i-wanna-go-back': '1',
      'i-wanna-go-feeds': '-1',
      nostalgia_conf: '2',
    },
  })
  interval = (setInterval as Window['setInterval'])(resetFn, 500)
}
/**
 * 老版 UI
 */
const setTraditionalUI = () => {
  clearInterval(interval)
  const resetFn = genResetCookieFn({
    delMap: ['buvid3', 'buvid4', 'buvid_fp'],
    setMap: {
      'i-wanna-go-back': '1',
      'i-wanna-go-feeds': '1',
      nostalgia_conf: '2',
    },
  })
  interval = (setInterval as Window['setInterval'])(resetFn, 500)
}

const setUICookie = (value: number | null) => {
  switch (value) {
    case NEW_UI:
      setNewUI()
      break
    case OLD_UI:
      setOldUI()
      break
    case TRADITION_UI:
      setTraditionalUI()
      break
    case null:
      setNewUI()
      break
    default:
      console.log('无法识别的UI模式', value)
      setOldUI()
  }
}

const [value] = readAndListen({
  key: `${STORAGE_KEY}-ui-version`,
  defaultValue: OLD_UI,
  listener: (ev) => {
    const { newValue } = ev
    setUICookie(newValue)
  },
})

setUICookie(value)

console.log(
//   `
// 欢迎使用盐酱牌回到旧版B站主页脚本！

// 你可以在屏幕底部找到切换按钮

// 切换后需要刷新页面方可起效
// `
`
欢迎使用盐酱牌回到旧版B站主页脚本！

下个版本将会在屏幕底部添加切换按钮
`
)
