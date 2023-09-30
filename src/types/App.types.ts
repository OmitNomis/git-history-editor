export interface CommitHistory {
  hash: string;
  authorName: string;
  authorEmail: string;
  dateTime: string;
  message: string;
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
