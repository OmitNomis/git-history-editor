import { CommitHistory } from "../types/App.types";
import { formatMillisecondToDate } from ".";

export const formatDecodedOutput = (decodedOutput: string): CommitHistory[] => {
  const lines = decodedOutput.split(/\n/);

  return lines.map((line: string): CommitHistory => {
    const parts = line.split("*#");
    if (parts.length !== 5) {
      throw new Error("Invalid commit format");
    }
    const [hash, authorName, authorEmail, dateTime, message] = parts;
    return {
      hash,
      authorName,
      authorEmail,
      dateTime: formatMillisecondToDate(dateTime),
      message,
      edited: {
        authorName: false,
        authorEmail: false,
        dateTime: false,
        message: false,
      },
    };
  });
};
