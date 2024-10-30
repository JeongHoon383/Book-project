export const parseJSON = <T = unknown>(value: string): T | null => {
  if (!value) {
    return null;
  }

  const result = JSON.parse(value);
  return typeof result === "string" ? JSON.parse(result) : result;
};
