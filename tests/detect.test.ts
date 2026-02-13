import { describe, it, expect } from "vitest";
import {
  detectDirection,
  isRtl,
  isLtr,
  hasRtlChars,
  hasLtrChars,
  isMixed,
} from "../src/detect.js";

describe("detectDirection", () => {
  it("detects Hebrew as RTL", () => {
    expect(detectDirection("שלום עולם")).toBe("rtl");
  });

  it("detects Arabic as RTL", () => {
    expect(detectDirection("مرحبا بالعالم")).toBe("rtl");
  });

  it("detects English as LTR", () => {
    expect(detectDirection("Hello World")).toBe("ltr");
  });

  it("detects mixed text by majority", () => {
    expect(detectDirection("שלום עולם hello")).toBe("rtl");
    expect(detectDirection("hello שלום world test")).toBe("ltr");
  });

  it("returns ltr for empty string", () => {
    expect(detectDirection("")).toBe("ltr");
  });

  it("returns ltr for numbers only", () => {
    expect(detectDirection("12345")).toBe("ltr");
  });
});

describe("isRtl / isLtr", () => {
  it("isRtl returns true for Hebrew", () => {
    expect(isRtl("שלום")).toBe(true);
  });

  it("isLtr returns true for English", () => {
    expect(isLtr("Hello")).toBe(true);
  });
});

describe("hasRtlChars / hasLtrChars", () => {
  it("detects RTL characters", () => {
    expect(hasRtlChars("hello שלום")).toBe(true);
    expect(hasRtlChars("hello")).toBe(false);
  });

  it("detects LTR characters", () => {
    expect(hasLtrChars("hello שלום")).toBe(true);
    expect(hasLtrChars("שלום")).toBe(false);
  });
});

describe("isMixed", () => {
  it("detects mixed text", () => {
    expect(isMixed("hello שלום")).toBe(true);
    expect(isMixed("hello")).toBe(false);
    expect(isMixed("שלום")).toBe(false);
  });
});
