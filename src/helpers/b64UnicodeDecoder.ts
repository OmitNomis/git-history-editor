export const b64UnicodeDecoder = (str: string) => {
  let cleanStr = str.replace(/[^a-zA-Z0-9+/=]/g, "");
  try {
    return decodeURIComponent(
      atob(cleanStr)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
  } catch (error) {
    throw new Error("Invalid base64 string");
  }
};
