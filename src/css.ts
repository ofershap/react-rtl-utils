import type { Direction } from "./detect.js";

export function logicalValue(
  direction: Direction,
  startValue: string,
  endValue: string,
): string {
  return direction === "rtl" ? endValue : startValue;
}

export function flipProperty(
  direction: Direction,
  property:
    | "left"
    | "right"
    | "marginLeft"
    | "marginRight"
    | "paddingLeft"
    | "paddingRight",
): string {
  const flipMap: Record<string, string> = {
    left: "right",
    right: "left",
    marginLeft: "marginRight",
    marginRight: "marginLeft",
    paddingLeft: "paddingRight",
    paddingRight: "paddingLeft",
  };

  if (direction === "rtl") {
    return flipMap[property] ?? property;
  }
  return property;
}

export function rtlStyle(
  direction: Direction,
  ltrStyle: React.CSSProperties,
  rtlOverrides: React.CSSProperties = {},
): React.CSSProperties {
  if (direction === "rtl") {
    return { ...ltrStyle, ...rtlOverrides };
  }
  return ltrStyle;
}
