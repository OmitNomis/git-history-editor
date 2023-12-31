import { CommitHistory } from "../types/App.types";
import { formatMillisecondToDate } from ".";

export const formatDecodedOutput = (decodedOutput: string) => {
  let commitStr = decodedOutput.split(/\n/);
  let commits: CommitHistory[] = [];

  try {
    commitStr.map((commit: string) => {
      let split = commit.split("*#");
      if (split.length !== 5) {
        throw new Error("Invalid commit format");
      }
      let [hash, authorName, authorEmail, dateTime, message] = split;
      let formattedDate = formatMillisecondToDate(dateTime);
      let commitObj = {
        hash,
        authorName,
        authorEmail,
        dateTime: formattedDate,
        message,
        edited: {
          authorName: false,
          authorEmail: false,
          dateTime: false,
          message: false,
        },
      };
      commits.push(commitObj);
    });
  } catch (error) {
    throw new Error("Invalid commit format");
  }
  return commits;
};
