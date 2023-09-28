import { CONFIG } from "./config";

const ensureString = (variableName: any) => {
  if (typeof CONFIG[variableName]() !== "string") {
    throw new Error(
      `Environment variable ${variableName} must set, and a string`
    );
  }
};
const ensureNumber = (variableName: any) => {
  if (
    typeof CONFIG[variableName]() !== "number" ||
    isNaN(CONFIG[variableName])
  ) {
    throw new Error(
      `Environment variable ${variableName} must set, and a number`
    );
  }
};

export const validateConfig = (
  requiredStrings: string[],
  requiredNumbers: string[]
) => {
  requiredStrings.forEach(ensureString);
  requiredNumbers.forEach(ensureNumber);
};
