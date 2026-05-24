import type { FormatType } from "../types";

export const wrapSelectedText = (
  value: string,
  selectedStart: number,
  selectedEnd: number,
  formatType: FormatType,
) => {
  const wrappers = { bold: "**", italic: "*", code: "`" };
  const before = value.slice(0, selectedStart);
  const after = value.slice(selectedEnd);

  const selectedValue = value.slice(selectedStart, selectedEnd);

  if (selectedStart === selectedEnd) {
    return {
      newValue: `${before}${wrappers[formatType]}${wrappers[formatType]}${after}`,
      newCursorPos: selectedStart + wrappers[formatType].length,
    };
  } else {
    return {
      newValue: `${before}${wrappers[formatType]}${selectedValue}${wrappers[formatType]}${after}`,
      newCursorPos: selectedEnd + wrappers[formatType].length * 2,
    };
  }
};
