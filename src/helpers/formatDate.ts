import moment from "moment";

export const formatMillisecondToDate = (time: string) => {
  // Use YYYY (4-digit year) and HH (24-hour clock) so the value round-trips
  // correctly through the <input type="datetime-local"> field. The old `hh`
  // token used a 12-hour clock and silently shifted afternoon commits by 12h.
  const date = moment(parseInt(time) * 1000).format("YYYY-MM-DDTHH:mm:ss");
  return date;
};

export const formatDateToMillisecond = (date: string) => {
  const time = moment(date).unix();
  return time;
};
