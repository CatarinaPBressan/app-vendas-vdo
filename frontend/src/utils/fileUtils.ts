export const getFileNameFromPath = (filepath: string): string => {
  const filepathParts = filepath.split("\\");
  return filepathParts[filepathParts.length - 1];
};
