import { formatDateToMillisecond } from ".";
import { CommitHistory } from "../types/App.types";

export const generateEditScript = (editedContent: CommitHistory[]) => {
  const envDiffList = getEnvDiffList(editedContent);
  const messageDiffList = getMessageDiffList(editedContent);

  let script = "git filter-branch ";
  let lastHash = "";

  if (envDiffList.length > 0) {
    envDiffList.forEach((commit: CommitHistory, index: number) => {
      lastHash = commit.hash;
      script += `${
        index === 0 ? "--env-filter \\\n'if" : "elif"
      } test "$GIT_COMMIT" = "${commit.hash}"; then\n`;
      if (commit.edited.authorEmail) {
        script += `\texport GIT_AUTHOR_EMAIL="${commit.authorEmail}"\n`;
        script += `\texport GIT_COMMITTER_EMAIL="${commit.authorEmail}"\n`;
      }
      if (commit.edited.authorName) {
        script += `\texport GIT_AUTHOR_NAME="${commit.authorName}"\n`;
        script += `\texport GIT_COMMITTER_NAME="${commit.authorName}"\n`;
      }
      if (commit.edited.dateTime) {
        script += `\texport GIT_AUTHOR_DATE="${formatDateToMillisecond(
          commit.dateTime
        )}"\n`;
        script += `\texport GIT_COMMITTER_DATE="${formatDateToMillisecond(
          commit.dateTime
        )}"\n`;
      }
    });
    script += `fi'`;
  }
  if (messageDiffList.length > 0) {
    script += ` --msg-filter \\\n`;
    messageDiffList.forEach((commit: CommitHistory, index: number) => {
      lastHash = commit.hash;
      script += `${index === 0 ? "'if" : "elif"} test "$GIT_COMMIT" = "${
        commit.hash
      }"; then\n`;
      script += `\techo "${commit.message}"\n`;
    });
    script += `else cat\nfi'`;
  }
  // Scope the rewrite to a revision range. Normally we anchor on the parent of
  // the oldest edited commit (`<hash>^..HEAD`). But the repo's root commit has
  // no parent, so `<root>^` is an invalid revision and filter-branch fails.
  // When the oldest edited commit is the earliest imported commit (i.e. it may
  // be the root), rewrite the whole branch with `HEAD` instead.
  const oldestImportedHash = editedContent[editedContent.length - 1]?.hash;
  const isRootCommitEdited = lastHash === oldestImportedHash;
  const revisionRange = isRootCommitEdited
    ? "HEAD"
    : `${lastHash.slice(0, 7)}^..HEAD`;

  script += ` ${revisionRange} && rm -fr "$(git rev-parse --git-dir)/refs/original/"`;

  return script;
};

const getEnvDiffList = (editedContent: CommitHistory[]): CommitHistory[] =>
  editedContent.filter(
    (commit) =>
      commit.edited.authorEmail ||
      commit.edited.authorName ||
      commit.edited.dateTime
  );

const getMessageDiffList = (editedContent: CommitHistory[]): CommitHistory[] =>
  editedContent.filter((commit) => commit.edited.message);
