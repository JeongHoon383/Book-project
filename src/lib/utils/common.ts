export const parseJSON = <T = unknown>(value: string | null): T | null => {
  if (!value) {
    return null;
  }

  const result = JSON.parse(value);
  return typeof result === "string" ? JSON.parse(result) : result;
};
