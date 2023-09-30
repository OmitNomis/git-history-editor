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
  originalCommitHistory: CommitHistory[],
  editedCommitHistory: CommitHistory[]
) => {};
