import { formatDateToMillisecond } from ".";
import { CommitHistory } from "../types/App.types";

export const generateEditScript = (editedContent: CommitHistory[]) => {
  const envDiffList = getEnvDiffList(editedContent);
  const messageDiffList = getMessageDiffList(editedContent);

  let script = "git filter-branch ";
  let lastHash = "";

  if (envDiffList.length > 0) {
    envDiffList.map((commit: CommitHistory, index: number) => {
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
    if (messageDiffList.length > 0) {
      script += ` --msg-filter \\\n`;
      messageDiffList.map((commit: CommitHistory, index: number) => {
        script += `${index === 0 ? "'if" : "elif"} test "$GIT_COMMIT" = "${
          commit.hash
        }"; then\n`;
        script += `\techo "${commit.message}"\n`;
      });
      script += `else cat\nfi'`;
    }
    script += ` ${lastHash.slice(
      0,
      7
    )}^..HEAD && rm -fr "$(git rev-parse --git-dir)/refs/original/"`;
  }

  return script;
};

const getEnvDiffList = (editedContent: CommitHistory[]) => {
  let envDiffList: any = [];
  editedContent.map((commit) => {
    if (
      commit.edited.authorEmail ||
      commit.edited.authorName ||
      commit.edited.dateTime
    ) {
      envDiffList.push(commit);
    }
  });
  console.log(envDiffList);
  return envDiffList;
};

const getMessageDiffList = (editedContent: CommitHistory[]) => {
  let messageDiffList: any = [];
  editedContent.map((commit) => {
    if (commit.edited.message) {
      messageDiffList.push(commit);
    }
  });
  return messageDiffList;
};
