export const defaultExpires = 'Mon, 13 Sep 2077 11:45:14 GMT'
export const defaultDomain = '.bilibili.com'

export const NEW_UI = 0
export const OLD_UI = 1
export const TRADITION_UI = 2

export const STORAGE_KEY = 'salt-lovely-bili-tool'

/**
 * 将指定 cookie 置空
 * @param name
 * @param domain
 */
export function deleteCookie(name: string, domain = defaultDomain) {
  // document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${domain}`;
  setCookie(name, '', defaultExpires, domain)
}
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
  document.cookie = `${name}=${value};expires=${expires};path=/;domain=${domain}`
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
    if (delMap) delMap.forEach((c) => deleteCookie(c))
    if (setMap) Object.keys(setMap).forEach((c) => setCookie(c, setMap[c]))
  }
}
