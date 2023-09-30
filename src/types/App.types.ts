export interface CommitHistory {
  hash: string;
  authorName: string;
  authorEmail: string;
  date: string;
  message: string;
}

export interface AppIntroductionProps {
  handleImport: (output: string) => void;
}

export interface HistoryEditorProps {
  commitHistory: CommitHistory[];
}
