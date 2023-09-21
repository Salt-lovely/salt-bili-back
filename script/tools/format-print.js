/*
 * @LastEditTime: 2022-07-24 12:37:10
 * @Description: file content
 */
const clearColor = '\x1B[39m';
const clearBgColor = '\x1B[49m';
const formatMap = {
  bold: ['\x1B[1m', '\x1B[22m'],
  italic: ['\x1B[3m', '\x1B[23m'],
  underline: ['\x1B[4m', '\x1B[24m'],
  inverse: ['\x1B[7m', '\x1B[27m'],
  strike: ['\x1B[9m', '\x1B[29m'],
  // 颜色
  white: ['\x1B[37m', clearColor],
  grey: ['\x1B[90m', clearColor],
  black: ['\x1B[30m', clearColor],
  blue: ['\x1B[34m', clearColor],
  cyan: ['\x1B[36m', clearColor],
  green: ['\x1B[32m', clearColor],
  magenta: ['\x1B[35m', clearColor],
  red: ['\x1B[31m', clearColor],
  yellow: ['\x1B[33m', clearColor],
  // 背景色
  whitebg: ['\x1B[47m', clearBgColor],
  greybg: ['\x1B[49;5;8m', clearBgColor],
  blackbg: ['\x1B[40m', clearBgColor],
  bluebg: ['\x1B[44m', clearBgColor],
  cyanbg: ['\x1B[46m', clearBgColor],
  greenbg: ['\x1B[42m', clearBgColor],
  magentabg: ['\x1B[45m', clearBgColor],
  redbg: ['\x1B[41m', clearBgColor],
  yellowbg: ['\x1B[43m', clearBgColor],
};
const aliasMap = {
  b: 'bold',
  i: 'italic',
  u: 'underline',
  s: 'strike',
  gray: 'grey',
  graybg: 'greybg',
};
/**
 * @param {string} str 需要改格式的文字
 * @param  {string[]} codes 格式编码，忽略大小写
 * - 可用格式: `b` `i` `u` `s` `inverse`
 * - 可用颜色: `white` `grey` `black` `blue` `cyan` `green` `magenta` `red` `yellow`
 * - 背景色: 可用颜色后面加上 `bg`
 */
const formatPrint = (str, ...codes) => {
  let res = str;
  for (const code of codes) {
    const c = code.toLowerCase(); // 忽略大小写
    const formatCode = formatMap[aliasMap[c] || c];
    if(formatCode){
      res = formatCode[0] + res + formatCode[1];
    }
  }
  return res;
};

module.exports = formatPrint;
