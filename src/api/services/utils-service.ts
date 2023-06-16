export const getTimeCounterColorDependingOTimeLeft = (days: number, hours: number) => {
  if (days > 0) {
    return '';
  } else {
    if (hours < 1) {
      return 'text-red';
    } else  {
      return 'text-orange-10';
    }
  }
}
