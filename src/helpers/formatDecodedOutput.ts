import { CommitHistory } from "../types/App.types";

export const formatDecodedOutput = (decodedOutput: any) => {
  let commitStr = decodedOutput.split(/\n/);
  let commits: CommitHistory[] = [];

  try {
    commitStr.map((commit: any) => {
      let split = commit.split("*#");
      if (split.length !== 5) {
        throw new Error("Invalid commit format");
      }
      let [hash, authorName, authorEmail, time, message] = split;
      let commitObj = {
        hash,
        authorName,
        authorEmail,
        time,
        message,
      };
      commits.push(commitObj);
    });
  } catch (error) {
    throw new Error("Invalid commit format");
  }
  return commits;
};
