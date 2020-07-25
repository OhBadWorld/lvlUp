const dateFormat = {
  // const d = new Date('Thu May 12 2016 08:00:00 GMT+0800 (中国标准时间)');
  datetime(d, format) {
    switch (format) {
      case 'yyyy-MM-dd':
        return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
      case 'yyyy-MM-dd HH:00:00':
        return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} ${d.getHours()}:00:00}`;
      case 'yyyy-MM-dd HH:mm:00':
        return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:00}`;
      case 'yyyy-MM-dd HH:mm:ss':
        return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
      default:
        return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
    }
  },
};

export default dateFormat;
