export const formatDecodedOutput = (decodedOutput: any) => {
  let commitStr = decodedOutput.split(/\n/);
  let commits: any = [];

  try {
    commitStr.map((commit: any) => {
      let split = commit.split("*#");
      if (split.length !== 5) {
        throw new Error("Invalid commit format");
      }
      let [hash, name, email, time, message] = split;
      let commitObj = {
        hash,
        name,
        email,
        time,
        message,
      };
      commits.push(commitObj);
    });
  } catch (error) {
    throw new Error("Invalid commit format");
  }
  return commits;
};
