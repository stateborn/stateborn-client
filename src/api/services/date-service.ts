import dayjs from 'dayjs';
// @ts-ignore
import dayjsPluginUTC from 'dayjs-plugin-utc'

dayjs.extend(dayjsPluginUTC);

export const formatDateNice = (date: string | number) => {
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss')
}
