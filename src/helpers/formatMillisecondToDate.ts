export const formatMillisecondToDate = (time: string) => {
  // with time
  const date = new Date(parseInt(time) * 1000);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = ("0" + date.getHours()).slice(-2);
  const minute = ("0" + date.getMinutes()).slice(-2);
  return `${year}-${month}-${day} ${hour}:${minute}`;
};
