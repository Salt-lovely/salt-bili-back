/*
 * @LastEditTime: 2022-01-20 14:48:32
 * @Description: file content
 */
const defaultFormat = 'YYYY年MMMMDD日 dd HH时mm分ss秒.SSS';
const local = {
  midNight: '午夜', //      22  - 3   <- 5 小时
  earlyMorning: '凌晨', //   3  - 7
  morning: '早晨', //        7  - 11
  noon: '中午', //          11  - 14  <- 3 小时
  afternoon: '下午', //     14  - 18
  evening: '晚上', //           18  - 22
  weeks: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'], // Sun. - Mon. - ... - Sat.
  weeksShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'], // Sun. - Mon. - ... - Sat.
  hours: [
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
  ], // 00:00 - 23:00
  months: [
    '一月',
    '二月',
    '三月',
    '四月',
    '五月',
    '六月',
    '七月',
    '八月',
    '九月',
    '十月',
    '十一月',
    '十二月',
  ], // Jan. - Dec.
  monthsShort: [
    '1月',
    '2月',
    '3月',
    '4月',
    '5月',
    '6月',
    '7月',
    '8月',
    '9月',
    '10月',
    '11月',
    '12月',
  ], // Jan. - Dec.
};

const padZero = (s, len = 2) => `${s}`.padStart(len, '0');
const cutTail = (str, len = 2) => (str.length > len ? str.substr(str.length - len) : str);
/**
 * 格式化时间
 * - `YY`、`YYYY` 年份，取**后**几位，不足补零
 * - `M`、`MM` 月份，不足补零
 * - `MMM`、`MMMM` 月份名称，三个 M 为简写，四个 M 为全称
 * - `D`、`DD` 日期，不足补零
 * - `d`、`dd` 星期，一个 d 为简写，两个 d 为全称
 * - `H`、`HH` 小时，不足补零
 * - `h`、`hh` 小时，12 小时制，不足补零
 * - `m`、`mm` 分钟，不足补零
 * - `s`、`ss` 秒钟，不足补零
 * - `S`、`SS`、`SSS` 毫秒，取**前**几位，不足补零
 * @param {string} format 格式化编码
 * @param {Date} date Date 实例，不传则用当前时间
 * @returns
 */
function dateFormat(format, date) {
  let fmt = format ?? defaultFormat;
  const _d = date ?? new Date();
  // 将外部变量拉到内部
  const $0 = padZero;
  const $c = cutTail;
  const $l = local;
  const { floor } = Math;

  const year = _d.getFullYear();
  const month = _d.getMonth();
  const weekDay = _d.getDay();
  const hour = _d.getHours();
  const ms = _d.getMilliseconds();
  const opt = {
    // 日期
    YYYYY: $c($0(year, 5), 5), // 年
    YYYY: $c($0(year, 4), 4),
    YYY: $c($0(year, 3), 3),
    YY: $c($0(year)),
    MM: $0(month + 1), // 月
    M: month + 1,
    MMMM: $l.months[month], // 月份名
    MMM: $l.monthsShort[month],
    DD: $0(_d.getDate()), // 日
    D: _d.getDate(),
    // 时间
    HH: $0(hour), // 时
    H: hour,
    hh: $0(hour % 12 || 12), // 时 -- 12 小时制
    h: hour % 12 || 12,
    mm: $0(_d.getMinutes()), // 分
    m: _d.getMinutes(),
    ss: $0(_d.getSeconds()), // 秒
    s: _d.getSeconds(),
    SSS: $0(ms, 3), // 毫秒
    SS: $0(floor(ms / 10)),
    S: floor(ms / 100),
    // 其他功能
    dd: $l.weeks[weekDay], // 星期名
    d: $l.weeksShort[weekDay],
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  return fmt.replace(
    /\[([^\]]+)]|Y{1,5}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|m{1,2}|s{1,2}|S{1,3}|A{1,2}|a{1,2}/g,
    (match, $1) => $1 || opt[match] || match
  );
}

module.exports = dateFormat;
