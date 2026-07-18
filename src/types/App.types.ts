export interface CommitHistory {
  hash: string;
  authorName: string;
  authorEmail: string;
  dateTime: string;
  message: string;
  edited: EditedCommit;
}

// The commit fields the user can edit inline. Their keys line up with
// EditedCommit, and each maps to a string value on CommitHistory.
export type EditableField = keyof EditedCommit;

export interface EditedCommit {
  authorName: boolean;
  authorEmail: boolean;
  dateTime: boolean;
  message: boolean;
}

export interface AppIntroductionProps {
  handleImport: (output: string) => void;
}

export interface HistoryEditorProps {
  commitHistory: CommitHistory[];
}

export interface TableFormRowProps {
  commit: CommitHistory;
  index: number;
  onCommitEdited: (commit: CommitHistory, index: number) => void;
  originalRow: CommitHistory;
}

export interface ScriptModalContentProps {
  script: string;
}
