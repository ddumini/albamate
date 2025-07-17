import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

const DateFormatter = (date: string) => {
  return format(date, 'yyyy.MM.dd', { locale: ko });
};

export default DateFormatter;
