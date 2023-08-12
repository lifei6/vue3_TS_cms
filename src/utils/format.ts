import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

export function utcFormat(utcString: string, format = 'YYYY-MM-DD HH:mm:ss') {
  // 偏移8小时使用中国时区
  return dayjs.utc(utcString).utcOffset(8).format(format)
}
