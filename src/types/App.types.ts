export interface CommitHistory {
  hash: string;
  authorName: string;
  authorEmail: string;
  time: string;
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
}
