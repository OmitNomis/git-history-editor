import { CommitHistory } from "../types/App.types";

export const checkSingleEditedContent = (
  originalContent: string,
  editedContent: string
) => {
  if (originalContent === editedContent) {
    return false;
  }
  return true;
};

export const countEditedCommits = (editedCommitHistory: CommitHistory[]) => {
  let count = 0;
  editedCommitHistory.map((editedCommit) => {
    if (Object.values(editedCommit.edited).includes(true)) {
      count++;
    }
  });
  return count;
};
