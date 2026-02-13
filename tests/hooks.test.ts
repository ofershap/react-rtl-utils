import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useDirection, useTextDirection } from "../src/hooks.js";

describe("useDirection", () => {
  it("starts with default direction", () => {
    const { result } = renderHook(() => useDirection("ltr"));
    expect(result.current.direction).toBe("ltr");
  });

  it("starts with rtl when specified", () => {
    const { result } = renderHook(() => useDirection("rtl"));
    expect(result.current.direction).toBe("rtl");
  });

  it("toggles direction", () => {
    const { result } = renderHook(() => useDirection("ltr"));
    act(() => result.current.toggleDirection());
    expect(result.current.direction).toBe("rtl");
    act(() => result.current.toggleDirection());
    expect(result.current.direction).toBe("ltr");
  });

  it("sets direction explicitly", () => {
    const { result } = renderHook(() => useDirection("ltr"));
    act(() => result.current.setDirection("rtl"));
    expect(result.current.direction).toBe("rtl");
  });
});

describe("useTextDirection", () => {
  it("returns rtl for Hebrew text", () => {
    const { result } = renderHook(() => useTextDirection("שלום"));
    expect(result.current).toBe("rtl");
  });

  it("returns ltr for English text", () => {
    const { result } = renderHook(() => useTextDirection("Hello"));
    expect(result.current).toBe("ltr");
  });
});
