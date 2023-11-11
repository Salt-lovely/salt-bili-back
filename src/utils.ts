import Cookie from 'js-cookie'

const { remove, set } = Cookie

export const defaultExpires = new Date(3398759114000)
export const defaultDomain = '.bilibili.com'

export const NEW_UI = 0
export const OLD_UI = 1
export const TRADITION_UI = 2

export const STORAGE_KEY = 'salt-lovely-bili-tool'

/**
 * 设定 cookie
 * @param name
 * @param value
 * @param expires
 * @param domain
 */
export function setCookie(
  name: string,
  value = '',
  expires = defaultExpires,
  domain = defaultDomain
) {
  set(name, value, { expires, domain })
}
/**
 *
 * @param param0
 * @returns
 */
export function genResetCookieFn({
  delMap,
  setMap,
}: {
  delMap?: string[]
  setMap?: Record<string, string>
}) {
  console.log(`设置成功`)
  if (delMap) console.log(`将强制清除这些cookie: ${delMap.join(', ')}`)
  if (setMap)
    console.log(`将强制接管这些cookie: ${Object.keys(setMap).join(', ')}`)
  return () => {
    if (delMap) delMap.forEach((c) => remove(c))
    if (setMap) Object.keys(setMap).forEach((c) => setCookie(c, setMap[c]))
  }
}
