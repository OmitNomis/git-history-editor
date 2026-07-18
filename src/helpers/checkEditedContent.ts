import { CommitHistory } from "../types/App.types";

export const checkSingleEditedContent = (
  originalContent: string,
  editedContent: string
) => originalContent !== editedContent;

export const countEditedCommits = (editedCommitHistory: CommitHistory[]) =>
  editedCommitHistory.filter((commit) =>
    Object.values(commit.edited).includes(true)
  ).length;
