export const b64UnicodeDecoder = (str: string) => {
  try {
    return decodeURIComponent(
      atob(str)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
  } catch (error) {
    throw new Error("Invalid base64 string");
  }
};
