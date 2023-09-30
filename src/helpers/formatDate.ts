import moment from "moment";

export const formatMillisecondToDate = (time: string) => {
  const date = moment(parseInt(time) * 1000).format("yyyy-MM-DDThh:mm");
  return date;
};

export const formatDateToMillisecond = (date: string) => {
  const time = moment(date).unix();
  return time;
};
