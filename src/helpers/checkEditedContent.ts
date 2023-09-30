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

export const checkSingleEditedCommit = (
  originalCommit: CommitHistory,
  editedCommit: CommitHistory
) => {
  if (
    originalCommit.authorName === editedCommit.authorName &&
    originalCommit.authorEmail === editedCommit.authorEmail &&
    originalCommit.dateTime === editedCommit.dateTime &&
    originalCommit.message === editedCommit.message
  ) {
    return false;
  }
  return true;
};

export const checkEntireCommitHistory = (
  editedCommitHistory: CommitHistory[]
) => {
  editedCommitHistory.map((editedCommit) => {
    if (editedCommit.edited === true) {
      return true;
    }
    return false;
  });
};

export const countEditedCommits = (editedCommitHistory: CommitHistory[]) => {
  let count = 0;
  editedCommitHistory.map((editedCommit) => {
    if (editedCommit.edited === true) {
      count++;
    }
  });
  return count;
};
