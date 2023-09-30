import { CommitHistory } from "../types/App.types";
import { formatMillisecondToDate } from ".";

export const formatDecodedOutput = (decodedOutput: any) => {
  let commitStr = decodedOutput.split(/\n/);
  let commits: CommitHistory[] = [];

  try {
    commitStr.map((commit: any) => {
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
      };
      commits.push(commitObj);
    });
  } catch (error) {
    throw new Error("Invalid commit format");
  }
  return commits;
};
