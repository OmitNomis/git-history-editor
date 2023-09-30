import moment from "moment";

export const formatMillisecondToDate = (time: string) => {
  const date = moment(parseInt(time) * 1000).format("yyyy-MM-DDThh:mm");
  return date;
};
