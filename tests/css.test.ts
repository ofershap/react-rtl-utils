import { describe, it, expect } from "vitest";
import { logicalValue, flipProperty, rtlStyle } from "../src/css.js";

describe("logicalValue", () => {
  it("returns start value for LTR", () => {
    expect(logicalValue("ltr", "left", "right")).toBe("left");
  });

  it("returns end value for RTL", () => {
    expect(logicalValue("rtl", "left", "right")).toBe("right");
  });
});

describe("flipProperty", () => {
  it("flips left to right in RTL", () => {
    expect(flipProperty("rtl", "left")).toBe("right");
    expect(flipProperty("rtl", "marginLeft")).toBe("marginRight");
    expect(flipProperty("rtl", "paddingLeft")).toBe("paddingRight");
  });

  it("keeps properties in LTR", () => {
    expect(flipProperty("ltr", "left")).toBe("left");
    expect(flipProperty("ltr", "marginLeft")).toBe("marginLeft");
  });
});

describe("rtlStyle", () => {
  it("returns base style for LTR", () => {
    const base = { marginLeft: 10, textAlign: "left" as const };
    expect(rtlStyle("ltr", base)).toEqual(base);
  });

  it("merges overrides for RTL", () => {
    const base = { marginLeft: 10, textAlign: "left" as const };
    const overrides = {
      marginLeft: 0,
      marginRight: 10,
      textAlign: "right" as const,
    };
    expect(rtlStyle("rtl", base, overrides)).toEqual({
      marginLeft: 0,
      marginRight: 10,
      textAlign: "right",
    });
  });
});
