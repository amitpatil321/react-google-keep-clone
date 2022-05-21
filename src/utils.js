export const trim = (string, length) => {
  if (string && string.length)
    return string?.length > length
      ? string.substring(0, length - 3) + "..."
      : string;
};
